import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Profile({ user }) {
    const displayName = user?.displayName || 'Иван Иванов';
    const email = user?.email || 'ivan@example.com';

    return (
        <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
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
                <View style={styles.sectionCopy}>
                    <Text style={styles.sectionTitle}>Име</Text>
                    <Text style={styles.sectionValue}>{displayName}</Text>
                </View>
                <View style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Промени</Text>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionCopy}>
                    <Text style={styles.sectionTitle}>Парола</Text>
                    <Text style={styles.sectionValue}>••••••••</Text>
                </View>
                <View style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Смени</Text>
                </View>
            </View>

            <View style={styles.signOutButton}>
                <Text style={styles.signOutText}>Изход от профила</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        flexGrow: 1,
        paddingHorizontal: 22,
        paddingBottom: 28,
    },
    profileCard: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 14,
        marginTop: 4,
        padding: 22,
    },
    avatar: {
        alignItems: 'center',
        backgroundColor: '#B9F2D0',
        borderRadius: 32,
        height: 64,
        justifyContent: 'center',
        width: 64,
    },
    avatarText: {
        color: '#172B4D',
        fontSize: 24,
        fontWeight: '700',
    },
    title: {
        color: '#172B4D',
        fontSize: 22,
        fontWeight: '700',
        marginTop: 16,
    },
    email: {
        color: '#64748B',
        fontSize: 14,
        marginTop: 6,
    },
    section: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
        borderRadius: 16,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        padding: 16,
    },
    sectionCopy: {
        flex: 1,
    },
    sectionTitle: {
        color: '#172B4D',
        fontSize: 15,
        fontWeight: '700',
    },
    sectionValue: {
        color: '#64748B',
        fontSize: 14,
        marginTop: 5,
    },
    secondaryButton: {
        alignItems: 'center',
        borderColor: '#E2E8F0',
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        minHeight: 42,
        paddingHorizontal: 14,
    },
    secondaryButtonText: {
        color: '#5474A5',
        fontSize: 13,
        fontWeight: '600',
    },
    signOutButton: {
        alignItems: 'center',
        borderColor: '#E2E8F0',
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        marginTop: 4,
        minHeight: 48,
    },
    signOutText: {
        color: '#172B4D',
        fontSize: 14,
        fontWeight: '600',
    },
});
