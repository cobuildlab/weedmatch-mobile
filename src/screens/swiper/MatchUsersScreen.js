import React, {Component} from 'react';
import {
    TextInput,
    TouchableOpacity,
    View,
    AsyncStorage,
    Alert,
    ScrollView,
    StyleSheet,
    Image,
    SafeAreaView
} from 'react-native';
import {Container, Header, Content, Button, Text} from 'native-base';
import styles from './styles';
import buttonStyles from '../../styles/buttons';
import {white} from '../../styles/colors';
import p1 from '../../images/p1.jpg';
import p2 from '../../images/p2.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {strings} from '../../i18n';


/**
 * Match User Screen, used when two users match each other
 */
export default class MatchUsersScreen extends Component {

    constructor() {
        super();
    }

    static navigationOptions = {header: null};

    render() {
        const name = "Angel";
        const {onClose, onPress, data} = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <View style={[styles.titleContainer, {flex: 4, height: 100}]}>
                    <Text style={styles.fontMatchTitle}>{strings("swiper.match", {name})}</Text>
                </View>
                <View style={[styles.imageContainer, {flex: 4, height: 100}]}>
                    <Image source={p1} style={[styles.image]}/>
                    <Image source={p2} style={[styles.image]}/>
                </View>
                <View style={[styles.buttonContainer, {flex: 2, height: 100}]}>
                    <Button rounded large style={[buttonStyles.purpleButton]}
                            onPress={() => onPress()}>
                        <Text>{strings("swiper.hi")}</Text>
                    </Button>
                </View>
                <View style={[styles.footerContainer, {flex: 2, height: 100}]}>
                </View>
                <View style={[styles.footerContainer, {flex: 1, height: 100}]}>
                    <Button rounded iconRight style={[buttonStyles.transparentIconButton]}
                            onPress={() => onClose()}>
                        <Text>{strings("swiper.continue")}</Text>
                        <Icon name="chevron-right" size={20} color={white}/>
                    </Button>
                </View>

            </SafeAreaView>
        );
    }
}
