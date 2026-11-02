import { Pressable, ScrollView, Text, View } from 'react-native';
import { loggedInHomeStyles as styles } from '../styles/components';

export default function LoggedInHome({ items = [], onShowAll, onAddItem }) {
    const recentItems = items.slice(0, 3);
    const categories = Array.from(
        items.reduce((categoryMap, item) => {
            if (!item.category) {
                return categoryMap;
            }

            const category = categoryMap.get(item.category) || {
                name: item.category,
                count: 0,
                color: item.color || '#E9FAF0',
                mark: item.mark || '•',
            };
            category.count += 1;
            categoryMap.set(item.category, category);

            return categoryMap;
        }, new Map()).values(),
    );

    return (
        <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
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
                    <Text style={styles.avatarText}>К</Text>
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

            <View style={styles.sectionHeading}>
                <Text style={styles.sectionTitle}>Категории</Text>
                <Text style={styles.sectionHint}>{categories.length} общо</Text>
            </View>

            {categories.length > 0 ? (
                <ScrollView
                    horizontal
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
                    onPress={onShowAll}
                    hitSlop={8}
                >
                    <Text style={styles.sectionHint}>Виж всички</Text>
                </Pressable>
            </View>

            {recentItems.length > 0 ? (
                <View style={styles.itemsList}>
                    {recentItems.map((item, index) => (
                        <View
                            key={item.id || `${item.name}-${index}`}
                            style={[
                                styles.itemRow,
                                index === recentItems.length - 1 &&
                                    styles.lastItemRow,
                            ]}
                        >
                            <View
                                style={[
                                    styles.itemMark,
                                    { backgroundColor: item.color },
                                ]}
                            >
                                <Text style={styles.itemMarkText}>
                                    {item.mark}
                                </Text>
                            </View>
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemMeta}>
                                    {item.category} · {item.location}
                                </Text>
                            </View>
                            <Text style={styles.itemArrow}>›</Text>
                        </View>
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
                onPress={onAddItem}
                style={styles.addButton}
            >
                <Text style={styles.addButtonText}>＋</Text>
                <Text style={styles.addButtonLabel}>Добави вещ</Text>
            </Pressable>
        </ScrollView>
    );
}

