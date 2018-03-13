 import React from 'react';
 import { Text, View, Image, Linking } from 'react-native';
 import Card from './Card';
 import CardSection from './CardSection';
 import TextLikes from './TextLikes';
 import ButtonImage from './ButtonImage';
 import { StackNavigator } from 'react-navigation';
 import Icon from 'react-native-vector-icons/FontAwesome';

 const AlbumDetail = ({ album, navigation }) => {
     const { title, artist, thumbnail_image, image, url } = album;
     const { 
        thumbnailStyle,
        headerContentStyle,
        thumbnailContainerStyle,
        headerTextStyle,
        imageStyle
    } = styles;

     return (
        <Card>
            <CardSection>
                <View style={thumbnailContainerStyle}>
                    <ButtonImage onPress={() => navigation.navigate('Notifications')} uri={{ uri: thumbnail_image }} />

                    {/* <Image 
                        style={thumbnailStyle}
                        source={{ uri: thumbnail_image }} 
                    /> */}
                </View>
                <View style={headerContentStyle}>
                    <Text style={headerTextStyle}>{title}</Text>
                    <Text>{artist}</Text>
                </View>
                <View>
                    <Text>
                        32m
                    </Text>
                </View>

            </CardSection>

            <Image 
                style={imageStyle}
                source={{ uri: image }} 
            />

            <CardSection>
                {/* <ButtonImage uri={require('./perfil.jpg')} /> */}

                <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={() => console.log('ASD')} />
                <TextLikes>
                    54 weedy-likes
                </TextLikes>
            </CardSection>
        </Card>
     );
 };

 const styles = {
     headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
     },
     headerTextStyle: {
        fontSize: 18
     },
     thumbnailStyle: {
         height: 50,
         width: 50,
         borderRadius: 25
     },
     thumbnailContainerStyle: {
         justifyContent: 'center',
         alignItems: 'center',
         marginLeft: 10,
         marginRight: 10
     },
     imageStyle: {
         height: 300,
         flex: 1,
         width: null
     }
 };

 export default AlbumDetail;
