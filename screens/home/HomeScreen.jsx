import { View } from 'react-native';
import { homeStyles as styles } from '../../styles/components.js';
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';

import GuestHome from '../../components/GuestHome.jsx';
import LoggedInHome from '../../components/LoggedInHome.jsx';
import AppHeaderComponent from '../../components/AppHeader.jsx';
import FooterComponent from '../../components/Footer.jsx';

let TabNavigation = createNativeBottomTabNavigator();

export default function HomeScreen({ isLoggedIn }) {

    return (
        <View style={styles.container}>
            {isLoggedIn ? (
                <>
                    <AppHeaderComponent />
                    <LoggedInHome />
                    <FooterComponent />
                </>
            ) : (
                <>
                    <AppHeaderComponent />
                    <GuestHome />
                    <FooterComponent />
                </>

            )}

        </View>
    );
}
