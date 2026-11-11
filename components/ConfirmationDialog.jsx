import { Modal, Pressable, Text, View } from 'react-native';
import { confirmationDialogStyles as styles } from '../styles/components';

export default function ConfirmationDialog({
    visible,
    title,
    message,
    note,
    onConfirm,
    onCancel,
}) {
    return (
        <Modal
            animationType="fade"
            onRequestClose={onCancel}
            transparent
            visible={visible}
        >
            <View style={styles.overlay}>
                <View accessibilityViewIsModal style={styles.card}>
                    <View style={styles.icon}>
                        <Text style={styles.iconText}>!</Text>
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    {!!note && <Text style={styles.note}>{note}</Text>}
                    <View style={styles.actions}>
                        <Pressable
                            accessibilityRole="button"
                            onPress={onCancel}
                            style={({ pressed }) => [
                                styles.cancelButton,
                                pressed && styles.cancelButtonPressed,
                            ]}
                        >
                            <Text style={styles.cancelButtonText}>Не</Text>
                        </Pressable>
                        <Pressable
                            accessibilityRole="button"
                            onPress={onConfirm}
                            style={({ pressed }) => [
                                styles.confirmButton,
                                pressed && styles.confirmButtonPressed,
                            ]}
                        >
                            <Text style={styles.confirmButtonText}>Да</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
