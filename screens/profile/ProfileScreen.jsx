import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { profileStyles as styles } from '../../styles/components';
import requestApi from '../../services/authRequester';

export default function ProfileScreen({ user }) {
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [signOutError, setSignOutError] = useState('');
    const displayName = user?.displayName || 'Иван Иванов';
    const email = user?.email || 'ivan@example.com';

    async function handleSignOut() {
        setSignOutError('');
        setIsSigningOut(true);

        try {
            await requestApi.logout();
        } catch {
            setSignOutError('Неуспешен изход от профила. Опитайте отново.');
            setIsSigningOut(false);
        }
    }

    return (
        <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.profileCard}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {displayName.charAt(0).toLocaleUpperCase('bg-BG')}
                    </Text>
                </View>
                <Text style={styles.title}>{displayName}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionCopy}>
                    <Text style={styles.sectionTitle}>Име</Text>
                    <Text style={styles.sectionValue}>{displayName}</Text>
                </View>
                <View style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Промени</Text>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionCopy}>
                    <Text style={styles.sectionTitle}>Парола</Text>
                    <Text style={styles.sectionValue}>••••••••</Text>
                </View>
                <View style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Смени</Text>
                </View>
            </View>

            <Pressable
                accessibilityRole="button"
                accessibilityState={{ disabled: isSigningOut }}
                disabled={isSigningOut}
                onPress={handleSignOut}
                style={({ pressed }) => [
                    styles.signOutButton,
                    pressed && styles.signOutButtonPressed,
                ]}
            >
                <Text style={styles.signOutText}>
                    {isSigningOut ? 'Излизане...' : 'Излез от профил'}
                </Text>
            </Pressable>
            {signOutError ? (
                <Text style={{ color: '#B91C1C', textAlign: 'center' }}>
                    {signOutError}
                </Text>
            ) : null}
        </ScrollView>
    );
}

