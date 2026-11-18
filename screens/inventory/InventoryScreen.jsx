import { useCallback, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { inventoryStyles as styles } from '../../styles/components';
import { getAllItems } from '../../services/itemRequester';

export default function InventoryScreen({ navigation }) {

    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Всички');
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loadError, setLoadError] = useState('');

    const loadItems = useCallback(async (refreshing = false) => {
        if (refreshing) {
            setIsRefreshing(true);
        } else {
            setIsLoading(true);
        }
        setLoadError('');

        try {
            setItems(await getAllItems());
        } catch (error) {
            setLoadError(error?.message || 'Вещите не можаха да бъдат заредени.');
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadItems();
        }, [loadItems]),
    );

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
                [item.name, item.category, item.store]
                    .filter(Boolean)
                    .some((value) => value.toLocaleLowerCase('bg-BG').includes(query));

            return matchesCategory && matchesSearch;
        });
    }, [items, search, selectedCategory]);

    function renderItem({ item, index }) {
        return (
            <Pressable
                accessibilityRole="button"
                onPress={() => navigation.navigate('Details', { item })}
                style={[
                    styles.itemRow,
                    index === filteredItems.length - 1 && styles.lastItemRow,
                ]}
            >
                <View style={styles.itemMark}>
                    <Text style={styles.itemMarkText}>
                        {item.category?.charAt(0).toLocaleUpperCase('bg-BG') || '•'}
                    </Text>
                </View>
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemMeta}>
                        {[item.category, item.store].filter(Boolean).join(' · ') ||
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
                <View style={styles.headingTitleGroup}>
                    <Text style={styles.title}>Всички вещи</Text>
                    <Text style={styles.count}>{items.length}</Text>
                </View>
                <Pressable onPress={() => navigation.navigate('Create')}>
                    <View style={styles.headerAddButton}>
                        <Text style={styles.headerAddButtonText}>＋ Добави</Text>
                    </View>
                </Pressable>
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
                keyExtractor={(item, index) => item.docId || `${item.name}-${index}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                onRefresh={() => loadItems(true)}
                refreshing={Boolean(isRefreshing)}
                ListHeaderComponent={
                    isLoading ? (
                        <View style={styles.emptyState}>
                            <ActivityIndicator color="#258458" />
                        </View>
                    ) : loadError ? (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyTitle}>Грешка при зареждането</Text>
                            <Text style={styles.emptyText}>{loadError}</Text>
                        </View>
                    ) : null
                }
                ListEmptyComponent={
                    !isLoading && !loadError ? (
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
                                    onPress={() => navigation.navigate('Create')}
                                    style={styles.addButton}
                                >
                                    <Text style={styles.addButtonText}>＋ Добави вещ</Text>
                                </Pressable>
                            )}
                        </View>
                    ) : null
                }
            />
        </View>
    );
}


