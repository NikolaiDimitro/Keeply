import { StyleSheet, View } from 'react-native';
import AppHeader from '../../components/AppHeader.jsx';
import Footer from '../../components/Footer.jsx';
import GuestHome from '../../components/GuestHome.jsx';
import LoggedInHome from '../../components/LoggedInHome.jsx';

export default function Home() {
    const isLoggedIn = true;

    return (
        <View style={styles.container}>
            <AppHeader />
            <View style={styles.content}>
                {isLoggedIn ? <LoggedInHome /> : <GuestHome />}
            </View>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
});
