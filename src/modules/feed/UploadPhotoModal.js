import React from 'react';

import { Spinner, Button, Container, Header, Left, Body, Title, Content, Right, Text, H1 } from 'native-base';
import PropTypes from 'prop-types';
import { TextInput, ScrollView, View, Modal, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { strings } from '../../i18n';
import styles from './../../components/Home/styles';
import buttonStyles from '../../styles/buttons';
import textStyles from '../../styles/text';
import otherStyles, { MAGENTA } from './../../components/Authentication/styles';

const UploadPhotoModal = (props) => {
    const { visible, onRequestClose, onClosePress, isLoading, image, onChangeText, comment, onUploadPress } = props;
    return (
        <Modal
            animationType={'slide'}
            transparent={false}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <SafeAreaView style={[styles.modalContainer]}>
                <Button
                    block
                    onPress={onClosePress}
                    style={[buttonStyles.purpleButton]}
                >
                    <Text style={[textStyles.whiteText]} >
                        {strings('home.close')}
                    </Text>
                </Button>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                >
                    {isLoading && (
                        <View style={otherStyles.deadCenter}>
                            <Spinner color={MAGENTA} />
                        </View>
                    )}
                    {!isLoading && (
                        <View>
                            {image != '' && (
                                <TouchableOpacity>
                                    <Image
                                        style={styles.imageSize}
                                        source={{ uri: image }}
                                    />
                                </TouchableOpacity>
                            )}
                            <TextInput
                                style={styles.inputStyle}
                                editable={true}
                                onChangeText={onChangeText}
                                placeholder={strings(
                                    'home.comment'
                                )}
                                returnKeyType="next"
                                value={comment}
                            />
                        </View>
                    )}
                </ScrollView>
                {!isLoading && (
                    <View>
                        <Button
                            block
                            onPress={onUploadPress}
                            style={[buttonStyles.purpleButton]}
                        >
                            <Text style={[textStyles.whiteText]} >
                                {strings('home.upload')}
                            </Text>
                        </Button>
                    </View>)}
            </SafeAreaView>
        </Modal>
    )
};

UploadPhotoModal.propTypes = {
    comment: PropTypes.string,
    image: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onClosePress: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onUploadPress: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
}

export default UploadPhotoModal;