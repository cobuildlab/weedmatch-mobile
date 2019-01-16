import { StyleSheet, Platform } from 'react-native';
const marginLeftTitle = Platform.OS === 'ios' ? -20 : 5;

export default StyleSheet.create({

  viewContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
  },
  viewMsg: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: marginLeftTitle,
  },
  containerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgProfileItem: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    resizeMode: 'cover',
  },
  containers: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  viewTexts: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  textUser: {
    marginLeft: 12,
    fontWeight: '500',
    fontSize: 16,
  },
  textChat: {
    marginLeft: 12,
    fontSize: 14,
  },


});
