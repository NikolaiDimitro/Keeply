import { createStackNavigator } from "@react-navigation/stack";
import { AuthenticationNavigation } from "./Authentication";
import { MainTabs } from "./MainTabs";

import HomeScreen from '../screens/home/HomeScreen';

let Stack = createStackNavigator();

export default function RootNavigation({ isAuthenticated }) {

    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>

            {isAuthenticated ? (
                <Stack.Screen name="MainTabs" component={MainTabs} />
            ) : (
                <>
                    <Stack.Screen
                        name="Home">
                        {(props) => (
                            <HomeScreen {...props} isAuthenticated={true} />
                        )}
                    </Stack.Screen>
                    <Stack.Screen name="Auth" component={AuthenticationNavigation} />
                </>
            )}

        </Stack.Navigator>

    )
};