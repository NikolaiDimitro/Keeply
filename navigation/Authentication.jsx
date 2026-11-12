import LoginScreen from "../screens/auth/LoginScreen";
import RegistrationScreen from "../screens/auth/RegistrationSrcreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";

let Tab = createBottomTabNavigator();

export function AuthenticationNavigation() {

    return (

        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#258458",
                tabBarInactiveTintColor: "#8290A5",
            }}
        >

            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ tabBarLabel: "Начало" }}
            />
            <Tab.Screen
                name="Login"
                component={LoginScreen}
                options={{ tabBarLabel: "Вход" }}
            />
            <Tab.Screen
                name="Registration"
                component={RegistrationScreen}
                options={{ tabBarLabel: "Регистрация" }}
            />

        </Tab.Navigator>

    )
};