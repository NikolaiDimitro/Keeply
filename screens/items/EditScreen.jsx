import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import { itemEditStyles as styles } from '../../styles/components';
import {
    deleteItemAttachments,
    updateRequest,
    uploadItemAttachments,
} from '../../services/itemRequester';
import {
    getAttachmentValidationError,
    inferMimeType,
} from '../../utils/attachments';

function EditField({
    label,
    value,
    onChangeText,
    placeholder,
    multiline = false,
    keyboardType,
    error,
}) {
    return (
        <View style={styles.fieldGroup}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                accessibilityLabel={label}
                keyboardType={keyboardType}
                multiline={multiline}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#8290A5"
                style={[
                    styles.input,
                    styles.inputValue,
                    multiline && styles.multilineInput,
                ]}
                textAlignVertical={multiline ? 'top' : 'center'}
                value={value}
            />
            {error ? (
                <Text style={styles.validationMessage}>{error}</Text>
            ) : null}
        </View>
    );
}

function formatDate(date) {
    return date.toLocaleDateString('bg-BG', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

function parseDate(value) {
    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? null : new Date(value);
    }

    if (typeof value !== 'string') {
        return null;
    }

    const match = value.trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);

    if (!match) {
        return null;
    }

    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);
    const date = new Date(year, month - 1, day);

    return date.getFullYear() === year
        && date.getMonth() === month - 1
        && date.getDate() === day
        ? date
        : null;
}

function addMonths(date, months) {
    const result = new Date(date);
    const originalDay = result.getDate();

    result.setDate(1);
    result.setMonth(result.getMonth() + months);
    result.setDate(
        Math.min(
            originalDay,
            new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate(),
        ),
    );

    return result;
}

function getWarrantyMonths(item) {
    if (item.warrantyMonths != null) {
        return String(item.warrantyMonths);
    }

    return String(item.warranty || '').match(/^\s*(\d+)/)?.[1] || '';
}

