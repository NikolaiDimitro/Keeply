import { ActivityIndicator, Text, View } from 'react-native';
import { loadingSpinnerStyles as styles } from '../styles/components';

export default function LoadingSpinner({
    color = '#287A58',
    label,
    size = 'small',
}) {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                accessibilityLabel={label || 'Зареждане'}
                color={color}
                size={size}
            />
            {label ? <Text style={[styles.label, { color }]}>{label}</Text> : null}
        </View>
    );
}

