import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { footerStyles as styles } from '../styles/components';

const tabs = [
    { key: 'home', label: 'Начало', icon: '⌂' },
    { key: 'inventory', label: 'Инвентар', icon: '▤' },
    { key: 'add', label: 'Добави', icon: '+' },
];

export default function FooterComponent({ activeTab, onTabChange }) {
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
