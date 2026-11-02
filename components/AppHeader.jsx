import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

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

const styles = StyleSheet.create({
    headerContainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#172B4D',
        borderRadius: 0,
        padding: 22,
        paddingTop: 42,
        marginBottom: 24,
        shadowColor: '#172B4D',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.18,
        shadowRadius: 14,
        elevation: 6,
        position: 'relative',
        zIndex: 1,
    },
    brandRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    accountRow: {
        alignItems: 'flex-end',
        height: 42,
        marginTop: 14,
        position: 'relative',
        width: '100%',
        zIndex: 2,
    },
    accountButton: {
        alignItems: 'center',
        backgroundColor: '#B9F2D0',
        borderRadius: 14,
        height: 42,
        justifyContent: 'center',
        width: 42,
    },
    menuIcon: {
        gap: 4,
    },
    menuIconLine: {
        backgroundColor: '#172B4D',
        borderRadius: 2,
        height: 2,
        width: 18,
    },
    menu: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
        borderRadius: 12,
        borderWidth: 1,
        minWidth: 150,
        position: 'absolute',
        top: 48,
        right: 0,
        zIndex: 3,
        elevation: 8,
        shadowColor: '#172B4D',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.16,
        shadowRadius: 8,
    },
    menuItem: {
        borderBottomColor: '#EEF2F7',
        borderBottomWidth: 1,
        minHeight: 46,
        justifyContent: 'center',
        paddingHorizontal: 14,
    },
    lastMenuItem: {
        borderBottomWidth: 0,
    },
    menuItemText: {
        color: '#172B4D',
        fontSize: 14,
        fontWeight: '600',
    },
    brandImage: {
        width: 40,
        height: 40,
    },
    brandMark: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: '#B9F2D0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    brandInitial: {
        color: '#172B4D',
        fontSize: 25,
        fontWeight: 'bold',
    },
    eyebrow: {
        color: '#B9F2D0',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.4,
        marginBottom: 3,
        textAlign: 'center',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: '700',
        letterSpacing: 0.2,
        textAlign: 'center',
    },
    tagline: {
        color: '#D5DEEC',
        fontSize: 14,
        lineHeight: 21,
        marginTop: 18,
        textAlign: 'center',
    },
});