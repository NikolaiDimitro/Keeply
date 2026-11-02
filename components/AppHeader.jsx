import { useState } from 'react';
import { Image, Pressable,  Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { appHeaderStyles as styles } from '../styles/components';

export default function AppHeader({ isLoggedIn }) {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.headerContainer}>
                <View style={styles.brandRow}>
                    <View style={styles.brandMark}>
                        <Image
                            source={require('../assets/connectivity.png')}
                            style={styles.brandImage}
                            resizeMode="contain"
                            accessibilityLabel="Keeply Logo"
                        />
                    </View>
                    <View>
                        <Text style={styles.eyebrow}>ТВОЯТ ЛИЧЕН ИНВЕНТАР</Text>
                        <Text style={styles.title}>Keeply</Text>
                    </View>
                </View>
                <Text style={styles.tagline}>
                    Запази важното. Не губи ценното.
                </Text>
                <View style={styles.accountRow}>
                    <Pressable
                        accessibilityLabel={isLoggedIn ? 'Отвори меню за профила' : 'Отвори меню за вход'}
                        accessibilityRole="button"
                        accessibilityState={{ expanded: menuVisible }}
                        onPress={() => setMenuVisible((visible) => !visible)}
                        style={styles.accountButton}
                    >
                        <View style={styles.menuIcon}>
                            <View style={styles.menuIconLine} />
                            <View style={styles.menuIconLine} />
                            <View style={styles.menuIconLine} />
                        </View>
                    </Pressable>
                    {menuVisible && (
                        <View style={styles.menu}>
                            {isLoggedIn ? (
                                <>
                                    <View style={styles.menuItem}>
                                        <Text style={styles.menuItemText}>Моят профил</Text>
                                    </View>
                                    <View style={[styles.menuItem, styles.lastMenuItem]}>
                                        <Text style={styles.menuItemText}>Изход</Text>
                                    </View>
                                </>
                            ) : (
                                <>
                                    <View style={styles.menuItem}>
                                        <Text style={styles.menuItemText}>Вход</Text>
                                    </View>
                                    <View style={[styles.menuItem, styles.lastMenuItem]}>
                                        <Text style={styles.menuItemText}>Регистрация</Text>
                                    </View>
                                </>
                            )}
                        </View>
                    )}
                </View>
            </View>
        </>
    );
}

