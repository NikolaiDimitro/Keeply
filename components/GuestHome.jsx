import { ScrollView,  Text, View } from 'react-native';
import LoadingSpinner from './LoadingSpinner';
import { guestHomeStyles as styles } from '../styles/components';

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


