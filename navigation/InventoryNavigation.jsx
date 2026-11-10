import CreateScreen from "../screens/create/CreateScreen";
import InventoryScreen from "../screens/inventory/InventoryScreen";
import DetailsScreen from "../screens/items/DetailsScreen";
import EditScreen from "../screens/items/EditScreen";

export default function InventoryNavigation() {

    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="InventorList" component={InventoryScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Edit" component={EditScreen} />
            <Stack.Screen name="Create" component={CreateScreen} />

        </ Stack.Navigator>

    )

};