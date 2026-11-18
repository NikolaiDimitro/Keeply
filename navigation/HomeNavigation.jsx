import { createStackNavigator } from '@react-navigation/stack';

import LoggedInHome from '../components/LoggedInHome';
import DetailsScreen from '../screens/items/DetailsScreen';
import EditScreen from '../screens/items/EditScreen';

const Stack = createStackNavigator();

export default function HomeNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeMain" component={LoggedInHome} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Edit" component={EditScreen} />
        </Stack.Navigator>
    );
}
