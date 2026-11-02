import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function Registration({ onRegister, onNavigate }) {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [validationMessage, setValidationMessage] = useState('');

    function submitRegistration() {
        if (password !== confirmedPassword) {
            setValidationMessage('Паролите не съвпадат.');
            return;
        }

        if (!displayName.trim() || !email.trim() || !password) {
            setValidationMessage('Попълни всички полета.');
            return;
        }

        setValidationMessage('');
        onRegister({
            displayName: displayName.trim(),
            email: email.trim(),
            password,
        });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.card}>
                    <Text style={styles.title}>Създай профил</Text>
                    <Text style={styles.subtitle}>
                        Регистрирай се, за да започнеш да използваш Keeply.
                    </Text>

                    <Text style={styles.label}>Име</Text>
                    <TextInput
                        accessibilityLabel="Име"
                        autoCapitalize="words"
                        autoComplete="name"
                        autoCorrect={false}
                        onChangeText={setDisplayName}
                        placeholder="Въведи името си"
                        placeholderTextColor="#8290A5"
                        returnKeyType="next"
                        style={styles.input}
                        textContentType="name"
                        value={displayName}
                    />

                    <Text style={styles.label}>Имейл</Text>
                    <TextInput
                        accessibilityLabel="Имейл"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect={false}
                        keyboardType="email-address"
                        onChangeText={setEmail}
                        placeholder="name@example.com"
                        placeholderTextColor="#8290A5"
                        returnKeyType="next"
                        style={styles.input}
                        textContentType="emailAddress"
                        value={email}
                    />

                    <Text style={styles.label}>Парола</Text>
                    <TextInput
                        accessibilityLabel="Парола"
                        autoComplete="new-password"
                        onChangeText={setPassword}
                        placeholder="Създай парола"
                        placeholderTextColor="#8290A5"
                        returnKeyType="next"
                        secureTextEntry
                        style={styles.input}
                        textContentType="newPassword"
                        value={password}
                    />

                    <Text style={styles.label}>Потвърди паролата</Text>
                    <TextInput
                        accessibilityLabel="Потвърди паролата"
                        autoComplete="new-password"
                        onChangeText={setConfirmedPassword}
                        placeholder="Въведи паролата отново"
                        placeholderTextColor="#8290A5"
                        returnKeyType="done"
                        secureTextEntry
                        style={styles.input}
                        textContentType="newPassword"
                        value={confirmedPassword}
                    />

                    {validationMessage ? (
                        <Text style={styles.validationMessage}>{validationMessage}</Text>
                    ) : null}

                    <Pressable
                        accessibilityRole="button"
                        onPress={submitRegistration}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Регистрация</Text>
                    </Pressable>

                    <Text style={styles.loginPrompt}>
                        Вече имаш профил?{' '}
                        <Text
                            accessibilityRole="button"
                            onPress={() => onNavigate('login')}
                            style={styles.loginText}
                        >
                            Вход
                        </Text>
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 28,
    },
    card: {
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
        borderRadius: 20,
        borderWidth: 1,
        maxWidth: 440,
        padding: 24,
        width: '100%',
    },
    title: {
        color: '#172B4D',
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
    },
    subtitle: {
        color: '#64748B',
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 28,
        marginTop: 8,
        textAlign: 'center',
    },
    label: {
        color: '#172B4D',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F8FAFC',
        borderColor: '#CBD5E1',
        borderRadius: 12,
        borderWidth: 1,
        color: '#172B4D',
        fontSize: 16,
        minHeight: 52,
        marginBottom: 18,
        paddingHorizontal: 14,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#B9F2D0',
        borderRadius: 12,
        justifyContent: 'center',
        minHeight: 52,
        marginTop: 4,
    },
    buttonText: {
        color: '#172B4D',
        fontSize: 16,
        fontWeight: '700',
    },
    validationMessage: {
        color: '#B42318',
        fontSize: 13,
        marginBottom: 12,
    },
    loginPrompt: {
        color: '#64748B',
        fontSize: 14,
        marginTop: 22,
        textAlign: 'center',
    },
    loginText: {
        color: '#172B4D',
        fontWeight: '700',
    },
});