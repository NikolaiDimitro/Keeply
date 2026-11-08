import { useMemo, useState } from 'react';
import {
    FlatList,
    Pressable,
    
    Text,
    TextInput,
    View,
} from 'react-native';
import { inventoryStyles as styles } from '../../styles/components';

export default function InventoryScreen({ items = [], onAddItem, onSelectItem }) {
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
            <Pressable
                accessibilityRole="button"
                onPress={() => onSelectItem?.(item)}
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
            </Pressable>
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


