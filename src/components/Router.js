import React from 'react';
import { Image } from 'react-native';
import AlbumList from './AlbumList';
import Album from './Album';
import Header from './Header';
import Imagen from './Imagen';
import { StackNavigator } from 'react-navigation';

export default AlbumStack = StackNavigator({
    AlbumList: { screen: AlbumList },
    Album: { screen: Album }
});
