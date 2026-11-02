import {  View } from 'react-native';
import GuestHome from '../../components/GuestHome.jsx';
import LoggedInHome from '../../components/LoggedInHome.jsx';
import { homeStyles as styles } from '../../styles/components';

export default function Home({
    items,
    isLoggedIn,
    onAddItem,
    onShowAll,
}) {

    return (
        <View style={styles.container}>
            {isLoggedIn ? (
                <LoggedInHome
                    items={items}
                    onAddItem={onAddItem}
                    onShowAll={onShowAll}
                />
            ) : (
                <GuestHome />
            )}
        </View>
    );
}


