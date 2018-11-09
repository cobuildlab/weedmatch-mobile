import React, {Component} from 'react';

import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Label,
    Picker,
    Button,
    Title,
    Footer,
    FooterTab,
    Header,
} from 'native-base';
import {
    SafeAreaView, Text
} from 'react-native';
import buttonStyles from '../../styles/buttons';
import textStyles from '../../styles/text';
import * as PropTypes from 'prop-types';
/**
 * @typedef {import('react-native').TextInputChangeEventData} TextInputChangeEventData
 * @typedef {import('react-native').NativeSyntheticEvent<TextInputChangeEventData>} TextChangeEvent
 * @typedef {import('react-navigation').NavigationStackScreenOptions} NavigationStackScreenOptions
 */


import {strings} from '../../i18n';
import {toastMsg} from '../../utils/index';
/**
 * @typedef {import('../../definitions').NavigationScreenProp<ReportRouteParams>} ReportRouteNavigationScreenProp
 * @typedef {import('./services/typings').PlaceEnum} PlaceEnum
 * @typedef {import('./services/typings').ReasonEnum} ReasonEnum
 * @typedef {import('./services/typings').ChatReportPOSTParams} ChatReportPOSTParams
 * @typedef {import('./services/typings').ImageFeedReportPOSTParams} ImageFeedReportPOSTParams
 * @typedef {import('./services/typings').ImageProfileReportPOSTParams} ImageProfileReportPOSTParams
 * @typedef {import('./services/typings').SwiperReportPOSTParams} SwiperReportPOSTParams 
 * @typedef {ChatReportPOSTParams|ImageFeedReportPOSTParams|ImageProfileReportPOSTParams|SwiperReportPOSTParams} ReportPOSTParams
 */

import styles from './styles';
import {REPORT_REASON_ENUM, PLACE_ENUM} from "./index";
import {reportAction} from "./ReportActions";
import store from "./ReportStore";

/**
 * @typedef {object} ReportRouteParams
 * @prop {string=} chatID Defined if place is PlaceEnum.Chat
 * @prop {string=} feedImageID Defined if place is PlaceEnum.Feed
 * @prop {PlaceEnum} place
 * @prop {string=} profileImageID Defined if place is PlaceEnum.Profile
 * @prop {string} userID ID of the user being reported
 * @prop {string=} userName Screen name of the user being reported (optional)
 */

/**
 * @typedef {object} ReportRouteProps
 * @prop {ReportRouteNavigationScreenProp} navigation
 */

/**
 * @typedef {object} ReportRouteState
 * @prop {string} commentInput
 * @prop {ReasonEnum} reasonInput
 */

/**
 * @augments Component<ReportRouteProps, ReportRouteState>
 */
export default class Report extends Component {
    /**
     * @property
     * @static
     * @type {NavigationStackScreenOptions}
     */
    static navigationOptions = {
        title: strings('report.title'),
    };

    /**
     * @property
     * @static
     */
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    /**
     * Id of the chat, feed image, or profile image to report
     * @property
     * @private
     */
    _pertinentID = -1;


    /**
     * @property
     */
    state = {
        commentInput: '',
        reasonInput: REPORT_REASON_ENUM.BULLYING,
    };

    componentDidMount() {
        const { navigation } = this.props

        this.reportedSubscription = store.subscribe("Reported", () => {
            toastMsg(strings('report.messageWhenSending'));
            navigation.goBack();
        });


        this.reportSubscription = store.subscribe("ReportError", error => {
            toastMsg(error);
        });

        

    }

    componentWillUnmount() {
        this.reportedSubscription.unsubscribe();
        this.reportSubscription.unsubscribe();
    }

    /**
     * @property
     * @private
     * @param {string} value
     * @returns {void}
     */
    onChangeReasonPicker = value => {
        // Check that the values for the picker items in the render
        // method of this class are of the correct type `ReasonEnum`
        this.setState({
            reasonInput: /** @type {ReasonEnum} */(value),
        });
    };

    /**
     * @property
     * @private
     * @returns {void}
     */
    onPressSend = () => {
        // eslint-disable-next-line no-console
        console.log("ReportView: onPressSend");
        const {navigation} = this.props;
        const {commentInput: comment, reasonInput: reason} = this.state;

        /**
         * @type {ReportPOSTParams}
         */
        const params = {
            chat: navigation.getParam('chatID'),
            comment,
            image_feed: navigation.getParam('feedImageID'),
            image_profile: navigation.getParam('profileImageID'),
            place: navigation.getParam('place'),
            reason,
            reported_user: String(navigation.getParam('userID')),
        }

        // eslint-disable-next-line no-console
        console.warn("ReportView: onPressSend:", params);

        reportAction(params)

        navigation.goBack()
    };

    render() {
        const {reasonInput} = this.state;
        const userName = this.props.navigation.getParam('userName', "");

        // Please refer to the comment in styles.content if more than 2 items
        // will be inside content

        return (
            <SafeAreaView style={styles.safeAreaView}>
                <Container>
                    <Header>
                        <Title>{userName}</Title>
                    </Header>
                    <Content>
                        <Form>
                            <Item fixedLabel>
                                <Label>{strings('report.commentInputPlaceholder')}</Label>
                                <Input onChangeText={text => this.setState({commentInput: text})}/>
                            </Item>
                            <Item fixedLabel last picker>
                                <Label>{strings('report.reasonText')}</Label>
                                <Picker
                                    mode="dropdown"
                                    selectedValue={reasonInput}
                                    onValueChange={this.onChangeReasonPicker}
                                >
                                    <Picker.Item
                                        label={strings(
                                            'report.reason.BULLYING'
                                        )}
                                        value={REPORT_REASON_ENUM.BULLYING}
                                    />
                                    <Picker.Item
                                        label={strings('report.reason.HATE')}
                                        value={REPORT_REASON_ENUM.HATE}
                                    />
                                    <Picker.Item
                                        label={strings(
                                            'report.reason.INFRINGEMENT'
                                        )}
                                        value={REPORT_REASON_ENUM.INFRINGEMENT}
                                    />
                                    <Picker.Item
                                        label={strings('report.reason.INJURY')}
                                        value={REPORT_REASON_ENUM.INJURY}
                                    />
                                    <Picker.Item
                                        label={strings('report.reason.PORN')}
                                        value={REPORT_REASON_ENUM.PORN}
                                    />
                                    <Picker.Item
                                        label={strings('report.reason.SALE')}
                                        value={REPORT_REASON_ENUM.SALE}
                                    />
                                    <Picker.Item
                                        label={strings('report.reason.SPAM')}
                                        value={REPORT_REASON_ENUM.SPAM}
                                    />
                                    <Picker.Item
                                        label={strings(
                                            'report.reason.VIOLENCE'
                                        )}
                                        value={REPORT_REASON_ENUM.VIOLENCE}
                                    />
                                </Picker>
                            </Item>
                        </Form>
                    </Content>
                    <Footer>
                        <FooterTab>
                            <Button block onPress={this.onPressSend} rounded style={[buttonStyles.purpleButton]}>
                                <Text style={[textStyles.whiteText]}>{strings('report.send')}</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </SafeAreaView>
        );
    }
}
