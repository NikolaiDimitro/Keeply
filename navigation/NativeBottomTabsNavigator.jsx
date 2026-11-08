import { createNativeBottomTabNavigator } from "@react-navigation/bottom-tabs/unstable";
import HomeScreen from "../screens/home/HomeScreen";

let Tab = createNativeBottomTabNavigator();

export default function NativeBottomNavigation() {

    return (

        <Tab.Screen
            name="Home"
            component={HomeScreen} />

    )
};