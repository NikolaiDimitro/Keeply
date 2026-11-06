import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    
    Text,
    TextInput,
    View,
} from 'react-native';
import { loginStyles as styles } from '../../styles/components';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.keyboardAvoidingView}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardDismissMode="on-drag"
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

                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Вход</Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
