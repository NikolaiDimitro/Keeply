import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import InventoryNavigation from "./HomeNavigation";
import HomeNavigation from "./HomeNavigation";

let Tab = createBottomTabNavigator();

export default function NativeBottomNavigation() {

    let [isuthenticated, setAuthenticated] = useState(false);

    return (
        <Tab.Navigator>

            {isuthenticated ?
                <>

                    <Tab.Screen name="Home" component={HomeNavigation} initialParams={isuthenticated} />
                    <Tab.Screen name="Inventory" component={InventoryNavigation} />
                    <Tab.Screen name="Details" component={InventoryNavigation} />

                </>
                :
                <>

                    <Tab.Screen name="Home" component={HomeNavigation} initialParams={isuthenticated} />
                    <Tab.Screen name="Login" component={StackNav} />
                    <Tab.Screen name="Registration" component={StackNav} />

                </>

            }
        </Tab.Navigator>
    )
};