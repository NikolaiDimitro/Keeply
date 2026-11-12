import { Pressable, View, Text } from 'react-native';
import { homeStyles as styles } from '../../styles/components.js';

import GuestHome from '../../components/GuestHome.jsx';
import LoggedInHome from '../../components/LoggedInHome.jsx';

export default function HomeScreen({ navigation, isAuthenticated }) {

    return (
        <View style={styles.container}>

            {isAuthenticated ? (
                <LoggedInHome />
            ) : (

                <View style={{ flex: 1 }}>
                    <GuestHome />
                </View>

            )}

        </View>
    );
};