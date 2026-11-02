import { ScrollView, StyleSheet, Text, View } from 'react-native';

function EditField({ label, value, placeholder, multiline = false }) {
    return (
        <View style={styles.fieldGroup}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.input, multiline && styles.multilineInput]}>
                <Text style={value ? styles.inputValue : styles.placeholder}>
                    {value || placeholder}
                </Text>
            </View>
        </View>
    );
}

export default function ItemEdit({ item }) {
    return (
        <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.card}>
                <Text style={styles.eyebrow}>МОЯТ ИНВЕНТАР</Text>
                <Text style={styles.title}>Промени вещта</Text>
                <Text style={styles.subtitle}>
                    Редактирай информацията за вещта.
                </Text>

                <EditField
                    label="Име на вещта"
                    value={item.name}
                    placeholder="Например: Безжични слушалки"
                />
                <EditField
                    label="Категория"
                    value={item.category}
                    placeholder="Например: Електроника"
                />
                <EditField
                    label="Цена"
                    value={item.price}
                    placeholder="Например: 249,90 лв."
                />
                <EditField
                    label="Дата на покупка"
                    value={item.purchaseDate}
                    placeholder="Избери дата"
                />
                <EditField
                    label="Продължителност на гаранцията"
                    value={item.warranty}
                    placeholder="Например: 24 месеца"
                />
                <EditField
                    label="Магазин"
                    value={item.store}
                    placeholder="Например: Технополис"
                />
                <EditField
                    label="Местоположение"
                    value={item.location}
                    placeholder="Например: Спалня"
                />
                <EditField
                    label="Бележки"
                    value={item.notes}
                    placeholder="Добави допълнителни подробности"
                    multiline
                />

                <Text style={styles.label}>Документи</Text>
                <View style={styles.documentCard}>
                    {(item.documents || []).length ? (
                        item.documents.map((document, index) => (
                            <View
                                key={`${document}-${index}`}
                                style={styles.documentRow}
                            >
                                <View style={styles.documentMark}>
                                    <Text style={styles.documentMarkText}>PDF</Text>
                                </View>
                                <Text numberOfLines={1} style={styles.documentName}>
                                    {document}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.placeholder}>
                            Няма прикачени документи
                        </Text>
                    )}
                </View>
                <View style={styles.fileButton}>
                    <Text style={styles.fileButtonText}>Промени документите</Text>
                </View>

                <View style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>Запази промените</Text>
                </View>
                <View style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Отказ</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 22,
        paddingVertical: 20,
    },
    card: {
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
        borderRadius: 20,
        borderWidth: 1,
        maxWidth: 480,
        padding: 20,
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
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
    },
    subtitle: {
        color: '#64748B',
        fontSize: 14,
        lineHeight: 21,
        marginBottom: 22,
        marginTop: 7,
        textAlign: 'center',
    },
    fieldGroup: {
        marginBottom: 14,
    },
    label: {
        color: '#172B4D',
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 7,
    },
    input: {
        backgroundColor: '#F8FAFC',
        borderColor: '#CBD5E1',
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        minHeight: 48,
        paddingHorizontal: 13,
        paddingVertical: 11,
    },
    multilineInput: {
        minHeight: 86,
        justifyContent: 'flex-start',
    },
    inputValue: {
        color: '#172B4D',
        fontSize: 14,
    },
    placeholder: {
        color: '#8290A5',
        fontSize: 14,
    },
    documentCard: {
        backgroundColor: '#F8FAFC',
        borderColor: '#E2E8F0',
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 12,
    },
    documentRow: {
        alignItems: 'center',
        borderBottomColor: '#E2E8F0',
        borderBottomWidth: 1,
        flexDirection: 'row',
        minHeight: 52,
    },
    documentMark: {
        alignItems: 'center',
        backgroundColor: '#E9FAF0',
        borderRadius: 8,
        height: 32,
        justifyContent: 'center',
        marginRight: 10,
        width: 40,
    },
    documentMarkText: {
        color: '#5474A5',
        fontSize: 10,
        fontWeight: '700',
    },
    documentName: {
        color: '#172B4D',
        flex: 1,
        fontSize: 13,
        fontWeight: '600',
    },
    fileButton: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#CBD5E1',
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        marginBottom: 18,
        minHeight: 46,
    },
    fileButtonText: {
        color: '#5474A5',
        fontSize: 13,
        fontWeight: '700',
    },
    primaryButton: {
        alignItems: 'center',
        backgroundColor: '#B9F2D0',
        borderRadius: 12,
        justifyContent: 'center',
        minHeight: 50,
    },
    primaryButtonText: {
        color: '#172B4D',
        fontSize: 14,
        fontWeight: '700',
    },
    secondaryButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        minHeight: 44,
    },
    secondaryButtonText: {
        color: '#5474A5',
        fontSize: 14,
        fontWeight: '600',
    },
});
