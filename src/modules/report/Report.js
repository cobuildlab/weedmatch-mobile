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

import {PLACE_ENUM} from './index';
import {
    postChatReport,
    postFeedImageReport,
    postProfileImageReport,
} from './services/postReport';
import {strings} from '../../i18n';
import {toastMsg} from '../../utils/index';
/**
 * @typedef {import('../../definitions').NavigationScreenProp<ReportRouteParams>} ReportRouteNavigationScreenProp
 * @typedef {import('../../services/typings').PlaceEnum} PlaceEnum
 * @typedef {import('../../services/typings').ReasonEnum} ReasonEnum
 * @typedef {import('../../services/postReport').ChatReportPOSTParams} ChatReportPOSTParams
 * @typedef {import('../../services/postReport').ImageFeedReportPOSTParams} ImageFeedReportPOSTParams
 * @typedef {import('../../services/postReport').ImageProfileReportPOSTParams} ImageProfileReportPOSTParams
 */

import styles from './styles';
import {REPORT_REASON_ENUM} from "./index";
import {reportAction} from "./ReportActions";
import store from "./ReportStore";

/**
 * @typedef {object} ReportRouteParams
 * @prop {number=} chatID Defined if place is PlaceEnum.Chat
 * @prop {number=} feedImageID Defined if place is PlaceEnum.Feed
 * @prop {PlaceEnum} place
 * @prop {number=} profileImageID Defined if place is PlaceEnum.Profile
 * @prop {number} userID ID of the user being reported
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
     * @type {NavigationStackScreenOptions}
     */
    static navigationOptions = {
        title: strings('report.title'),
    };

    /**
     * @property
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
        report: {}
    };

    componentDidMount() {
        const {navigation} = this.props;
        const place = navigation.getParam('place');
        const userId = navigation.getParam('userID');
        this.report = {
            reported_user: userId.toString(10),
            place
        };

        switch (place) {
            case PLACE_ENUM.Chat:
                this.report.chat = navigation.getParam('chatID').toString(10);
                break;
            case PLACE_ENUM.Feed:
                this.report.image_feed = navigation.getParam('feedImageID').toString(10);
                break;
            case PLACE_ENUM.Profile:
                this.report.image_profile = navigation.getParam('profileImageID').toString(10);
                break;
            default:
                // TODO: prop-type
                throw new Error(
                    `Invalid \`place\` parameter in report route, expected one of these: ${Object.values(
                        PLACE_ENUM
                    )}, instead got: ${JSON.stringify(place)}`
                );
        }

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
        // @ts-ignore Check that the values for the picker items are of the
        // correct type
        this.setState({
            reasonInput: value,
        });
    };

    /**
     * @property
     * @private
     * @returns {void}
     */
    onPressSend = () => {
        console.log("ReportView: onPressSend");
        const {navigation} = this.props;
        const {commentInput: comment, reasonInput: reason} = this.state;

        this.report.reason = reason;
        this.report.comment = comment;
        console.log("ReportView: onPressSend:", this.report);
        reportAction(this.report);
    };

    render() {
        const {reasonInput} = this.state;
        const userName = this.props.navigation.getParam('userName', "");

        // Please refer to the comment in styles.content if more than 2 items
        // will be inside content

        return (
            <SafeAreaView style={{flex: 1}}>
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
