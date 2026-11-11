import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { itemDetailsStyles as styles } from '../../styles/components';

function DetailRow({ label, value }) {
    return (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value || 'Няма добавена информация'}</Text>
        </View>
    );
}

export default function DetailsScreen({ route, navigation }) {
    const { item } = route.params;
    const documents = item.documents || [];
    const [isDeleteDialogVisible, setDeleteDialogVisible] = useState(false);

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
                        onPress={() => navigation.navigate('Edit', { item })}
                        style={styles.editButton}
                    >
                        <Text style={styles.editButtonText}>Промени вещта</Text>
                    </Pressable>
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => setDeleteDialogVisible(true)}
                        style={({ pressed }) => [
                            styles.deleteButton,
                            pressed && styles.deleteButtonPressed,
                        ]}
                    >
                        <Text style={styles.deleteButtonText}>Изтрий вещта</Text>
                    </Pressable>
                </View>
            </ScrollView>
            <ConfirmationDialog
                visible={isDeleteDialogVisible}
                title="Изтриване на вещ"
                message={`Сигурни ли сте, че искате да изтриете „${item.name}“?`}
                note="Потвърждението е само визуално — вещта няма да бъде премахната."
                onCancel={() => setDeleteDialogVisible(false)}
                onConfirm={() => setDeleteDialogVisible(false)}
            />
        </View>
    );
}

