import StackNav from "./StackNavigator";
import InventoryScreen from "../screens/inventory/InventoryScreen";

import { createNativeBottomTabNavigator } from "@react-navigation/bottom-tabs/unstable";
import { useState } from "react";


let Tab = createNativeBottomTabNavigator();

export default function NativeBottomNavigation() {

    let [isuthenticated, setAuthenticated] = useState(true);

    return (
        <Tab.Navigator>

            {isuthenticated ?
                <>

                    < Tab.Screen name="Home" component={StackNav} initialParams={isuthenticated} />
                    <Tab.Screen name="Inventory" component={InventoryScreen} />
                    <Tab.Screen name="Details" component={StackNav} />

                </>
                :
                <>

                    < Tab.Screen name="Home" component={StackNav} initialParams={isuthenticated} />
                    <Tab.Screen name="Login" component={StackNav} />
                    <Tab.Screen name="Registration" component={StackNav} />

                </>

            }
        </Tab.Navigator>
    )
};