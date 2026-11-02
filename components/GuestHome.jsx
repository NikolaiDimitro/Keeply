import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LoadingSpinner from './LoadingSpinner';

export default function GuestHome() {
    return (
        <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.hero}>
                <View style={styles.logoMark}>
                    <Text style={styles.logoMarkText}>К</Text>
                </View>
                <Text style={styles.eyebrow}>ДОБРЕ ДОШЪЛ В KEEPly</Text>
                <Text style={styles.title}>
                    Всичко важно, подредено на едно място.
                </Text>
                <Text style={styles.subtitle}>
                    Съхранявай вещите си, гаранциите и документите им лесно и
                    удобно.
                </Text>
            </View>
            <LoadingSpinner label="Зареждане..." />
            <View style={styles.benefits}>
                <View style={styles.benefitRow}>
                    <View style={styles.benefitMark}>
                        <Text style={styles.benefitMarkText}>✓</Text>
                    </View>
                    <Text style={styles.benefitText}>
                        Дръж важната информация за вещите си на едно място
                    </Text>
                </View>
                <View style={styles.benefitRow}>
                    <View style={styles.benefitMark}>
                        <Text style={styles.benefitMarkText}>✓</Text>
                    </View>
                    <Text style={styles.benefitText}>
                        Следи гаранционните срокове и прикачените документи
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 22,
        paddingVertical: 28,
    },
    hero: {
        alignItems: 'center',
        marginBottom: 28,
    },
    logoMark: {
        alignItems: 'center',
        backgroundColor: '#B9F2D0',
        borderRadius: 22,
        height: 56,
        justifyContent: 'center',
        marginBottom: 20,
        width: 56,
    },
    logoMarkText: {
        color: '#172B4D',
        fontSize: 24,
        fontWeight: '700',
    },
    eyebrow: {
        color: '#5474A5',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.2,
        marginBottom: 10,
    },
    title: {
        color: '#172B4D',
        fontSize: 27,
        fontWeight: '700',
        lineHeight: 34,
        textAlign: 'center',
    },
    subtitle: {
        color: '#64748B',
        fontSize: 15,
        lineHeight: 23,
        marginTop: 12,
        maxWidth: 340,
        textAlign: 'center',
    },
    benefits: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
        borderRadius: 18,
        borderWidth: 1,
        gap: 18,
        marginBottom: 24,
        padding: 18,
    },
    benefitRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 12,
    },
    benefitMark: {
        alignItems: 'center',
        backgroundColor: '#E9FAF0',
        borderRadius: 12,
        height: 30,
        justifyContent: 'center',
        width: 30,
    },
    benefitMarkText: {
        color: '#258458',
        fontSize: 15,
        fontWeight: '700',
    },
    benefitText: {
        color: '#334155',
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
    },
});
