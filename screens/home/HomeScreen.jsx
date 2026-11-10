import { Pressable, View, Text } from 'react-native';
import { homeStyles as styles } from '../../styles/components.js';

import GuestHome from '../../components/GuestHome.jsx';
import LoggedInHome from '../../components/LoggedInHome.jsx';

export default function HomeScreen({ navigation, isAuthenticated }) {

    return (
        <View style={styles.container}>

            {isAuthenticated ? <LoggedInHome /> : <GuestHome />}

            {isAuthenticated ? (
                <>
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => navigation.navigate('MainTabs', { screen: 'Inventory' })}
                    >
                        <Text>Инвентар</Text>
                    </Pressable>
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => navigation.navigate('MainTabs', { screen: 'Profil' })}
                    >
                        <Text>Профил</Text>
                    </Pressable>
                </>
            ) : (
                <>
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
                    >
                        <Text>Вход</Text>
                    </Pressable>
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => navigation.navigate('Auth', { screen: 'Registration' })}
                    >
                        <Text>Регистрация</Text>
                    </Pressable>
                </>
            )}

        </View>



    );
}
