import { useContext, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { profileStyles as styles } from '../../styles/components';
import { AuthenticatedContext } from '../../providers/authProveders';
import requestApi from '../../services/authRequester';

export default function ProfileScreen() {

    const [isSigningOut, setIsSigningOut] = useState(false);
    const [signOutError, setSignOutError] = useState('');
    const [isChangeName, setChangeName] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [updatedDisplayName, setUpdatedDisplayName] = useState(null);
    const [isSavingName, setIsSavingName] = useState(false);
    const [nameError, setNameError] = useState('');

    const { user } = useContext(AuthenticatedContext);

    const displayName = updatedDisplayName ?? user?.displayName ?? 'Unknown';
    const email = user?.email || 'Unknown';

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

    function changeName() {
        setEditedName(user?.displayName ?? '');
        setNameError('');
        setChangeName(true);
    }

    async function isChangingNameHandler() {
        const nextName = editedName.trim();

        if (!nextName) {
            setNameError('Името е задължително.');
            return;
        }

        setNameError('');
        setIsSavingName(true);

        try {
            await requestApi.changingName(nextName);
            setUpdatedDisplayName(nextName);
            setChangeName(false);
        } catch {
            setNameError('Името не можа да бъде променено. Опитайте отново.');
        } finally {
            setIsSavingName(false);
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
                {isChangeName ?

                    <View style={styles.sectionCopy}>
                        <Text style={styles.sectionTitle}>Име</Text>
                        <TextInput
                            accessibilityLabel="Ново име"
                            autoCapitalize="words"
                            onChangeText={setEditedName}
                            placeholder="Име"
                            style={styles.sectionValue}
                            value={editedName}
                        />
                    </View>

                    :

                    <View style={styles.sectionCopy}>
                        <Text style={styles.sectionTitle}>Име</Text>
                        <Text style={styles.sectionValue}>{displayName}</Text>
                    </View>

                }
                {isChangeName ?

                    <Pressable
                        accessibilityRole="button"
                        accessibilityState={{ disabled: isSavingName }}
                        disabled={isSavingName}
                        style={styles.secondaryButton}
                        onPress={isChangingNameHandler}
                    >
                        <Text style={styles.secondaryButtonText}>
                            {isSavingName ? 'Запазване...' : 'Запази'}
                        </Text>
                    </Pressable>
                    :
                    <Pressable style={styles.secondaryButton} onPress={changeName}>
                        <Text style={styles.secondaryButtonText}>Промени</Text>
                    </Pressable>
                }
            </View>
            {nameError ? (
                <Text style={styles.profileError}>{nameError}</Text>
            ) : null}

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

