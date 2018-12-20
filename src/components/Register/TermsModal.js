/**
 * @prettier
 */
import React from 'react';

import { Container, Content, Text, H1 } from 'native-base';
import * as PropTypes from 'prop-types';
import { Modal, TouchableOpacity } from 'react-native';

import { strings } from '../../i18n';

import styles from './style';

/**
 * @typedef {object} TermsModalProps
 * @prop {boolean} isVisible
 * @prop {() => void} onAccept
 * @prop {() => void} onCloseOrReject
 */

/**
 * @type {React.SFC<TermsModalProps>}
 */
const TermsModal = ({ isVisible, onAccept, onCloseOrReject }) => (
    <Modal
        animationType="slide"
        onRequestClose={onCloseOrReject}
        visible={isVisible}
        transparent
    >
        <Container style={styles.termsModalContainer}>
            <Content>
                <H1>{strings('register.terms')}</H1>
                <Text style={styles.termsModalText}>
                    {strings('register.termsPopup.text')}
                </Text>
            </Content>

            <TouchableOpacity
                style={styles.buttomRegisterStyle}
                onPress={onAccept}
            >
                <Text style={styles.buttonText}>
                    {strings('register.termsPopup.accept')}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttomCancelStyle}
                onPress={onCloseOrReject}
            >
                <Text style={styles.buttonTextCancel}>
                    {strings('register.termsPopup.reject')}
                </Text>
            </TouchableOpacity>
        </Container>
    </Modal>
);

TermsModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onAccept: PropTypes.func.isRequired,
    onCloseOrReject: PropTypes.func.isRequired,
};

export default TermsModal;
