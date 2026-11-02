import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

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

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 22,
        paddingTop: 8,
        paddingBottom: 32,
    },
    greeting: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 22,
    },
    eyebrow: {
        color: '#64748B',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.2,
        marginBottom: 6,
    },
    title: {
        color: '#172B4D',
        fontSize: 28,
        fontWeight: '700',
    },
    subtitle: {
        color: '#64748B',
        fontSize: 14,
        marginTop: 5,
    },
    avatar: {
        alignItems: 'center',
        backgroundColor: '#B9F2D0',
        borderRadius: 22,
        height: 44,
        justifyContent: 'center',
        width: 44,
    },
    avatarText: {
        color: '#172B4D',
        fontSize: 18,
        fontWeight: '700',
    },
    summaryCard: {
        backgroundColor: '#172B4D',
        borderRadius: 20,
        marginBottom: 28,
        padding: 20,
    },
    summaryTop: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    summaryLabel: {
        color: '#D5DEEC',
        fontSize: 14,
    },
    summaryCount: {
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: '700',
        marginTop: 4,
    },
    summaryBadge: {
        backgroundColor: 'rgba(255,255,255,0.12)',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    summaryBadgeText: {
        color: '#B9F2D0',
        fontSize: 12,
        fontWeight: '600',
    },
    summaryDivider: {
        backgroundColor: 'rgba(255,255,255,0.18)',
        height: 1,
        marginVertical: 14,
    },
    summaryFootnote: {
        color: '#D5DEEC',
        fontSize: 13,
    },
    sectionHeading: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    sectionTitle: {
        color: '#172B4D',
        fontSize: 18,
        fontWeight: '700',
    },
    sectionHint: {
        color: '#5474A5',
        fontSize: 13,
        fontWeight: '600',
    },
    emptyState: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 24,
        padding: 18,
    },
    emptyStateText: {
        color: '#64748B',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
    },
    categoryList: {
        gap: 12,
        paddingBottom: 28,
    },
    categoryCard: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
        borderRadius: 16,
        borderWidth: 1,
        minWidth: 136,
        padding: 14,
    },
    categoryMark: {
        alignItems: 'center',
        borderRadius: 12,
        height: 38,
        justifyContent: 'center',
        marginBottom: 12,
        width: 38,
    },
    categoryMarkText: {
        color: '#172B4D',
        fontSize: 16,
        fontWeight: '700',
    },
    categoryName: {
        color: '#172B4D',
        fontSize: 14,
        fontWeight: '600',
    },
    categoryCount: {
        color: '#8290A5',
        fontSize: 12,
        marginTop: 5,
    },
    itemsList: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 14,
    },
    itemRow: {
        alignItems: 'center',
        borderBottomColor: '#EEF2F7',
        borderBottomWidth: 1,
        flexDirection: 'row',
        minHeight: 76,
    },
    lastItemRow: {
        borderBottomWidth: 0,
    },
    itemMark: {
        alignItems: 'center',
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
    itemArrow: {
        color: '#8290A5',
        fontSize: 24,
        marginLeft: 8,
    },
    addButton: {
        alignItems: 'center',
        backgroundColor: '#B9F2D0',
        borderRadius: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        minHeight: 52,
    },
    addButtonText: {
        color: '#172B4D',
        fontSize: 21,
        fontWeight: '600',
        marginRight: 8,
    },
    addButtonLabel: {
        color: '#172B4D',
        fontSize: 15,
        fontWeight: '700',
    },
});
