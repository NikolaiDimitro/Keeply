import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

export let AuthenticatedContext = createContext(null);

function AuthenticatedProvider({ children, currentUser }) {

    let [user, setUser] = useState(null);
    let [loading, setLoading] = useState(true);

    useEffect(() => {

        let unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {

            setUser(firebaseUser);
            setLoading(false);

        });

        return unsubscribe;

    }, []);

    let isAuthenticated = !!user;

    async function refreshUser() {
        const firebaseUser = auth.currentUser;

        if (!firebaseUser) {
            setUser(null);
            return;
        }

        await firebaseUser.reload();
        setUser(auth.currentUser);
    }

    return (

        <AuthenticatedContext.Provider value={{ user, isAuthenticated, loading, refreshUser }}>

            {children}

        </AuthenticatedContext.Provider>

    );
};

let Providers = {

    AuthenticatedProvider,

}

export default Providers;