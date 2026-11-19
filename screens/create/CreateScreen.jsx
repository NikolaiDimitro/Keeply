import { useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,

    Switch,
    Text,
    TextInput,
    View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import { createStyles as styles } from '../../styles/components';
import {
    addRequest,
    createItemId,
    uploadItemAttachments,
} from '../../services/itemRequester';
import {
    getAttachmentValidationError,
    inferMimeType,
} from '../../utils/attachments';

const documentTypes = [
    'Касова бележка',
    'Фактура',
    'Гаранционна карта',
];

function formatDate(date) {
    return date
        ? date.toLocaleDateString('bg-BG', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
        : 'Избери дата';
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

function getSaveErrorMessage(error) {
    if (error?.code === 'permission-denied') {
        return 'Нямаш права да запазиш вещта. Провери правилата за достъп във Firestore.';
    }

    if (error?.code === 'unauthenticated') {
        return 'Сесията ти е изтекла. Влез отново и опитай пак.';
    }

    if (error?.code === 'unavailable') {
        return 'Услугата временно не е достъпна. Провери интернет връзката и опитай пак.';
    }

    if (error instanceof Error && error.message) {
        return `Вещта не можа да бъде запазена: ${error.message}`;
    }

    return 'Вещта не можа да бъде запазена. Опитай отново.';
}

export default function CreateScreen() {
    const [isImportant, setIsImportant] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [purchaseDate, setPurchaseDate] = useState(null);
    const [warrantyMonths, setWarrantyMonths] = useState('');
    const [store, setStore] = useState('');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isSubmittingRef = useRef(false);
    const [activeDatePicker, setActiveDatePicker] = useState(null);
    const warrantyEndDate = purchaseDate && Number(warrantyMonths) > 0
        ? addMonths(purchaseDate, Number(warrantyMonths))
        : null;

    function addAttachments(files) {
        const createdAt = Date.now();
        setAttachments((current) => [
            ...current,
            ...files.map((file, index) => ({
                ...file,
                id: `${createdAt}-${index}-${file.uri}`,
            })),
        ]);
    }

    async function pickDocument() {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                multiple: true,
                copyToCacheDirectory: true,
            });

            if (!result.canceled) {
                addAttachments(
                    result.assets.map((asset) => ({
                        uri: asset.uri,
                        name: asset.name,
                        mimeType: inferMimeType(asset),
                        size: asset.size ?? null,
                    })),
                );
            }
        } catch (error) {
            console.error('Could not select document:', error);
            Alert.alert('Грешка', 'Файлът не можа да бъде прикачен.');
        }
    }

    function openDatePicker(field) {
        setActiveDatePicker(field);
    }

    function handleDateChange(_, selectedDate) {
        if (selectedDate) {
            setPurchaseDate(selectedDate);
            clearFieldError('purchaseDate');
        }

        if (Platform.OS === 'android') {
            setActiveDatePicker(null);
        }
    }

    function removeAttachment(id) {
        setAttachments((current) => current.filter((file) => file.id !== id));
    }

    function clearFieldError(field) {
        setSubmitError('');
        setFieldErrors((current) => {
            if (!current[field]) {
                return current;
            }

            const next = { ...current };
            delete next[field];
            return next;
        });
    }

    async function handleSaveItem() {
        if (isSubmittingRef.current) {
            return;
        }

        setSubmitError('');
        const normalizedPrice = price.trim().replace(',', '.');
        const parsedPrice = normalizedPrice ? Number(normalizedPrice) : null;
        const parsedWarrantyMonths = warrantyMonths
            ? Number(warrantyMonths)
            : null;
        const errors = {};

        if (!itemName.trim()) {
            errors.itemName = 'Името на вещта е задължително.';
        }

        if (!category.trim()) {
            errors.category = 'Категорията е задължителна.';
        }

        if (!normalizedPrice) {
            errors.price = 'Цената е задължителна.';
        } else if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
            errors.price = 'Въведи валидна цена, равна или по-голяма от 0.';
        }

        if (!purchaseDate) {
            errors.purchaseDate = 'Датата на покупка е задължителна.';
        } else if (purchaseDate > new Date()) {
            errors.purchaseDate = 'Датата не може да бъде в бъдещето.';
        }

        if (!warrantyMonths) {
            errors.warrantyMonths = 'Срокът на гаранцията е задължителен.';
        } else if (
            !Number.isSafeInteger(parsedWarrantyMonths) ||
            parsedWarrantyMonths <= 0
        ) {
            errors.warrantyMonths = 'Въведи цял брой месеци, по-голям от 0.';
        }

        if (!store.trim()) {
            errors.store = 'Магазинът е задължителен.';
        }

        setFieldErrors(errors);

        if (Object.keys(errors).length > 0) {
            setSubmitError('Поправи полетата, отбелязани с грешка.');
            return;
        }

        isSubmittingRef.current = true;
        setIsSubmitting(true);

        try {
            const attachmentError = attachments
                .map(getAttachmentValidationError)
                .find(Boolean);

            if (attachmentError) {
                throw new Error(attachmentError);
            }

            const itemId = createItemId();
            const uploadedAttachments = attachments.length > 0
                ? await uploadItemAttachments(itemId, attachments)
                : [];

            await addRequest({
                name: itemName.trim(),
                category: category.trim(),
                price: parsedPrice,
                purchaseDate,
                warrantyMonths: parsedWarrantyMonths,
                warrantyEndDate,
                store: store.trim(),
                location: location.trim(),
                notes: notes.trim(),
                isImportant,
                attachments: uploadedAttachments,
                createdAt: new Date(),
            }, itemId);
            setItemName('');
            setCategory('');
            setPrice('');
            setPurchaseDate(null);
            setWarrantyMonths('');
            setStore('');
            setLocation('');
            setNotes('');
            setIsImportant(false);
            setAttachments([]);
            setFieldErrors({});
            setSubmitError('');
            setActiveDatePicker(null);
            Alert.alert('Запазено', 'Вещта беше добавена успешно.');
        } catch (error) {
            console.error('Could not save item:', error);
            setSubmitError(getSaveErrorMessage(error));
        } finally {
            isSubmittingRef.current = false;
            setIsSubmitting(false);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.card}>
                    <Text style={styles.eyebrow}>МОЯТ ИНВЕНТАР</Text>
                    <Text style={styles.title}>Добави вещ</Text>
                    <Text style={styles.subtitle}>
                        Запиши информацията и документите за вещта.
                    </Text>

                    <Text style={styles.label}>Име на вещта</Text>
                    <TextInput
                        accessibilityLabel="Име на вещта"
                        autoCapitalize="sentences"
                        onChangeText={(value) => {
                            setItemName(value);
                            clearFieldError('itemName');
                        }}
                        placeholder="Например: Безжични слушалки"
                        placeholderTextColor="#8290A5"
                        returnKeyType="next"
                        style={styles.input}
                        value={itemName}
                    />
                    {fieldErrors.itemName ? (
                        <Text style={styles.validationMessage}>{fieldErrors.itemName}</Text>
                    ) : null}

                    <Text style={styles.label}>Категория</Text>
                    <TextInput
                        accessibilityLabel="Категория"
                        onChangeText={(value) => {
                            setCategory(value);
                            clearFieldError('category');
                        }}
                        placeholder="Например: Електроника"
                        placeholderTextColor="#8290A5"
                        returnKeyType="next"
                        style={styles.input}
                        value={category}
                    />
                    {fieldErrors.category ? (
                        <Text style={styles.validationMessage}>{fieldErrors.category}</Text>
                    ) : null}

                    <Text style={styles.label}>Цена</Text>
                    <TextInput
                        accessibilityLabel="Цена"
                        keyboardType="decimal-pad"
                        onChangeText={(value) => {
                            setPrice(value);
                            clearFieldError('price');
                        }}
                        placeholder="Например: 49,90"
                        placeholderTextColor="#8290A5"
                        returnKeyType="next"
                        style={styles.input}
                        value={price}
                    />
                    {fieldErrors.price ? (
                        <Text style={styles.validationMessage}>{fieldErrors.price}</Text>
                    ) : null}

                    <Text style={styles.label}>Дата на покупка</Text>
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => openDatePicker('purchaseDate')}
                        style={styles.dateInput}
                    >
                        <Text style={purchaseDate ? styles.dateValue : styles.datePlaceholder}>
                            {formatDate(purchaseDate)}
                        </Text>
                        <Text style={styles.dateIcon}>▦</Text>
                    </Pressable>
                    {fieldErrors.purchaseDate ? (
                        <Text style={styles.validationMessage}>
                            {fieldErrors.purchaseDate}
                        </Text>
                    ) : null}

                    <Text style={styles.label}>Гаранция</Text>
                    <TextInput
                        accessibilityLabel="Продължителност на гаранцията"
                        keyboardType="number-pad"
                        onChangeText={(value) => {
                            setWarrantyMonths(value.replace(/\D/g, ''));
                            clearFieldError('warrantyMonths');
                        }}
                        placeholder="Брой месеци, например: 24"
                        placeholderTextColor="#8290A5"
                        returnKeyType="next"
                        style={styles.input}
                        value={warrantyMonths}
                    />
                    {fieldErrors.warrantyMonths ? (
                        <Text style={styles.validationMessage}>
                            {fieldErrors.warrantyMonths}
                        </Text>
                    ) : null}

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

                    {activeDatePicker && (
                        <View style={styles.datePickerContainer}>
                            <DateTimePicker
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                maximumDate={
                                    activeDatePicker === 'purchaseDate'
                                        ? new Date()
                                        : undefined
                                }
                                mode="date"
                                onDismiss={() => setActiveDatePicker(null)}
                                onValueChange={handleDateChange}
                                value={purchaseDate || new Date()}
                            />
                            {Platform.OS === 'ios' && (
                                <Pressable
                                    accessibilityRole="button"
                                    onPress={() => setActiveDatePicker(null)}
                                    style={styles.dateDoneButton}
                                >
                                    <Text style={styles.dateDoneText}>Готово</Text>
                                </Pressable>
                            )}
                        </View>
                    )}

                    <Text style={styles.label}>Магазин</Text>
                    <TextInput
                        accessibilityLabel="Магазин"
                        autoCapitalize="words"
                        onChangeText={(value) => {
                            setStore(value);
                            clearFieldError('store');
                        }}
                        placeholder="Например: Технополис"
                        placeholderTextColor="#8290A5"
                        returnKeyType="next"
                        style={styles.input}
                        value={store}
                    />
                    {fieldErrors.store ? (
                        <Text style={styles.validationMessage}>{fieldErrors.store}</Text>
                    ) : null}

                    <Text style={styles.label}>Местоположение</Text>
                    <TextInput
                        accessibilityLabel="Местоположение"
                        autoCapitalize="words"
                        onChangeText={setLocation}
                        placeholder="Например: Спалня"
                        placeholderTextColor="#8290A5"
                        returnKeyType="next"
                        style={styles.input}
                        value={location}
                    />

                    <Text style={styles.label}>Бележки</Text>
                    <TextInput
                        accessibilityLabel="Бележки"
                        multiline
                        onChangeText={setNotes}
                        placeholder="Добави допълнителни подробности"
                        placeholderTextColor="#8290A5"
                        style={[styles.input, styles.notesInput]}
                        textAlignVertical="top"
                        value={notes}
                    />

                    <View style={styles.importantRow}>
                        <View style={styles.importantCopy}>
                            <Text style={styles.importantTitle}>Важна вещ</Text>
                            <Text style={styles.importantHint}>
                                Отбележи, ако искаш да я намираш по-лесно.
                            </Text>
                        </View>
                        <Switch
                            accessibilityLabel="Важна вещ"
                            onValueChange={setIsImportant}
                            thumbColor="#FFFFFF"
                            trackColor={{ false: '#CBD5E1', true: '#3AA878' }}
                            value={isImportant}
                        />
                    </View>

                    <Text style={styles.sectionTitle}>Документи</Text>
                    <Text style={styles.documentHint}>
                        Касова бележка, фактура или гаранционна карта
                    </Text>

                    <View style={styles.documentCard}>
                        <View style={styles.documentCopy}>
                            <Text style={styles.documentCardText}>
                                Прикачи документ към вещта
                            </Text>
                            <Text style={styles.documentTypes}>
                                {documentTypes.join(' · ')}
                            </Text>
                        </View>
                        <Pressable
                            accessibilityRole="button"
                            onPress={pickDocument}
                            style={styles.attachButton}
                        >
                            <Text style={styles.attachButtonText}>＋ Прикачи</Text>
                        </Pressable>
                    </View>

                    {attachments.map((file) => (
                        <View key={file.id} style={styles.fileRow}>
                            <Text style={styles.fileIcon}>
                                {file.mimeType === 'application/pdf' ? 'PDF' : 'ФАЙЛ'}
                            </Text>
                            <Text numberOfLines={1} style={styles.fileName}>
                                {file.name}
                            </Text>
                            <Pressable
                                accessibilityLabel={`Премахни ${file.name}`}
                                accessibilityRole="button"
                                hitSlop={8}
                                onPress={() => removeAttachment(file.id)}
                            >
                                <Text style={styles.removeFile}>×</Text>
                            </Pressable>
                        </View>
                    ))}

                    {submitError ? (
                        <Text
                            accessibilityLiveRegion="polite"
                            style={styles.submitError}
                        >
                            {submitError}
                        </Text>
                    ) : null}

                    <Pressable
                        accessibilityRole="button"
                        accessibilityState={{ disabled: isSubmitting }}
                        disabled={isSubmitting}
                        onPress={handleSaveItem}
                        style={[
                            styles.submitButton,
                            isSubmitting && styles.submitButtonDisabled,
                        ]}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#172B4D" size="small" />
                        ) : null}
                        <Text style={styles.submitButtonText}>
                            {isSubmitting ? 'Запазване...' : 'Запази вещта'}
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}


