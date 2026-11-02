import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

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

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
    },
});
