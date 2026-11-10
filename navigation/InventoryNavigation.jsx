import { createStackNavigator } from "@react-navigation/stack";

import CreateScreen from "../screens/create/CreateScreen";
import InventoryScreen from "../screens/inventory/InventoryScreen";
import DetailsScreen from "../screens/items/DetailsScreen";
import EditScreen from "../screens/items/EditScreen";

let Stack = createStackNavigator();

export default function InventoryNavigation() {

    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="InventorList" component={InventoryScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Create" component={CreateScreen} />
            <Stack.Screen name="Edit" component={EditScreen} />

        </ Stack.Navigator>

    )

};