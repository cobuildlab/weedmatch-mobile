import React from 'react';
import {
  View,
  Image,
  SafeAreaView, Linking,
} from 'react-native';
import {Button, Text} from 'native-base';
import styles from '../swiper/styles';
import buttonStyles from '../../styles/buttons';
import {WHITE} from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {strings} from '../../i18n';


/**
 * Generic notifications
 */
const GenericNotification = ({data, onClose}) => {
  console.log('GenericNotification', data);
  const myPictureUrl = data.imgUrl || 'https://cdn.pixabay.com/photo/2017/05/19/10/12/hand-2326058_960_720.jpg';
  const text = data.text || 'Notification Text';
  const purpleButtonText = data.buttonText || 'Purple Button Text';
  const url = data.url || 'http://weedmatch.cl';

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.footerContainer, {flex: 1, height: 100}]}>
      </View>
      <View style={[styles.titleContainer, {flex: 1, height: 100}]}>
        <Text style={styles.fontMatchTitle}>
          {text}
        </Text>
      </View>
      <View style={[styles.footerContainer, {flex: 1, height: 100}]}>
      </View>
      <View style={[styles.imageContainer, {flex: 6, height: 200}]}>
        <Image source={{uri: myPictureUrl}} style={[styles.image, {height: 300, width: 300}]}/>
      </View>
      <View style={[styles.footerContainer, {flex: 1, height: 100}]}>
      </View>
      <View style={[styles.buttonContainer, {flex: 2, height: 100}]}>
        <Button rounded large style={[buttonStyles.purpleButton]}
                onPress={() => Linking.openURL(url)}>
          <Text>{purpleButtonText}</Text>
        </Button>
      </View>
      <View style={[styles.footerContainer, {flex: 1, height: 100}]}>
      </View>
      <View style={[styles.footerContainer, {flex: 1, height: 100}]}>
        <Button rounded iconRight style={[buttonStyles.transparentIconButton]}
                onPress={onClose}>
          <Text>{strings('swiper.continue')}</Text>
          <Icon name="chevron-right" size={20} color={WHITE}/>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export {GenericNotification};
