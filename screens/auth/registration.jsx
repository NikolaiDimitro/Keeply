import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    
    Text,
    TextInput,
    View,
} from 'react-native';
import { registrationStyles as styles } from '../../styles/components';

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

