'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import SignUp from  './SignUp';
import NavigationBar from 'react-native-navbar';
import helpers from '../utils/dbHelper';
import Home from './tabBarItems/Home';

var window = Dimensions.get('window');

let {
  AppRegistry,
  StyleSheet,
  AlertIOS,
  PixelRatio,
  NavigatorIOS,
  Text,
  StatusBarIOS,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  Textinput
} = React;

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userEmailorUserName: null,
      password: null
    };
  }

  fetchingBears() {

  }

  componentWillMount() {
    console.log('componentWillMount');
    StatusBarIOS.setStyle('light-content');
  }

  componentDidMount () {
    console.log('componentDidMount');
    // fetch(url, {method: 'GET',})
    // .then((response) => response.json())
    // .then((responseData) => {
    //   console.log(responseData);
    // })
    // .done();
  }
  onSignUp() {
    this.props.navigator.push({
      component: SignUp,
      footerText: this.footerText(),
      navigationBar: (
        <NavigationBar
          title={<Text style={styles.titleSignUp}>SIGN UP</Text>}
          style={styles.navigationBar}
          tintColor={'#285DA1'}
          statusBar={{style: 'light-content', hidden: false}}
          leftButton={
            <TouchableOpacity style={styles.buttonNavBar} onPress={()=> this.props.navigator.pop()}>
              <Image
                source={require('../img/back-icon.png')}
                style={[{ width: 15, height: 15}]}/>
            </TouchableOpacity>
          }/>
      )
    });
  }

  footerText() {
    return (
      <Text style={styles.terms}>
        By clicking Sign Up you are agreeing to the <Text style={{color: '#64A1EF'}}>Terms of use</Text> and <Text style={{color: '#64A1EF'}}>Privacy Policy</Text>.
      </Text>
    );
  }

  onSignInPress() {
    var url = 'http://localhost:8000/api/loginmanual';
    var body = {
      password: this.state.password,
      email: null,
      username: null,
    };

    if (this.state.userEmailorUserName.indexOf('@') != -1) {
      body.email = this.state.userEmailorUserName;
    } else {
      body.username = this.state.userEmailorUserName;
    }

    fetch(helpers.requestHelper(url, body, 'POST'))
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      if (responseData.status === 'nonUser') {
        AlertIOS.alert(
          'Unrecognized User',
          'Please, sign up!',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          ]
        )
      } else if (responseData.status === 'passwordIncorrect') {
        AlertIOS.alert(
          'Password Incorrect!',
          'Please, try again.',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          ]
        )
      } else if ( responseData.status === 'successLogin') {
        console.log('Successfull login');
        this.props.navigator.push({
          component: Home,
        });
      }
    })
    .done();
  }

  render() {

    return (
      <View style={styles.loginScreen}>

        <View style={styles.brandWrap}>
          <Image source={require('../img/logo-s.png')} style={styles.iconApp}/>
          <Text style={styles.description}>Independent makers reaching the market</Text>
        </View>

        <View style={styles.identityPass}>
          <View style={styles.inputBoxWrapper}>
            <Image style={styles.icons} source={require('../img/email-login-icon.png')}/>
            <TextInput
              key={1}
              style={styles.inputBox}
              placeholder="EMAIL or USERNAME"
              returnKeyType='next'
              onFocus={()=>{console.log('username')}}
              placeholderTextColor="white"
              onChangeText={(userEmailorUserName) => this.setState({userEmailorUserName})}
              value={this.state.text}/>
          </View>
          <View style={styles.inputBoxWrapper}>
            <Image style={styles.icons} source={require('../img/locker-login-icon.png')}/>
            <TextInput
              key={2}
              style={styles.inputBox}
              placeholder="PASSWORD"
              password={true}
              placeholderTextColor="white"
              onChangeText={(password) => this.setState({password})}
              value={this.state.text}/>
            <Image style={styles.icons} source={require('../img/interrogacion-login-sign.png')}/>
          </View>
        </View>

        <View style={styles.buttonsWrapper}>
          <View key={0}><Text style={styles.tour}>Take a tour</Text></View>
          <TouchableHighlight
            key={1}
            onPress={this.onSignInPress.bind(this)}
            style={styles.button}>
            <Text style={[styles.textButton]}>SIGN IN</Text>
          </TouchableHighlight>
          <TouchableHighlight
            key={2}
            style={styles.button}>
            <Text style={[styles.textButton]}>FACEBOOK</Text>
          </TouchableHighlight>
          <Text style={styles.signUp} onPress={this.onSignUp.bind(this)}>SIGN UP</Text>
        </View>

        <View style={styles.wrapperTerms}>
          {this.footerText}
        </View>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  titleSignUp: {
    fontFamily: 'Avenir',
    fontWeight: '100',
    fontSize: 15,
    color: 'white',
    marginBottom: 3
  },
  navigationBar: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
    overflow: 'hidden',
  },
  buttonNavBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    marginBottom: 4,
    paddingBottom: 12,
  },
  navigator: {
    backgroundColor: 'yellow',
    width: window.width,
    borderColor: 'black',
    borderWidth: 10
  },
  loginScreen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#285DA1',
  },
  brandWrap: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width * 0.8,
    justifyContent: 'space-around',
    paddingTop: 40
  },
  description: {
    fontFamily: 'Avenir-Book',
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 30,
    color: 'white',
  },
  iconApp: {
    width: 70,
    height: 70,
  },
  identityPass: {
    flexDirection: 'column'
  },
  inputBoxWrapper: {
    width: window.width * 0.80,
    flexDirection: 'row',
    borderColor: '#4A77B0',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    marginVertical: 8
  },
  inputBox: {
    padding: 9,
    height: 40,
    flex: 5,
    fontFamily: 'Avenir-Book',
    fontWeight: "100",
    color: 'white',
    fontSize: 13,
    opacity: 0.65,
    textAlign: 'center'
  },
  icons: {
    flex: 1,
    maxWidth: 15,
    resizeMode: 'contain',
    opacity: 0.65
  },
  buttonsWrapper: {
    alignItems: 'center',
    flexDirection: 'column',

  },
  button: {
    width: window.width * 0.8,
    borderWidth: 1.2 / PixelRatio.get(),
    alignItems: 'center',
    borderColor: 'white',
    borderRadius: 4,
    shadowColor: 'black',
  },
  textButton: {
    fontFamily: 'Avenir-Roman',
    color: 'white',
    shadowColor: 'black',
    paddingVertical: 12,
    fontSize: 13,
  },
  tour: {
    fontFamily: 'Avenir-Black',
    color: 'white',
    marginBottom: 25,
    fontSize: 13
  },
  signUp: {
    fontFamily: 'Avenir-Black',
    shadowColor: 'black',
    color: 'white',
    marginTop: 27,
    fontSize: 12
  },
  wrapperTerms: {
    width: window.width * 0.75,
  },
  terms: {
    textAlign: 'center',
    fontFamily: 'Avenir-Roman',
    fontSize: 13,
    color: 'white',
    marginBottom: 30
  },
});

module.exports = Login;