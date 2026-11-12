import LoginScreen from "../screens/auth/LoginScreen";
import HomeScreen from "../screens/home/HomeScreen";
import Entypo from "@react-native-vector-icons/entypo";
import RegistrationScreen from "../screens/auth/RegistrationSrcreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
                options={{
                    tabBarLabel: "Начало",
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="home" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    tabBarLabel: "Вход",
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="login" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="Registration"
                component={RegistrationScreen}
                options={{
                    tabBarLabel: "Регистрация",
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="add-user" color={color} size={size} />
                    )
                }}
            />

        </Tab.Navigator>

    )
};