import { ScrollView,  Text, View } from 'react-native';
import { profileStyles as styles } from '../../styles/components';

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


