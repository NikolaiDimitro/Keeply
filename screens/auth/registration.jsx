import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function Registration() {
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
                    />

                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Регистрация</Text>
                    </View>

                    <Text style={styles.loginPrompt}>
                        Вече имаш профил?{' '}
                        <Text style={styles.loginText}>Вход</Text>
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