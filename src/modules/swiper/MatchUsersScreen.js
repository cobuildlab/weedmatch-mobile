import React, {Component} from 'react';
import {
    View,
    Image,
    SafeAreaView,
} from 'react-native';
import {Button, Text} from 'native-base';
import styles from './styles';
import buttonStyles from '../../styles/buttons';
import {WHITE} from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {strings} from '../../i18n';
import logToServer from 'log-to-server'

/**
 * Match User Screen, used when two users match each other
 */
export default class MatchUsersScreen extends Component {
    constructor() {
        super();
    }

    // static navigationOptions = {header: null};

    render() {
        logToServer('MatchUsersScreen', this.props.data);
        const {onClose, onPress, data} = this.props;
        const myPictureUrl = data.image_profile;
        const usernameMatch = data.username_match;
        const usernamePictureUrl = data.image_profile_match;

        return (
            <SafeAreaView style={styles.container}>
                <View style={[styles.titleContainer, {flex: 4, height: 100}]}>
                    <Text style={styles.fontMatchTitle}>
                        {strings('swiper.match', {name: usernameMatch})}
                    </Text>
                </View>
                <View style={[styles.imageContainer, {flex: 4, height: 100}]}>
                    <Image source={{uri: myPictureUrl}} style={[styles.image]}/>
                    <Image source={{uri: usernamePictureUrl}} style={[styles.image]}/>
                </View>
                <View style={[styles.buttonContainer, {flex: 2, height: 100}]}>
                    <Button rounded large style={[buttonStyles.purpleButton]}
                            onPress={() => onPress()}>
                        <Text>{strings('swiper.hi')}</Text>
                    </Button>
                </View>
                <View style={[styles.footerContainer, {flex: 2, height: 100}]}>
                </View>
                <View style={[styles.footerContainer, {flex: 1, height: 100}]}>
                    <Button rounded iconRight style={[buttonStyles.transparentIconButton]}
                            onPress={() => onClose()}>
                        <Text>{strings('swiper.continue')}</Text>
                        <Icon name="chevron-right" size={20} color={WHITE}/>
                    </Button>
                </View>

            </SafeAreaView>
        );
    }
}
