import { useCallback, useContext, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthenticatedContext } from '../providers/authProveders';
import { loggedInHomeStyles as styles } from '../styles/components';
import { getAllItems } from '../services/itemRequester';

const categoryColors = ['#E9FAF0', '#FFF1E8', '#EEF2FF', '#FFF7D6', '#FCE7F3'];

function getCreatedAtTime(item) {
    if (item.createdAt?.toMillis) {
        return item.createdAt.toMillis();
    }

    const date = item.createdAt?.seconds
        ? new Date(item.createdAt.seconds * 1000)
        : new Date(item.createdAt);

    return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

function getCategoryColor(index) {
    const safeIndex = index >= 0 ? index : 0;
    return categoryColors[safeIndex % categoryColors.length];
}

export default function LoggedInHome() {

    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { user, refreshUser } = useContext(AuthenticatedContext);
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
            await refreshUser();
            setItems(await getAllItems());
        } catch (error) {
            setLoadError(error?.message || 'Вещите не можаха да бъдат заредени.');
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }, [refreshUser]);

    useFocusEffect(
        useCallback(() => {
            loadItems();
        }, [loadItems]),
    );

    const userLabel = user?.displayName?.trim() || user?.email?.trim() || '?';
    const avatarInitial = userLabel.charAt(0).toLocaleUpperCase('bg-BG');

    const recentItems = [...items]
        .sort((first, second) => getCreatedAtTime(second) - getCreatedAtTime(first))
        .slice(0, 3);
    const categories = Array.from(
        items.reduce((categoryMap, item) => {

            if (!item.category) {

                return categoryMap;
                
            }

            const category = categoryMap.get(item.category) || {
                name: item.category,
                count: 0,
                color: getCategoryColor(categoryMap.size),
                mark: item.category.charAt(0).toLocaleUpperCase('bg-BG'),
            };
            category.count += 1;
            categoryMap.set(item.category, category);

            return categoryMap;
        }, new Map()).values(),
    );

    return (
        <ScrollView
            contentContainerStyle={[
                styles.content,
                { paddingBottom: styles.content.paddingBottom + insets.bottom },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    onRefresh={() => loadItems(true)}
                    refreshing={isRefreshing}
                    tintColor="#258458"
                />
            }
        >
            <View style={styles.greeting}>
                <View>
                    <Text style={styles.eyebrow}>ТВОЯТ ЛИЧЕН ИНВЕНТАР</Text>
                    <Text style={styles.title}>Здравей!</Text>
                    <Text style={styles.subtitle}>
                        Всичко важно, подредено на едно място.
                    </Text>
                </View>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{avatarInitial}</Text>
                </View>
            </View>

            <View style={styles.summaryCard}>
                <View style={styles.summaryTop}>
                    <View>
                        <Text style={styles.summaryLabel}>Общо вещи</Text>
                        <Text style={styles.summaryCount}>
                            {items.length}
                        </Text>
                    </View>
                    <View style={styles.summaryBadge}>
                        <Text style={styles.summaryBadgeText}>Моят инвентар</Text>
                    </View>
                </View>
                <View style={styles.summaryDivider} />
                <Text style={styles.summaryFootnote}>
                    {categories.length
                        ? `Разпределени в ${categories.length} категории`
                        : 'Все още нямаш добавени вещи'}
                </Text>
            </View>

            {isLoading ? (
                <View style={styles.emptyState}>
                    <ActivityIndicator color="#258458" />
                </View>
            ) : null}

            {loadError ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>{loadError}</Text>
                </View>
            ) : null}

            <View style={styles.sectionHeading}>
                <Text style={styles.sectionTitle}>Категории</Text>
                <Text style={styles.sectionHint}>{categories.length} общо</Text>
            </View>

            {categories.length > 0 ? (
                <ScrollView
                    horizontal
                    keyboardShouldPersistTaps="handled"
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryList}
                >
                    {categories.map((category) => (
                        <View key={category.name} style={styles.categoryCard}>
                            <View
                                style={[
                                    styles.categoryMark,
                                    { backgroundColor: category.color },
                                ]}
                            >
                                <Text style={styles.categoryMarkText}>
                                    {category.mark}
                                </Text>
                            </View>
                            <Text style={styles.categoryName}>
                                {category.name}
                            </Text>
                            <Text style={styles.categoryCount}>
                                {category.count}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>
                        Категориите ти ще се появят тук.
                    </Text>
                </View>
            )}

            <View style={styles.sectionHeading}>
                <Text style={styles.sectionTitle}>Последно добавени</Text>
                <Pressable
                    accessibilityRole="button"
                    hitSlop={8}
                    onPress={() => navigation.navigate('Inventory', {
                        screen: 'InventorList',
                    })}
                >
                    <Text style={styles.sectionHint}>Виж всички</Text>
                </Pressable>
            </View>

            {recentItems.length > 0 ? (
                <View style={styles.itemsList}>
                    {recentItems.map((item, index) => (
                        <Pressable
                            accessibilityRole="button"
                            key={item.docId || `${item.name}-${index}`}
                            onPress={() => navigation.navigate('Inventory', {
                                screen: 'Details',
                                params: { item },
                            })}
                            style={[
                                styles.itemRow,
                                index === recentItems.length - 1 &&
                                styles.lastItemRow,
                            ]}
                        >
                            <View
                                style={[
                                    styles.itemMark,
                                    {
                                        backgroundColor: getCategoryColor(
                                            categories.findIndex(
                                                (category) => category.name === item.category,
                                            ),
                                        ),
                                    },
                                ]}
                            >
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
                            <Text style={styles.itemArrow}>›</Text>
                        </Pressable>
                    ))}
                </View>
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>
                        Все още нямаш добавени вещи.
                    </Text>
                </View>
            )}

            <Pressable
                accessibilityRole="button"
                style={styles.addButton}
                onPress={() => navigation.navigate('Inventory', {
                    screen: 'Create',
                })}
            >
                <Text style={styles.addButtonText}>＋</Text>
                <Text style={styles.addButtonLabel}>Добави вещ</Text>
            </Pressable>
        </ScrollView>
    );
}
