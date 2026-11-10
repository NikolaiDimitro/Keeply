import { View } from 'react-native';
import { homeStyles as styles } from '../../styles/components.js';

import GuestHome from '../../components/GuestHome.jsx';
import LoggedInHome from '../../components/LoggedInHome.jsx';

export default function HomeScreen({ route }) {

    let isAuthenticated = route.params?.isAuthenticated ?? false;

    return (
        <View style={styles.container}>
            {isAuthenticated ? (
                <>
                    <LoggedInHome />
                </>
            ) : (
                <>
                    <GuestHome />
                </>

            )}

        </View>
    );
}
