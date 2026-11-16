import { useContext, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
import { profileStyles as styles } from '../../styles/components';
import { AuthenticatedContext } from '../../providers/authProveders';
import requestApi from '../../services/authRequester';

const passwordChangeErrorMessages = {
    'auth/invalid-credential': 'Текущата парола е невалидна.',
    'auth/wrong-password': 'Текущата парола е невалидна.',
    'auth/requires-recent-login': 'Излезте от профила и влезте отново, преди да смените паролата.',
    'auth/weak-password': 'Новата парола трябва да бъде поне 6 символа.',
    'auth/network-request-failed': 'Проблем с интернет връзката. Опитайте отново.',
};

function getPasswordChangeErrorMessage(error) {
    const code = error && typeof error === 'object' ? error.code : undefined;
    return passwordChangeErrorMessages[code] ?? 'Паролата не можа да бъде сменена. Опитайте отново.';
}

export default function ProfileScreen() {

    const [isSigningOut, setIsSigningOut] = useState(false);
    const [signOutError, setSignOutError] = useState('');
    const [isChangeName, setChangeName] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [updatedDisplayName, setUpdatedDisplayName] = useState(null);
    const [isSavingName, setIsSavingName] = useState(false);
    const [nameError, setNameError] = useState('');
    const [nameSuccessMessage, setNameSuccessMessage] = useState('');

    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [isOldPassword, setOldPasswor] = useState('');
    const [isOldConfirmedPassword, setOldConfirmedPasswor] = useState('');
    const [isNewPassword, setNewPasswor] = useState('');
    const [isNewConfirmedPassword, setNewConfirmedPasswor] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccessMessage, setPasswordSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setNameSuccessMessage('');
        setChangeName(true);
    }

    function cancelNameChange() {
        setEditedName('');
        setNameError('');
        setChangeName(false);
    }

    async function isChangingNameHandler() {
        const nextName = editedName.trim();

        if (!nextName) {
            setNameError('Името е задължително.');
            setTimeout(() => setNameError(''), 3000);
            return;
        }

        if (nextName.length < 6) {

            setNameError('Името трябва да бъде дълго поне 6 символа.');
            setTimeout(() => setNameError(''), 3000);
            return;

        }

        setNameError('');
        setIsSavingName(true);

        try {
            await requestApi.changingName(nextName);
            setUpdatedDisplayName(nextName);
            setChangeName(false);
            setNameSuccessMessage('Името беше променено успешно.');
            setTimeout(() => setNameSuccessMessage(''), 3000);
        } catch {
            setNameError('Името не можа да бъде променено. Опитайте отново.');
            setTimeout(() => setNameError(''), 3000);
        } finally {
            setIsSavingName(false);
        }
    }

    function clearPasswordFields() {
        setOldPasswor('');
        setOldConfirmedPasswor('');
        setNewPasswor('');
        setNewConfirmedPasswor('');
    }

    function startPasswordChange() {
        setPasswordError('');
        setPasswordSuccessMessage('');
        clearPasswordFields();
        setIsChangingPassword(true);
    }

    function cancelPasswordChange() {
        setPasswordError('');
        clearPasswordFields();
        setIsChangingPassword(false);
    }

    async function onSubmitChangePasswordHandler() {
        setPasswordError('');
        setPasswordSuccessMessage('');

        if (!isOldPassword) {
            setPasswordError('Въведи текущата парола.');
            setTimeout(() => setPasswordError(''), 3000);
            return;
        }

        if (isOldPassword !== isOldConfirmedPassword) {
            setPasswordError('Въведените текущи пароли не съвпадат.');
            setTimeout(() => setPasswordError(''), 3000);
            return;
        }

        if (isNewPassword.length < 6) {
            setPasswordError('Новата парола трябва да бъде поне 6 символа.');
            setTimeout(() => setPasswordError(''), 3000);
            return;
        }

        if (isNewPassword !== isNewConfirmedPassword) {
            setPasswordError('Новите пароли не съвпадат.');
            setTimeout(() => setPasswordError(''), 3000);
            return;
        }

        if (isOldPassword === isNewPassword) {

            setPasswordError('Старата и новата парола трябва да бъдат различни!');
            setTimeout(() => setPasswordError(''), 3000);
            return;

        }


        if (!user) {
            setPasswordError('Няма влязъл потребител.');
            setTimeout(() => setPasswordError(''), 3000);
            return;
        }

        setIsSubmitting(true);

        try {
            await requestApi.changingPassword({
                user,
                currentPassword: isOldPassword,
                password: isNewPassword,
            });

            clearPasswordFields();
            setIsChangingPassword(false);
            setPasswordSuccessMessage('Паролата беше сменена успешно.');
            setTimeout(() => setPasswordSuccessMessage(''), 3000);
        } catch (error) {
            setPasswordError(getPasswordChangeErrorMessage(error));
            setTimeout(() => setPasswordError(''), 3000);
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <KeyboardAvoidingView
            behavior={
                Platform.OS === 'ios'
                    ? 'padding'
                    : Platform.OS === 'android'
                        ? 'height'
                        : undefined
            }
            style={styles.keyboardAvoidingView}
        >
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardDismissMode="none"
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
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
                        <>
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
                            <Pressable
                                accessibilityRole="button"
                                accessibilityState={{ disabled: isSavingName }}
                                disabled={isSavingName}
                                onPress={cancelNameChange}
                                style={styles.secondaryButton}
                            >
                                <Text style={styles.secondaryButtonText}>Отказ</Text>
                            </Pressable>
                        </>
                        :
                        <Pressable style={styles.secondaryButton} onPress={changeName}>
                            <Text style={styles.secondaryButtonText}>Промени</Text>
                        </Pressable>
                    }
                </View>
                {nameError ? (
                    <Text style={styles.profileError}>{nameError}</Text>
                ) : null}
                {nameSuccessMessage ? (
                    <Text style={styles.passwordSuccessMessage}>
                        {nameSuccessMessage}
                    </Text>
                ) : null}

                {isChangingPassword ? (
                    <View style={[styles.section, styles.passwordSection]}>
                        <View style={styles.passwordForm}>
                            <Text style={styles.sectionTitle}>Смяна на парола</Text>
                            <View style={styles.passwordField}>
                                <Text style={styles.passwordLabel}>Стара парола</Text>
                                <TextInput
                                    accessibilityLabel="Стара парола"
                                    secureTextEntry
                                    onChangeText={setOldPasswor}
                                    style={styles.passwordInput}
                                    value={isOldPassword}
                                />
                            </View>
                            <View style={styles.passwordField}>
                                <Text style={styles.passwordLabel}>Повтори старата парола</Text>
                                <TextInput
                                    accessibilityLabel="Повтори старата парола"
                                    secureTextEntry
                                    onChangeText={setOldConfirmedPasswor}
                                    style={styles.passwordInput}
                                    value={isOldConfirmedPassword}
                                />
                            </View>
                            <View style={styles.passwordField}>
                                <Text style={styles.passwordLabel}>Нова парола</Text>
                                <TextInput
                                    accessibilityLabel="Нова парола"
                                    secureTextEntry
                                    onChangeText={setNewPasswor}
                                    style={styles.passwordInput}
                                    value={isNewPassword}
                                />
                            </View>
                            <View style={styles.passwordField}>
                                <Text style={styles.passwordLabel}>Повтори новата парола</Text>
                                <TextInput
                                    accessibilityLabel="Повтори новата парола"
                                    onChangeText={setNewConfirmedPasswor}
                                    secureTextEntry
                                    style={styles.passwordInput}
                                    value={isNewConfirmedPassword}
                                />
                            </View>
                            {passwordError ? (
                                <Text style={styles.profileError}>{passwordError}</Text>
                            ) : null}
                            <Pressable
                                accessibilityRole="button"
                                accessibilityState={{ disabled: isSubmitting }}
                                disabled={isSubmitting}
                                style={styles.passwordConfirmButton}
                                onPress={onSubmitChangePasswordHandler}
                            >
                                <Text
                                    style={styles.passwordConfirmButtonText}>
                                    {isSubmitting ? 'Запазване...' : 'Потвърди'}
                                </Text>
                            </Pressable>
                            <Pressable
                                accessibilityRole="button"
                                accessibilityState={{ disabled: isSubmitting }}
                                disabled={isSubmitting}
                                onPress={cancelPasswordChange}
                                style={styles.passwordConfirmButton}
                            >
                                <Text style={styles.passwordConfirmButtonText}>Отказ</Text>
                            </Pressable>
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
                        </View>
                    </View>
                ) : (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Смени паролата"
                        onPress={startPasswordChange}
                        style={styles.section}
                    >
                        <View style={styles.sectionCopy}>
                            <Text style={styles.sectionTitle}>Парола</Text>
                        </View>
                        <View
                            style={[
                                styles.secondaryButton,
                                styles.passwordToggleButton,
                            ]}
                        >
                            <Text style={styles.secondaryButtonText}>Смени паролата</Text>
                        </View>
                    </Pressable>
                )}

                {passwordSuccessMessage ? (
                    <Text style={styles.passwordSuccessMessage}>
                        {passwordSuccessMessage}
                    </Text>
                ) : null}

                {!isChangingPassword ? (
                    <>
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
                    </>
                ) : null}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

