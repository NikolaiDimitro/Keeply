import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

function DetailRow({ label, value }) {
    return (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value || 'Няма добавена информация'}</Text>
        </View>
    );
}

export default function ItemDetails({ item, onEdit }) {
    const documents = item.documents || [];

    return (
        <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.heroCard}>
                <View
                    style={[
                        styles.itemMark,
                        { backgroundColor: item.color || '#E9FAF0' },
                    ]}
                >
                    <Text style={styles.itemMarkText}>{item.mark || '•'}</Text>
                </View>
                <Text style={styles.eyebrow}>ДЕТАЙЛИ ЗА ВЕЩТА</Text>
                <Text style={styles.title}>{item.name}</Text>
                {!!item.category && (
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{item.category}</Text>
                    </View>
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Информация</Text>
                <DetailRow label="Местоположение" value={item.location} />
                <DetailRow label="Цена" value={item.price} />
                <DetailRow label="Магазин" value={item.store} />
                <DetailRow label="Дата на покупка" value={item.purchaseDate} />
            </View>

            <View style={styles.warrantyCard}>
                <Text style={styles.sectionTitle}>Гаранция</Text>
                <DetailRow label="Продължителност" value={item.warranty} />
                <DetailRow label="Валидна до" value={item.warrantyEndDate} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Бележки</Text>
                <Text style={styles.notes}>
                    {item.notes || 'Няма добавени бележки за тази вещ.'}
                </Text>
            </View>

            <View style={styles.section}>
                <View style={styles.documentsHeading}>
                    <Text style={styles.sectionTitle}>Документи</Text>
                    <Text style={styles.documentCount}>{documents.length}</Text>
                </View>
                {documents.length ? (
                    documents.map((document, index) => (
                        <View key={`${document}-${index}`} style={styles.documentRow}>
                            <View style={styles.documentMark}>
                                <Text style={styles.documentMarkText}>PDF</Text>
                            </View>
                            <Text numberOfLines={1} style={styles.documentName}>
                                {document}
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.notes}>Няма прикачени документи.</Text>
                )}
            </View>

            <View style={styles.actions}>
                <Pressable
                    accessibilityRole="button"
                    onPress={onEdit}
                    style={styles.editButton}
                >
                    <Text style={styles.editButtonText}>Промени вещта</Text>
                </Pressable>
                <View style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Изтрий вещта</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 22,
        paddingTop: 4,
        paddingBottom: 28,
    },
    heroCard: {
        alignItems: 'center',
        backgroundColor: '#172B4D',
        borderRadius: 20,
        marginBottom: 14,
        padding: 22,
    },
    itemMark: {
        alignItems: 'center',
        borderRadius: 18,
        height: 64,
        justifyContent: 'center',
        marginBottom: 14,
        width: 64,
    },
    itemMarkText: {
        color: '#172B4D',
        fontSize: 24,
        fontWeight: '700',
    },
    eyebrow: {
        color: '#B9F2D0',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.2,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 23,
        fontWeight: '700',
        marginTop: 6,
        textAlign: 'center',
    },
    categoryBadge: {
        backgroundColor: 'rgba(255,255,255,0.12)',
        borderRadius: 16,
        marginTop: 12,
        paddingHorizontal: 12,
        paddingVertical: 7,
    },
    categoryText: {
        color: '#D5DEEC',
        fontSize: 12,
        fontWeight: '600',
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 12,
        padding: 16,
    },
    warrantyCard: {
        backgroundColor: '#E9FAF0',
        borderColor: '#B9F2D0',
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 12,
        padding: 16,
    },
    sectionTitle: {
        color: '#172B4D',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
    },
    detailRow: {
        borderBottomColor: '#EEF2F7',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    detailLabel: {
        color: '#64748B',
        flex: 1,
        fontSize: 13,
        marginRight: 12,
    },
    detailValue: {
        color: '#172B4D',
        flex: 1,
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'right',
    },
    notes: {
        color: '#64748B',
        fontSize: 14,
        lineHeight: 21,
    },
    documentsHeading: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    documentCount: {
        color: '#5474A5',
        fontSize: 13,
        fontWeight: '600',
    },
    documentRow: {
        alignItems: 'center',
        borderTopColor: '#EEF2F7',
        borderTopWidth: 1,
        flexDirection: 'row',
        minHeight: 56,
    },
    documentMark: {
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
        height: 34,
        justifyContent: 'center',
        marginRight: 12,
        width: 42,
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
    actions: {
        gap: 10,
        marginTop: 4,
    },
    editButton: {
        alignItems: 'center',
        backgroundColor: '#B9F2D0',
        borderRadius: 12,
        justifyContent: 'center',
        minHeight: 50,
    },
    editButtonText: {
        color: '#172B4D',
        fontSize: 14,
        fontWeight: '700',
    },
    deleteButton: {
        alignItems: 'center',
        backgroundColor: '#FEF2F2',
        borderColor: '#FECACA',
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        minHeight: 50,
    },
    deleteButtonText: {
        color: '#B42318',
        fontSize: 14,
        fontWeight: '700',
    },
});
