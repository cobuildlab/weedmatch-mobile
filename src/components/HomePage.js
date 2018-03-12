import React, {Component} from 'react';
import AlbumList from './AlbumList';
import Album from './Album';
import AlbumStack from './Router';
import SampleText from './SampleText';
import {
    Button,
    Platform,
    ScrollView,
    StyleSheet,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    AppRegistry,
    SafeAreaView,
  } from 'react-native';
import {
    createNavigator,
    createNavigationContainer,
    TabRouter,
    addNavigationHelpers,
    StackNavigator
  } from 'react-navigation';

const MyNavScreen = ({ navigation, banner }) => (
    <ScrollView>
      <SampleText>{banner}</SampleText>
      <Button
        onPress={() => {
          navigation.goBack(null);
        }}
        title="Go back"
      />
    </ScrollView>
  );

  const MyHomeScreen = ({ navigation }) => (
    <AlbumList />
    // <MyNavScreen banner="Home Screen" navigation={navigation} />
  );

  const MyNotificationsScreen = ({ navigation }) => (
    <Album />
    // <MyNavScreen banner="Notifications Screen" navigation={navigation} />
  );

  const CustomTabBar = ({ navigation }) => {
    const { routes } = navigation.state;
    return (
      <View style={styles.tabContainer}>
        {routes.map(route => (
          <TouchableOpacity
            onPress={() => navigation.navigate(route.routeName)}
            style={styles.tab}
            key={route.routeName}
          >
            <Text>{route.routeName}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const CustomTabView = ({ router, navigation }) => {
    const { routes, index } = navigation.state;
    const ActiveScreen = router.getComponentForState(navigation.state);
    return (
      <SafeAreaView style={styles.safeArea} >
        <View style={styles.container}>
          <CustomTabBar navigation={navigation} />
          <ActiveScreen
            navigation={addNavigationHelpers({
              ...navigation,
              state: routes[index],
            })}
          />
        </View>
      </SafeAreaView>
    );
  };

  const CustomTabRouter = TabRouter(
    {
      Home: {
        screen: AlbumStack,
        path: '',
      },
      Notifications: {
        screen: MyNotificationsScreen,
        path: 'notifications',
      },
    },
    {
      // Change this to start on a different tab
      initialRouteName: 'Home',
    }
  );

  const HomePage = createNavigationContainer(
    createNavigator(CustomTabRouter)(CustomTabView)
  );

  const styles = StyleSheet.create({
    container: {
      marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
    tabContainer: {
      flexDirection: 'row',
      height: 48,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 4,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 4,
    },
    sampleText: {
      margin: 14,
    },
    safeArea: {
      flex: 1,
      backgroundColor: '#ddd'
    }
  });

  export default HomePage;