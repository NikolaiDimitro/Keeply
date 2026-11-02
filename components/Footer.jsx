import { Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Footer() {

    return (

        <SafeAreaView edges={['bottom']} style={styles.container}>
            <Image source={require('../assets/1280px-Facebook_Logo_2023.png')} style={ styles.images } />
            <Image source={require('../assets/1280px-Instagram_icon.png')} style={ styles.images } />
            <Image source={require('../assets/icons8-x-50.png')} style={ styles.images } />
        </SafeAreaView>

    )
}

let styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#172B4D'
    },

    images: {
        width: 50,
        height: 50
    }
});