export default function EditScreen({ route, navigation }) {
    const { item } = route.params;
    const initialPurchaseDate = parseDate(item.purchaseDate);
    const initialWarrantyMonths = getWarrantyMonths(item);
    const [name, setName] = useState(item.name || '');
    const [category, setCategory] = useState(item.category || '');
    const [price, setPrice] = useState(
        item.price == null ? '' : String(item.price).replace(/[^\d,.-]/g, ''),
    );
    const [purchaseDate, setPurchaseDate] = useState(initialPurchaseDate);
    const [warrantyMonths, setWarrantyMonths] = useState(initialWarrantyMonths);
    const [store, setStore] = useState(item.store || '');
    const [location, setLocation] = useState(item.location || '');
    const [notes, setNotes] = useState(item.notes || '');
    const [pendingAttachments, setPendingAttachments] = useState([]);
    const [fieldErrors, setFieldErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [isPickingDocuments, setIsPickingDocuments] = useState(false);
    const [isPurchaseDatePickerVisible, setPurchaseDatePickerVisible] = useState(false);
    const existingDocuments = [
        ...(Array.isArray(item.attachments) ? item.attachments : []),
        ...(Array.isArray(item.documents) ? item.documents : []),
    ]
        .map((document, index) => {
            const name = typeof document === 'string' ? document : document?.name;

            if (!name) {
                return null;
            }

            const mimeType = typeof document === 'object' ? document?.mimeType : null;
            const isPdf = mimeType === 'application/pdf' || /\.pdf$/i.test(name);

            return {
                id: `existing-${name}-${index}`,
                name,
                type: isPdf ? 'PDF' : 'ФАЙЛ',
            };
        })
        .filter(Boolean);
    const documents = pendingAttachments.length > 0
        ? pendingAttachments.map((file) => ({
            id: file.id,
            name: file.name,
            pendingId: file.id,
            type: file.mimeType === 'application/pdf' ? 'PDF' : 'ФАЙЛ',
        }))
        : existingDocuments;
    const parsedPurchaseDate = purchaseDate;
    const parsedWarrantyMonths = Number(warrantyMonths);
    const warrantyEndDate = parsedPurchaseDate
        && Number.isSafeInteger(parsedWarrantyMonths)
        && parsedWarrantyMonths > 0
        ? addMonths(parsedPurchaseDate, parsedWarrantyMonths)
        : null;

    function handleWarrantyMonthsChange(value) {
        setWarrantyMonths(value.replace(/\D/g, ''));
        clearFieldError('warrantyMonths');
    }

    function handlePurchaseDateChange(_, selectedDate) {
        if (selectedDate) {
            setPurchaseDate(selectedDate);
            clearFieldError('purchaseDate');
        }

        if (Platform.OS === 'android') {
            setPurchaseDatePickerVisible(false);
        }
    }

    function clearFieldError(field) {
        setFieldErrors((current) => {
            if (!current[field]) {
                return current;
            }

            const next = { ...current };
            delete next[field];
            return next;
        });
    }

    async function handlePickDocuments() {
        setIsPickingDocuments(true);

        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                multiple: true,
                copyToCacheDirectory: true,
            });

            if (result.canceled) {
                return;
            }

            const createdAt = Date.now();
            const selectedFiles = result.assets.map((asset, index) => ({
                id: `${createdAt}-${index}-${asset.uri}`,
                uri: asset.uri,
                name: asset.name,
                mimeType: inferMimeType(asset),
                size: asset.size ?? null,
            }));
            const attachmentError = selectedFiles
                .map(getAttachmentValidationError)
                .find(Boolean);

            if (attachmentError) {
                Alert.alert('Грешка', attachmentError);
                return;
            }

            setPendingAttachments((current) => [...current, ...selectedFiles]);
        } catch (error) {
            console.error('Could not select document:', error);
            Alert.alert('Грешка', 'Файлът не можа да бъде прикачен.');
        } finally {
            setIsPickingDocuments(false);
        }
    }

    async function handleSave() {
        if (isSaving || isPickingDocuments) {
            return;
        }

        const normalizedPrice = price.trim().replace(',', '.');
        const parsedPrice = Number(normalizedPrice);
        const errors = {};

        if (!name.trim()) {
            errors.name = 'Името на вещта е задължително.';
        }
        if (!category.trim()) {
            errors.category = 'Категорията е задължителна.';
        }
        if (
            !normalizedPrice
            || !Number.isFinite(parsedPrice)
            || parsedPrice < 0
        ) {
            errors.price = 'Въведи валидна цена, равна или по-голяма от 0.';
        }
        if (!parsedPurchaseDate) {
            errors.purchaseDate = 'Избери дата на покупка.';
        } else if (parsedPurchaseDate > new Date()) {
            errors.purchaseDate = 'Датата на покупка не може да бъде в бъдещето.';
        }
        if (
            !warrantyMonths.trim()
            || !Number.isSafeInteger(parsedWarrantyMonths)
            || parsedWarrantyMonths <= 0
        ) {
            errors.warrantyMonths = 'Въведи цял брой месеци на гаранцията, по-голям от 0.';
        }
        if (!store.trim()) {
            errors.store = 'Магазинът е задължителен.';
        }

        setFieldErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const attachmentError = pendingAttachments
            .map(getAttachmentValidationError)
            .find(Boolean);

        if (attachmentError) {
            Alert.alert('Грешка', attachmentError);
            return;
        }

        if (!item.docId) {
            Alert.alert('Грешка', 'Не може да бъде намерен записът на тази вещ.');
            return;
        }

        setIsSaving(true);

        let uploadedAttachments = [];
        let itemSaved = false;

        try {
            uploadedAttachments = pendingAttachments.length > 0
                ? await uploadItemAttachments(item.docId, pendingAttachments)
                : [];
            const updatedItem = {
                name: name.trim(),
                category: category.trim(),
                price: parsedPrice,
                purchaseDate: parsedPurchaseDate,
                warrantyMonths: parsedWarrantyMonths,
                warranty: `${parsedWarrantyMonths} ${parsedWarrantyMonths === 1 ? 'месец' : 'месеца'}`,
                warrantyEndDate,
                store: store.trim(),
                location: location.trim(),
                notes: notes.trim(),
                ...(pendingAttachments.length > 0
                    ? {
                        attachments: uploadedAttachments,
                        documents: [],
                    }
                    : {}),
            };

            await updateRequest(item.docId, updatedItem);
            itemSaved = true;

            let oldAttachmentsCleanupFailed = false;
            if (pendingAttachments.length > 0 && Array.isArray(item.attachments)) {
                try {
                    await deleteItemAttachments(item.attachments);
                } catch (error) {
                    console.error('Could not delete replaced attachments:', error);
                    oldAttachmentsCleanupFailed = true;
                }
            }

            navigation.navigate('Details', {
                item: {
                    ...item,
                    ...updatedItem,
                    purchaseDate: formatDate(updatedItem.purchaseDate),
                    warrantyEndDate: formatDate(updatedItem.warrantyEndDate),
                },
            });
            if (oldAttachmentsCleanupFailed) {
                Alert.alert(
                    'Промените са запазени',
                    'Новите документи са запазени, но старите файлове не успяха да бъдат изтрити от хранилището.',
                );
            }
        } catch (error) {
            if (!itemSaved && uploadedAttachments.length > 0) {
                try {
                    await deleteItemAttachments(uploadedAttachments);
                } catch (cleanupError) {
                    console.error('Could not clean up uploaded attachments:', cleanupError);
                }
            }

            console.error('Could not update item:', error);
            Alert.alert(
                itemSaved ? 'Промените са запазени' : 'Грешка',
                itemSaved
                    ? 'Вещта е обновена, но екранът не можа да се отвори.'
                    : 'Промените не бяха запазени. Опитай отново.',
            );
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <View style={styles.screen}>
            <Pressable
                accessibilityLabel="Назад"
                accessibilityRole="button"
                onPress={() => navigation.goBack()}
                style={({ pressed }) => [
                    styles.backButton,
                    pressed && styles.backButtonPressed,
                ]}
            >
                <Text style={styles.backIcon}>‹</Text>
                <Text style={styles.backButtonText}>Назад</Text>
            </Pressable>
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                <View style={styles.card}>
                    <Text style={styles.eyebrow}>МОЯТ ИНВЕНТАР</Text>
                    <Text style={styles.title}>Промени вещта</Text>
                    <Text style={styles.subtitle}>
                        Редактирай информацията за вещта.
                    </Text>

                    <EditField
                        error={fieldErrors.name}
                        label="Име на вещта"
                        onChangeText={(value) => {
                            setName(value);
                            clearFieldError('name');
                        }}
                        placeholder="Например: Безжични слушалки"
                        value={name}
                    />
                    <EditField
                        error={fieldErrors.category}
                        label="Категория"
                        onChangeText={(value) => {
                            setCategory(value);
                            clearFieldError('category');
                        }}
                        placeholder="Например: Електроника"
                        value={category}
                    />
                    <EditField
                        error={fieldErrors.price}
                        keyboardType="decimal-pad"
                        label="Цена"
                        onChangeText={(value) => {
                            setPrice(value);
                            clearFieldError('price');
                        }}
                        placeholder="Например: 249,90"
                        value={price}
                    />
                    <Text style={styles.label}>Дата на покупка</Text>
                    <Pressable
                        accessibilityLabel="Дата на покупка"
                        accessibilityRole="button"
                        onPress={() => setPurchaseDatePickerVisible(true)}
                        style={styles.dateInput}
                    >
                        <Text
                            style={
                                purchaseDate
                                    ? styles.dateValue
                                    : styles.datePlaceholder
                            }
                        >
                            {purchaseDate ? formatDate(purchaseDate) : 'Избери дата'}
                        </Text>
                        <Text style={styles.dateIcon}>▦</Text>
                    </Pressable>
                    {isPurchaseDatePickerVisible && (
                        <View style={styles.datePickerContainer}>
                            <DateTimePicker
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                maximumDate={new Date()}
                                mode="date"
                                onDismiss={() => setPurchaseDatePickerVisible(false)}
                                onValueChange={handlePurchaseDateChange}
                                value={purchaseDate || new Date()}
                            />
                            {Platform.OS === 'ios' && (
                                <Pressable
                                    accessibilityRole="button"
                                    onPress={() => setPurchaseDatePickerVisible(false)}
                                    style={styles.dateDoneButton}
                                >
                                    <Text style={styles.dateDoneText}>Готово</Text>
                                </Pressable>
                            )}
                        </View>
                    )}
                    {fieldErrors.purchaseDate ? (
                        <Text style={styles.validationMessage}>
                            {fieldErrors.purchaseDate}
                        </Text>
                    ) : null}
                    <EditField
                        error={fieldErrors.warrantyMonths}
                        keyboardType="number-pad"
                        label="Продължителност на гаранцията (месеци)"
                        onChangeText={handleWarrantyMonthsChange}
                        placeholder="Например: 24"
                        value={warrantyMonths}
                    />
                    <Text style={styles.label}>Крайна дата на гаранцията</Text>
                    <View style={styles.dateInput}>
                        <Text
                            style={
                                warrantyEndDate
                                    ? styles.dateValue
                                    : styles.datePlaceholder
                            }
                        >
                            {warrantyEndDate
                                ? formatDate(warrantyEndDate)
                                : 'Въведи дата и период'}
                        </Text>
                    </View>
                    <EditField
                        error={fieldErrors.store}
                        label="Магазин"
                        onChangeText={(value) => {
                            setStore(value);
                            clearFieldError('store');
                        }}
                        placeholder="Например: Технополис"
                        value={store}
                    />
                    <EditField
                        label="Местоположение"
                        onChangeText={setLocation}
                        placeholder="Например: Спалня"
                        value={location}
                    />
                    <EditField
                        label="Бележки"
                        multiline
                        onChangeText={setNotes}
                        placeholder="Добави допълнителни подробности"
                        value={notes}
                    />

                    <Text style={styles.label}>Документи</Text>
                    <View style={styles.documentCard}>
                        {documents.length ? (
                            documents.map((document) => (
                                <View
                                    key={document.id}
                                    style={styles.documentRow}
                                >
                                    <View style={styles.documentMark}>
                                        <Text style={styles.documentMarkText}>
                                            {document.type}
                                        </Text>
                                    </View>
                                    <Text numberOfLines={1} style={styles.documentName}>
                                        {document.name}
                                    </Text>
                                    {document.pendingId ? (
                                        <Pressable
                                            accessibilityLabel={`Премахни ${document.name}`}
                                            accessibilityRole="button"
                                            hitSlop={8}
                                            onPress={() => setPendingAttachments((current) => (
                                                current.filter((file) => file.id !== document.pendingId)
                                            ))}
                                            style={styles.removeDocumentButton}
                                        >
                                            <Text style={styles.removeDocumentText}>×</Text>
                                        </Pressable>
                                    ) : null}
                                </View>
                            ))
                        ) : (
                            <Text style={styles.placeholder}>
                                Няма прикачени документи
                            </Text>
                        )}
                    </View>
                    <Pressable
                        accessibilityRole="button"
                        disabled={isSaving || isPickingDocuments}
                        onPress={handlePickDocuments}
                        style={styles.fileButton}
                    >
                        <Text style={styles.fileButtonText}>
                            {isPickingDocuments ? 'Избиране...' : 'Промени документите'}
                        </Text>
                    </Pressable>

                    <Pressable
                        accessibilityRole="button"
                        accessibilityState={{ disabled: isSaving || isPickingDocuments }}
                        disabled={isSaving || isPickingDocuments}
                        onPress={handleSave}
                        style={styles.primaryButton}
                    >
                        {isSaving ? (
                            <ActivityIndicator
                                color="#172B4D"
                                size="small"
                                style={styles.savingIndicator}
                            />
                        ) : null}
                        <Text style={styles.primaryButtonText}>
                            {isSaving ? 'Запазване...' : 'Запази промените'}
                        </Text>
                    </Pressable>
                    <Pressable
                        accessibilityRole="button"
                        disabled={isSaving || isPickingDocuments}
                        onPress={() => navigation.goBack()}
                        style={styles.secondaryButton}
                    >
                        <Text style={styles.secondaryButtonText}>Отказ</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}
