import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';

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

export default function Create() {
    const [isImportant, setIsImportant] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [purchaseDate, setPurchaseDate] = useState(null);
    const [warrantyMonths, setWarrantyMonths] = useState('');
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
                        mimeType: asset.mimeType || 'application/octet-stream',
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
        }

        if (Platform.OS === 'android') {
            setActiveDatePicker(null);
        }
    }

    function removeAttachment(id) {
        setAttachments((current) => current.filter((file) => file.id !== id));
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
                        placeholder="Например: Безжични слушалки"
                        placeholderTextColor="#8290A5"
                        returnKeyType="next"
                        style={styles.input}
                    />

                    <Text style={styles.label}>Категория</Text>
                    <TextInput
                        accessibilityLabel="Категория"
                        placeholder="Например: Електроника"
                        placeholderTextColor="#8290A5"
                        returnKeyType="next"
                        style={styles.input}
                    />

                    <Text style={styles.label}>Цена</Text>
                    <TextInput
                        accessibilityLabel="Цена"
                        keyboardType="decimal-pad"
                        placeholder="Например: 49,90"
                        placeholderTextColor="#8290A5"
                        returnKeyType="next"
                        style={styles.input}
                    />

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

                    <Text style={styles.label}>Гаранция</Text>
                    <TextInput
                        accessibilityLabel="Продължителност на гаранцията"
                        keyboardType="number-pad"
                        onChangeText={(value) => setWarrantyMonths(value.replace(/\D/g, ''))}
                        placeholder="Брой месеци, например: 24"
                        placeholderTextColor="#8290A5"
                        returnKeyType="next"
                        style={styles.input}
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
                        placeholder="Например: Технополис"
                        placeholderTextColor="#8290A5"
                        returnKeyType="next"
                        style={styles.input}
                    />

                    <Text style={styles.label}>Бележки</Text>
                    <TextInput
                        accessibilityLabel="Бележки"
                        multiline
                        placeholder="Добави допълнителни подробности"
                        placeholderTextColor="#8290A5"
                        style={[styles.input, styles.notesInput]}
                        textAlignVertical="top"
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

                    <View style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Запази вещта</Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 22,
        paddingVertical: 28,
    },
    card: {
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
        borderRadius: 20,
        borderWidth: 1,
        maxWidth: 480,
        padding: 22,
        width: '100%',
    },
    eyebrow: {
        color: '#5474A5',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.2,
        marginBottom: 8,
        textAlign: 'center',
    },
    title: {
        color: '#172B4D',
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
    },
    subtitle: {
        color: '#64748B',
        fontSize: 14,
        lineHeight: 21,
        marginBottom: 24,
        marginTop: 8,
        textAlign: 'center',
    },
    label: {
        color: '#172B4D',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F8FAFC',
        borderColor: '#CBD5E1',
        borderRadius: 12,
        borderWidth: 1,
        color: '#172B4D',
        fontSize: 16,
        minHeight: 52,
        marginBottom: 18,
        paddingHorizontal: 14,
    },
    dateInput: {
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderColor: '#CBD5E1',
        borderRadius: 12,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 18,
        minHeight: 52,
        paddingHorizontal: 14,
    },
    dateValue: {
        color: '#172B4D',
        fontSize: 16,
    },
    datePlaceholder: {
        color: '#8290A5',
        fontSize: 16,
    },
    dateIcon: {
        color: '#5474A5',
        fontSize: 18,
    },
    datePickerContainer: {
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        marginBottom: 18,
        overflow: 'hidden',
    },
    dateDoneButton: {
        alignItems: 'flex-end',
        borderTopColor: '#E2E8F0',
        borderTopWidth: 1,
        padding: 12,
    },
    dateDoneText: {
        color: '#287A58',
        fontSize: 15,
        fontWeight: '700',
    },
    notesInput: {
        minHeight: 96,
        paddingTop: 14,
    },
    importantRow: {
        alignItems: 'center',
        borderBottomColor: '#E2E8F0',
        borderBottomWidth: 1,
        borderTopColor: '#E2E8F0',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 22,
        paddingVertical: 16,
    },
    importantCopy: {
        flex: 1,
        paddingRight: 12,
    },
    importantTitle: {
        color: '#172B4D',
        fontSize: 15,
        fontWeight: '700',
    },
    importantHint: {
        color: '#8290A5',
        fontSize: 12,
        lineHeight: 18,
        marginTop: 4,
    },
    sectionTitle: {
        color: '#172B4D',
        fontSize: 18,
        fontWeight: '700',
    },
    documentHint: {
        color: '#8290A5',
        fontSize: 13,
        marginBottom: 16,
        marginTop: 5,
    },
    documentCard: {
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderColor: '#E2E8F0',
        borderRadius: 14,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        padding: 14,
    },
    documentCopy: {
        flex: 1,
        paddingRight: 10,
    },
    documentCardText: {
        color: '#475569',
        fontSize: 13,
        lineHeight: 18,
    },
    documentTypes: {
        color: '#8290A5',
        fontSize: 11,
        lineHeight: 16,
        marginTop: 4,
    },
    attachButton: {
        backgroundColor: '#EAF7F0',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    attachButtonText: {
        color: '#287A58',
        fontSize: 13,
        fontWeight: '700',
    },
    fileRow: {
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 6,
        minHeight: 42,
        paddingHorizontal: 10,
    },
    fileIcon: {
        color: '#5474A5',
        fontSize: 10,
        fontWeight: '700',
        marginRight: 8,
    },
    fileName: {
        color: '#475569',
        flex: 1,
        fontSize: 12,
    },
    removeFile: {
        color: '#B42318',
        fontSize: 22,
        marginLeft: 8,
    },
    submitButton: {
        alignItems: 'center',
        backgroundColor: '#B9F2D0',
        borderRadius: 12,
        justifyContent: 'center',
        marginTop: 12,
        minHeight: 52,
    },
    submitButtonText: {
        color: '#172B4D',
        fontSize: 16,
        fontWeight: '700',
    },
});
