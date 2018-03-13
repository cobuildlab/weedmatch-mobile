import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';

class ButtonBar extends Component {
    render() {
        return (
          <View style={styles.container}>
            <TouchableOpacity style={styles.dislike} />
            <TouchableOpacity style={styles.encanta} />
            <TouchableOpacity style={styles.like} />
          </View>
        );
    }
}

const styles = {
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    dislike: {
      backgroundColor: 'red',
      width: '30%',
      height: 40
    },
    encanta: {
        backgroundColor: 'blue',
        width: '30%',
        height: 40
      },
    like: {
        backgroundColor: 'green',
        width: '30%',
        height: 40
      }
};

export default ButtonBar;