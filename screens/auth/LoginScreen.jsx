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
import { loginStyles as styles } from '../../styles/components';
import requestApi from '../../services/authRequester';

const getLoginErrorHandling = {

    'auth/invalid-email': 'Невалиден имейл',
    'auth/invalid-credential': 'Грешен имейл или парола',
    'auth/user-not-found': 'Грешен имейл',
    'auth/wrong-password': 'Грешна парола',
    'auth/user-disabled': 'Профилът е деактивиран',
    'auth/too-many-requests': 'Твърде много опити. Моля, опитайте по - късно',
    'auth/network-request-failed': 'Проблем с интернет връзката. Моля. опитайте по - късно.'

};

function getLoginErrorMessage(error) {

    let code = error && typeof error === 'object' ? error.code : undefined;
    return getLoginErrorHandling[code] ?? 'Влизането в профила беше неуспешно. Моля, опитайте отново.';

}

export default function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validMessage, setValidMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function submitLogin() {

        let normalizedEmail = email.trim();

        if (!normalizedEmail) {

            setValidMessage('Полето за имейл е задължително');
            return;

        }

        if (!password) {

            setValidMessage('Полето за парола е задължително');
            return;

        }

        setValidMessage('');
        setIsSubmitting(true);

        try {

            await requestApi.login({ email: normalizedEmail, password });

        } catch (error) {

            setValidMessage(getLoginErrorMessage(error))

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
            <View style={styles.screenContent}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                    style={styles.scrollView}
                >
                    <View style={styles.card}>
                        <Text style={styles.title}>Добре дошъл!</Text>
                        <Text style={styles.subtitle}>
                            Влез в профила си, за да продължиш.
                        </Text>

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
                            autoComplete="current-password"
                            onChangeText={setPassword}
                            placeholder="Въведи паролата си"
                            placeholderTextColor="#8290A5"
                            returnKeyType="done"
                            secureTextEntry
                            style={styles.input}
                            textContentType="password"
                            value={password}
                        />

                        {validMessage ? (
                            <Text style={styles.validationMessage}>{validMessage}</Text>
                        ) : null}
                    </View>
                </ScrollView>
                <View style={styles.buttonFooter}>
                    <Pressable
                        accessibilityRole="button"
                        accessibilityState={{ disabled: isSubmitting }}
                        disabled={isSubmitting}
                        onPress={submitLogin}
                        style={[styles.button, isSubmitting && styles.buttonDisabled]}
                    >
                        <Text style={styles.buttonText}>
                            {isSubmitting ? 'Влизане...' : 'Вход'}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
