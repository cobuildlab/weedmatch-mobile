import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const ButtonImage = ({ onPress, uri }) => {

    return (
          <TouchableOpacity onPress={onPress} style={styles.button} >
            <Image 
                style={styles.imageStyle}
                source={uri}
            />
          </TouchableOpacity>
      );
};

const styles = {
  button: {
    backgroundColor: '#859a9b',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 10,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
    imageStyle: {
        height: 25,
        width: 25,
    }
};

export default ButtonImage;
