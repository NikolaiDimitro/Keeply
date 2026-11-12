import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    View,
    Pressable,
} from 'react-native';
import { registrationStyles as styles } from '../../styles/components';
import { useState } from 'react';

export default function RegistrationScreen({ onRegister }) {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function submitRegistration() {
        if (password !== confirmedPassword) {
            setValidationMessage('Паролите не съвпадат.');
            return;
        }

        if (typeof onRegister !== 'function') {
            setValidationMessage('Регистрацията не е конфигурирана.');
            return;
        }

        setValidationMessage('');
        setIsSubmitting(true);

        try {
            await onRegister({
                displayName: displayName.trim(),
                email: email.trim(),
                password,
            });
        } catch (error) {
            setValidationMessage(
                error instanceof Error ? error.message : 'Регистрацията не беше успешна.'
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : Platform.OS === 'android' ? 'height' : undefined}
            style={styles.keyboardAvoidingView}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardDismissMode="on-drag"
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
                        value={displayName}
                        onChangeText={setDisplayName}
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
                        onChangeText={setEmail}
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
                        onChangeText={setPassword}
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
                        value={confirmedPassword}
                        onChangeText={setConfirmedPassword}
                    />

                    {validationMessage ? (
                        <Text style={styles.validationMessage}>{validationMessage}</Text>
                    ) : null}

                    <Pressable
                        accessibilityRole="button"
                        accessibilityState={{ disabled: isSubmitting }}
                        disabled={isSubmitting}
                        onPress={submitRegistration}
                        style={[styles.button, isSubmitting && styles.buttonDisabled]}
                    >
                        <Text style={styles.buttonText}>
                            {isSubmitting ? 'Регистриране...' : 'Регистрация'}
                        </Text>
                    </Pressable>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
