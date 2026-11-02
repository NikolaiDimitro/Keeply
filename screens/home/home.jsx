import { StyleSheet, View } from 'react-native';
import GuestHome from '../../components/GuestHome.jsx';
import LoggedInHome from '../../components/LoggedInHome.jsx';

export default function Home({ items, onAddItem, onShowAll }) {
    const isLoggedIn = true; // Replace with your actual authentication logic

    return (
        <View style={styles.container}>
            {isLoggedIn ? (
                <LoggedInHome
                    items={items}
                    onAddItem={onAddItem}
                    onShowAll={onShowAll}
                />
            ) : (
                <GuestHome />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
