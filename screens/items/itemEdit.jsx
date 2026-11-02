import { ScrollView, Text, View } from 'react-native';
import { itemEditStyles as styles } from '../../styles/components';

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

