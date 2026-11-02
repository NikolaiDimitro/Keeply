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

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

                    <Pressable
                        accessibilityRole="button"
                        onPress={() => onLogin({ email: email.trim(), password })}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Вход</Text>
                    </Pressable>
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
});
