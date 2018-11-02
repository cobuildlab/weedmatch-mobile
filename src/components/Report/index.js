import React, { Component } from 'react';

import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Label,
    Picker,
    Button,
    Text,
    H1,
    View,
    H2,
} from 'native-base';
import * as PropTypes from 'prop-types';
/**
 * @typedef {import('react-native').TextInputChangeEventData} TextInputChangeEventData
 * @typedef {import('react-native').NativeSyntheticEvent<TextInputChangeEventData>} TextChangeEvent
 * @typedef {import('react-navigation').NavigationStackScreenOptions} NavigationStackScreenOptions
 */

import { placeEnum, reportReasonEnum } from '../../report-service/constants';
import {
    postChatReport,
    postFeedImageReport,
    postProfileImageReport,
} from '../../report-service/postReport';
import { strings } from '../../i18n';
import { toastMsg } from '../../utils';
/**
 * @typedef {import('../../definitions').NavigationScreenProp<ReportRouteParams>} ReportRouteNavigationScreenProp
 * @typedef {import('../../report-service/typings').PlaceEnum} PlaceEnum
 * @typedef {import('../../report-service/typings').ReasonEnum} ReasonEnum
 * @typedef {import('../../report-service/postReport').ChatReportPOSTParams} ChatReportPOSTParams
 * @typedef {import('../../report-service/postReport').ImageFeedReportPOSTParams} ImageFeedReportPOSTParams
 * @typedef {import('../../report-service/postReport').ImageProfileReportPOSTParams} ImageProfileReportPOSTParams
 */

