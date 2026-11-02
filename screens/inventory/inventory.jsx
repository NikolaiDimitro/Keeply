import { useMemo, useState } from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function Inventory({ items = [], onAddItem }) {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Всички');
    const categories = useMemo(
        () => ['Всички', ...new Set(items.map((item) => item.category).filter(Boolean))],
        [items],
    );
    const filteredItems = useMemo(() => {
        const query = search.trim().toLocaleLowerCase('bg-BG');

        return items.filter((item) => {
            const matchesCategory =
                selectedCategory === 'Всички' || item.category === selectedCategory;
            const matchesSearch =
                !query ||
                [item.name, item.category, item.location]
                    .filter(Boolean)
                    .some((value) => value.toLocaleLowerCase('bg-BG').includes(query));

            return matchesCategory && matchesSearch;
        });
    }, [items, search, selectedCategory]);

    function renderItem({ item, index }) {
        return (
            <View
                style={[
                    styles.itemRow,
                    index === filteredItems.length - 1 && styles.lastItemRow,
                ]}
            >
                <View style={styles.itemMark}>
                    <Text style={styles.itemMarkText}>{item.mark || '•'}</Text>
                </View>
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemMeta}>
                        {[item.category, item.location].filter(Boolean).join(' · ') ||
                            'Без допълнителна информация'}
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eyebrow}>МОЯТ ИНВЕНТАР</Text>
            <View style={styles.heading}>
                <Text style={styles.title}>Всички вещи</Text>
                <Text style={styles.count}>{items.length}</Text>
            </View>

            <TextInput
                accessibilityLabel="Търси вещ"
                onChangeText={setSearch}
                placeholder="Търси по име, категория или място"
                placeholderTextColor="#8290A5"
                style={styles.searchInput}
                value={search}
            />

            {categories.length > 1 && (
                <View style={styles.categories}>
                    {categories.map((category) => {
                        const isSelected = selectedCategory === category;

                        return (
                            <Pressable
                                accessibilityRole="button"
                                accessibilityState={{ selected: isSelected }}
                                key={category}
                                onPress={() => setSelectedCategory(category)}
                                style={[
                                    styles.categoryChip,
                                    isSelected && styles.selectedCategoryChip,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.categoryText,
                                        isSelected && styles.selectedCategoryText,
                                    ]}
                                >
                                    {category}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
            )}

            <FlatList
                contentContainerStyle={[
                    styles.listContent,
                    filteredItems.length === 0 && styles.emptyListContent,
                ]}
                data={filteredItems}
                keyExtractor={(item, index) => item.id || `${item.name}-${index}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>
                            {items.length ? 'Няма намерени вещи' : 'Все още нямаш вещи'}
                        </Text>
                        <Text style={styles.emptyText}>
                            {items.length
                                ? 'Опитай с друга дума или категория.'
                                : 'Добави първата си вещ, за да я виждаш тук.'}
                        </Text>
                        {!items.length && (
                            <Pressable
                                accessibilityRole="button"
                                onPress={onAddItem}
                                style={styles.addButton}
                            >
                                <Text style={styles.addButtonText}>＋ Добави вещ</Text>
                            </Pressable>
                        )}
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 22,
        paddingTop: 20,
    },
    eyebrow: {
        color: '#64748B',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.2,
        marginBottom: 6,
    },
    heading: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 18,
    },
    title: {
        color: '#172B4D',
        fontSize: 27,
        fontWeight: '700',
    },
    count: {
        color: '#5474A5',
        fontSize: 14,
        fontWeight: '600',
    },
    searchInput: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
        borderRadius: 12,
        borderWidth: 1,
        color: '#172B4D',
        fontSize: 14,
        minHeight: 48,
        paddingHorizontal: 14,
    },
    categories: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 14,
    },
    categoryChip: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
        borderRadius: 18,
        borderWidth: 1,
        paddingHorizontal: 13,
        paddingVertical: 8,
    },
    selectedCategoryChip: {
        backgroundColor: '#E9FAF0',
        borderColor: '#B9F2D0',
    },
    categoryText: {
        color: '#64748B',
        fontSize: 12,
        fontWeight: '600',
    },
    selectedCategoryText: {
        color: '#258458',
    },
    listContent: {
        paddingTop: 18,
        paddingBottom: 24,
    },
    emptyListContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    emptyState: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
        borderRadius: 16,
        borderWidth: 1,
        padding: 22,
    },
    emptyTitle: {
        color: '#172B4D',
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
    },
    emptyText: {
        color: '#64748B',
        fontSize: 14,
        lineHeight: 20,
        marginTop: 8,
        textAlign: 'center',
    },
    itemRow: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#EEF2F7',
        borderBottomWidth: 1,
        flexDirection: 'row',
        minHeight: 76,
        paddingHorizontal: 14,
    },
    lastItemRow: {
        borderBottomWidth: 0,
    },
    itemMark: {
        alignItems: 'center',
        backgroundColor: '#E9FAF0',
        borderRadius: 12,
        height: 42,
        justifyContent: 'center',
        marginRight: 12,
        width: 42,
    },
    itemMarkText: {
        color: '#172B4D',
        fontSize: 16,
        fontWeight: '700',
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        color: '#172B4D',
        fontSize: 14,
        fontWeight: '600',
    },
    itemMeta: {
        color: '#8290A5',
        fontSize: 12,
        marginTop: 5,
    },
    addButton: {
        alignItems: 'center',
        backgroundColor: '#B9F2D0',
        borderRadius: 12,
        marginTop: 18,
        minHeight: 46,
        justifyContent: 'center',
        paddingHorizontal: 18,
    },
    addButtonText: {
        color: '#172B4D',
        fontSize: 14,
        fontWeight: '700',
    },
});
