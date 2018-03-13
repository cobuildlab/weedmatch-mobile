import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import TextLikes from './TextLikes';
import ButtonImage from './ButtonImage';
import ButtonBar from './ButtonBar';

const Album = () => {

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
                <Image
                    style={imageStyle}
                    source={require('./perfil.jpg')}
                />
           </CardSection>

           <CardSection>
               <Text>
                   Daniel, 20
               </Text>
               <ButtonImage />
           </CardSection>

            <CardSection>
               <Text>
                   Maracaibo, 20km distancia
               </Text>
           </CardSection>

            <CardSection>
               <Text>
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
               </Text>
           </CardSection>

           <CardSection>
                <ButtonBar />
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

export default Album;