import styles from './styles';

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
     * Id of the user to report
     * @property
     * @private
     */
    _userID = -1;

    /**
     * @property
     */
    state = {
        commentInput: '',
        reasonInput: reportReasonEnum.BULLYING,
    };

    componentDidMount() {
        const { navigation } = this.props;
        const place = navigation.getParam('place');
        const userID = navigation.getParam('userID');

        if (typeof place === 'undefined') {
            throw new Error('Missing `place` parameter in Report route');
        }

        if (typeof userID !== 'number') {
            throw new Error(
                'Missing or wrong type of `userID` parameter in Report route'
            );
        }

        switch (place) {
            case placeEnum.Chat:
                // @ts-ignore Will check for undefined below
                this._pertinentID = navigation.getParam('chatID');
                break;
            case placeEnum.Feed:
                // @ts-ignore Will check for undefined below
                this._pertinentID = navigation.getParam('feedImageID');
                break;
            case placeEnum.Profile:
                // @ts-ignore Will check for undefined below
                this._pertinentID = navigation.getParam('profileImageID');
                break;
            default:
                throw new Error(
                    `Invalid \`place\` parameter in report route, expected one of these: ${Object.values(
                        placeEnum
                    )}, instead got: ${JSON.stringify(place)}`
                );
        }

        if (typeof this._pertinentID !== 'number') {
            throw new Error(
                `Invalid type for id of the chat, feed image, or profile image to report, inside Report route. Expected \`number\`, instead got: ${typeof this
                    ._pertinentID} `
            );
        }

        if (this._pertinentID < 0) {
            throw new Error(
                `Invalid id of the chat, feed image, or profile image to report, inside Report route, should be greater than zero`
            );
        }

        if (userID < 0) {
            throw new Error(
                `Invalid user id, inside Report route, should be greater than zero`
            );
        }

        this._userID = userID;
    }

    /**
     * @property
     * @private
     * @param {string} text
     * @returns {void}
     */
    onChangeCommentText = text => {
        this.setState({
            commentInput: text,
        });
    };

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
        const { navigation } = this.props;
        const { commentInput: comment, reasonInput: reason } = this.state;

        const place = navigation.getParam('place');

        switch (place) {
            case placeEnum.Chat: {
                const chatPlace = /** @type {'Chat'} */ (place);

                /**
                 * @type {ChatReportPOSTParams}
                 */
                const postParams = {
                    chat: this._pertinentID.toString(10),
                    comment,
                    place: chatPlace,
                    reason,
                    reported_user: this._userID.toString(10),
                };

                postChatReport(postParams)
                    .then(ok => {
                        if (ok) {
                            toastMsg(strings('report.success'));
                        } else {
                            toastMsg(strings('report.error'));
                        }
                    })
                    .catch(e => {
                        if (__DEV__) {
                            // eslint-disable-next-line no-console
                            console.warn(e.message);
                        }

                        toastMsg(strings('report.error'));
                    });

                break;
            }
            case placeEnum.Feed: {
                const feedPlace = /** @type {'Feed'} */ (place);

                /**
                 * @type {ImageFeedReportPOSTParams}
                 */
                const postParams = {
                    comment,
                    image_feed: this._pertinentID.toString(10),
                    place: feedPlace,
                    reason,
                    reported_user: this._userID.toString(10),
                };

                postFeedImageReport(postParams)
                    .then(ok => {
                        if (ok) {
                            toastMsg(strings('report.success'));
                        } else {
                            toastMsg(strings('report.error'));
                        }
                    })
                    .catch(e => {
                        toastMsg(strings('report.error'));

                        if (__DEV__) {
                            // eslint-disable-next-line no-console
                            console.warn(e.message);
                        }
                    });

                break;
            }
            case placeEnum.Profile: {
                const profilePlace = /** @type {'Profile'} */ (place);

                /**
                 * @type {ImageProfileReportPOSTParams}
                 */
                const postParams = {
                    comment,
                    image_profile: this._pertinentID.toString(10),
                    place: profilePlace,
                    reason,
                    reported_user: this._userID.toString(10),
                };

                postProfileImageReport(postParams)
                    .then(ok => {
                        if (ok) {
                            toastMsg(strings('report.success'));
                        } else {
                            toastMsg(strings('report.error'));
                        }
                    })
                    .catch(e => {
                        toastMsg(strings('report.error'));

                        if (__DEV__) {
                            // eslint-disable-next-line no-console
                            console.warn(e.message);
                        }
                    });

                break;
            }

            default: {
                toastMsg('report.error');

                const msg = `Invalid \`place\` parameter in report route, expected one of these: ${Object.values(
                    placeEnum
                )}, instead got: ${JSON.stringify(place)}`;

                if (__DEV__) {
                    // eslint-disable-next-line
                    console.warn(msg);
                    throw new Error(msg);
                }
            }
        }

        toastMsg(toastMsg('report.messageWhenSending'));

        navigation.goBack();
    };

    render() {
        const { reasonInput } = this.state;
        const userName = this.props.navigation.getParam('userName');

        // Please refer to the comment in styles.content if more than 2 items
        // will be inside content

        return (
            <Container>
                <Content padder contentContainerStyle={styles.content}>
                    <View style={styles.headerAndForm}>
                        {userName ? (
                            <>
                                <H2>{strings('report.header')}</H2>
                                <H1>{userName}</H1>
                            </>
                        ) : null}
                        <Form>
                            <Item stackedLabel>
                                <Label>
                                    {strings('report.commentInputPlaceholder')}
                                </Label>
                                <Input
                                    onChangeText={this.onChangeCommentText}
                                />
                            </Item>
                            <Item picker>
                                <Picker
                                    mode="dropdown"
                                    selectedValue={reasonInput}
                                    onValueChange={this.onChangeReasonPicker}
                                >
                                    <Picker.Item
                                        label={strings(
                                            'report.reason.BULLYING'
                                        )}
                                        value={reportReasonEnum.BULLYING}
                                    />
                                    <Picker.Item
                                        label={strings('report.reason.HATE')}
                                        value={reportReasonEnum.HATE}
                                    />
                                    <Picker.Item
                                        label={strings(
                                            'report.reason.INFRINGEMENT'
                                        )}
                                        value={reportReasonEnum.INFRINGEMENT}
                                    />
                                    <Picker.Item
                                        label={strings('report.reason.INJURY')}
                                        value={reportReasonEnum.INJURY}
                                    />
                                    <Picker.Item
                                        label={strings('report.reason.PORN')}
                                        value={reportReasonEnum.PORN}
                                    />
                                    <Picker.Item
                                        label={strings('report.reason.SALE')}
                                        value={reportReasonEnum.SALE}
                                    />
                                    <Picker.Item
                                        label={strings('report.reason.SPAM')}
                                        value={reportReasonEnum.SPAM}
                                    />
                                    <Picker.Item
                                        label={strings(
                                            'report.reason.VIOLENCE'
                                        )}
                                        value={reportReasonEnum.VIOLENCE}
                                    />
                                </Picker>
                            </Item>
                        </Form>
                    </View>

                    <Button block onPress={this.onPressSend}>
                        <Text>{strings('report.send')}</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
