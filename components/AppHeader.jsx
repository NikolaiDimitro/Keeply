import { Image, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { appHeaderStyles as styles } from '../styles/components';

export default function AppHeaderComponent({
    compact = false,
}) {
    return (
        <>
            <StatusBar style="light" />
            <View style={[styles.headerContainer, compact && styles.compactHeader]}>
                <View style={styles.brandRow}>
                    <View style={styles.brandInfo}>
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
                </View>
                {!compact && (
                    <Text style={styles.tagline}>
                        Запази важното. Не губи ценното.
                    </Text>
                )}
            </View>
        </>
    );
}
