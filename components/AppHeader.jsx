import { Text, View, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function AppHeader() {
    return (
        <>
            <StatusBar style="light"
                hidden={true} />
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
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        alignSelf: 'stretch',
        backgroundColor: '#172B4D',
        borderRadius: 0,
        padding: 22,
        marginBottom: 24,
        shadowColor: '#172B4D',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.18,
        shadowRadius: 14,
        elevation: 6,
    },
    brandRow: {
        flexDirection: 'row',
        alignItems: 'center',
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
    },
    title: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: '700',
        letterSpacing: 0.2,
    },
    tagline: {
        color: '#D5DEEC',
        fontSize: 14,
        lineHeight: 21,
        marginTop: 18,
    },
});