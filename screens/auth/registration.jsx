import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    View,
    Pressable,
} from 'react-native';
import { useState } from 'react';
import { registerUser } from '../../services/authRequester';
import { registrationStyles as styles } from '../../styles/components';

const emailValidator = /^[A-Za-z0-9_%]+@(gmail|abv)\.[a-z]+$/i;

export default function Registration({ onNavigate }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    function updateField(setter, value) {

        setter(value);
        setError('');

    }

    async function handleRegistration() {

        if (isSubmitting) {
            return;
        }

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();

        if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
            setError('Моля, попълнете всички полета.');
            return;
        }

        if (!emailValidator.test(trimmedEmail)) {
            setError('Въведете валиден имейл адрес от Gmail или ABV.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Паролите не съвпадат.');
            return;
        }

        if (trimmedName.length < 6) {

            setError('Дължината на името трябва да бъде поне 6 символа');
            return;

        }

        if (password.length < 6) {

            setError('Дължината на паролата трябва да бъде поне 6 символа');
            return;
            
        }

        setError('');
        setIsSubmitting(true);

        try {

            await registerUser(trimmedName, trimmedEmail, password);

        } catch (registrationError) {

            setError(registrationError?.message || 'Възникна грешка при регистрацията.');

        } finally {

            setIsSubmitting(false);

        }
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
                        placeholder="Въведи името си"
                        placeholderTextColor="#8290A5"
                        returnKeyType="next"
                        style={styles.input}
                        textContentType="name"
                        value={name}
                        onChangeText={(value) => updateField(setName, value)}
                    />

                    <Text style={styles.label}>Имейл</Text>
                    <TextInput
                        accessibilityLabel="Имейл"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect={false}
                        keyboardType="email-address"
                        placeholder="name@example.com"
                        placeholderTextColor="#8290A5"
                        returnKeyType="next"
                        style={styles.input}
                        textContentType="emailAddress"
                        value={email}
                        onChangeText={(value) => updateField(setEmail, value)}
                    />

                    <Text style={styles.label}>Парола</Text>
                    <TextInput
                        accessibilityLabel="Парола"
                        autoComplete="new-password"
                        placeholder="Създай парола"
                        placeholderTextColor="#8290A5"
                        returnKeyType="next"
                        secureTextEntry
                        style={styles.input}
                        textContentType="newPassword"
                        value={password}
                        onChangeText={(value) => updateField(setPassword, value)}
                    />

                    <Text style={styles.label}>Потвърди паролата</Text>
                    <TextInput
                        accessibilityLabel="Потвърди паролата"
                        autoComplete="new-password"
                        placeholder="Въведи паролата отново"
                        placeholderTextColor="#8290A5"
                        returnKeyType="done"
                        secureTextEntry
                        style={styles.input}
                        textContentType="newPassword"
                        value={confirmPassword}
                        onChangeText={(value) => updateField(setConfirmPassword, value)}
                    />

                    {error ? (
                        <Text style={styles.validationMessage} accessibilityRole="alert">
                            {error}
                        </Text>
                    ) : null}

                    <Pressable
                        accessibilityRole="button"
                        accessibilityState={{ disabled: isSubmitting }}
                        disabled={isSubmitting}
                        onPress={handleRegistration}
                        style={[styles.button, isSubmitting && styles.buttonDisabled]}
                    >
                        <Text style={styles.buttonText}>
                            {isSubmitting ? 'Регистриране...' : 'Регистрация'}
                        </Text>
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
