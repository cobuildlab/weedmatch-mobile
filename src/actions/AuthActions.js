import { LOGINSTATE, APPSTATE } from '../State';
import { strings } from '../i18n';
import { isValidText } from '../utils'

function loginAction(username, password) {
  if (!isValidText(username) || !isValidText(password)) {
    APPSTATE.next({ error: strings("login.required_fields_error") })
    return;
  }

  this.setState({ isLoading: true })
  userService.login(this.state.username, this.state.password)
    .then(response => {
      if (response) {
        console.log(response.token);
        console.log(response.id.toString());
        if (response && response.token) {
          this.saveItem('id_token', response.token);
          this.saveItem('id_user', response.id.toString());
          this.props.navigation.navigate('App');
        }
      }
    })
    .catch(error => {
      this.setState({ isLoading: false })
      Alert.alert(error.detail)
      console.log(error);
    });
}

export { loginAction };