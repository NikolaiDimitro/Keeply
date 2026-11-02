import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tabs = [
    { key: 'home', label: 'Начало', icon: '⌂' },
    { key: 'inventory', label: 'Инвентар', icon: '▤' },
    { key: 'add', label: 'Добави', icon: '+' },
];

export default function Footer({ activeTab, onTabChange }) {
    return (
        <SafeAreaView edges={['bottom']} style={styles.container}>
            <View style={styles.tabs}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.key;

                    return (
                        <Pressable
                            accessibilityLabel={tab.label}
                            accessibilityRole="button"
                            accessibilityState={{ selected: isActive }}
                            key={tab.key}
                            onPress={() => onTabChange(tab.key)}
                            style={styles.tab}
                        >
                            <Text style={[styles.icon, isActive && styles.activeText]}>
                                {tab.icon}
                            </Text>
                            <Text style={[styles.label, isActive && styles.activeText]}>
                                {tab.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderTopColor: '#E2E8F0',
        borderTopWidth: 1,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 8,
    },
    tab: {
        alignItems: 'center',
        flex: 1,
        minHeight: 52,
        justifyContent: 'center',
    },
    icon: {
        color: '#8290A5',
        fontSize: 21,
        fontWeight: '700',
        lineHeight: 25,
    },
    label: {
        color: '#8290A5',
        fontSize: 11,
        fontWeight: '600',
        marginTop: 2,
    },
    activeText: {
        color: '#258458',
    },
});