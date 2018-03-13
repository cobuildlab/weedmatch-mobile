// Import libraries for making component
import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

// Make a component
const Header = () => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <TouchableOpacity style={styles.button} >
                <Image 
                    style={styles.imageStyle}
                    source={require('./perfil.jpg')}
                />
            </TouchableOpacity>

            <Text style={textStyle}>|</Text>

            <TouchableOpacity style={styles.button} >
                <Image 
                    style={styles.imageStyle}
                    source={require('./perfil.jpg')}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
        flexDirection: 'row',
    },
    textStyle: {
        fontSize: 20
    },
    imageStyle: {
        height: 20,
        width: 20
    }
};

// Make the component available to other parts of the app
export default Header;
