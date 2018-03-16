import { Image } from 'react-native';
import React from 'react';

const Imagen = () => {

    return (
        <Image style={styles.imagen} source={require('./perfil.jpg')} />
      );
};

const styles = {
    imagen: {
        height: 20,
        width: 20
    }
}

export default Imagen;
