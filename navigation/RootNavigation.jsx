import { createStackNavigator } from "@react-navigation/stack";
import { AuthenticationNavigation } from "./Authentication";
import { MainTabs } from "./MainTabs";
import { useContext } from "react";
import { AuthenticatedContext } from "../providers/authProveders";
import LoadingSpinner from "../components/LoadingSpinner";

let Stack = createStackNavigator();

export default function RootNavigation() {

let { isAuthenticated, loading } = useContext(AuthenticatedContext);


if(loading) return <LoadingSpinner size="large" label="Зареждане..." />;

    return (

        <Stack.Navigator  screenOptions={{ headerShown: false }}>

            {isAuthenticated ? (
                <Stack.Screen name="MainTabs" component={MainTabs} />
            ) : (
                <Stack.Screen name="Auth" component={AuthenticationNavigation} />
            )}

        </Stack.Navigator>

    )
};