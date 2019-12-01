import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';

import { MonoText } from '../components/StyledText';

import { Feather } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
    showPassword: false,
    isDisabled: true,
    showError: false,
    errorMsg: '',
    isLoading: false
  }

  onChangeText = (key, value) => {
    if(key == 'email') {
      return this.setState({email: value.replace(/\s/g, '')});
    }
    this.setState({ [key]: value })
  }

  showPassword = () => {
    this.setState({showPassword: !this.state.showPassword});
  }

  signIn = async () => {

  }

  buttonDisabled = () => {
    const { name, password, email } = this.state
    return !email || !password;
  }

  render() {
    const {showPassword, showError, errorMsg, isLoading} = this.state;
    return (
    <View style={styles.container}>
        <View style={styles.intro}>
          <Text style={styles.title}>Hello,</Text>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={[styles.title, {color: Colors.tintColor}]}>MoneyManager</Text>
          <Text style={styles.description}>Please signin to continue</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput
            style={styles.input}
            ref={input => { this.textInput = input }}
            placeholder='Enter your email address'
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={val => this.onChangeText('email', val)}
            value={this.state.email}
          />
          <Text  style={styles.inputText}>Password</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder='Enter password'
              autoCapitalize="none"
              secureTextEntry={!this.state.showPassword}
              onChangeText={val => this.onChangeText('password', val)}
              value={this.state.password}
            />
            <TouchableOpacity
              style={styles.viewPasswordicon}
              onPress= {this.showPassword}
            >
              <Feather
                style={styles.passwordIcon}
                color={Colors.lightText}
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.loginGroup}>
            <TouchableOpacity
              disabled={this.buttonDisabled()}
              style={this.buttonDisabled() ? [styles.loginButton, styles.disabledButton] : styles.loginButton}
              onPress={() => this.props.navigation.navigate('List')}
            >
              <Text
                style={this.buttonDisabled() ? [styles.loginText, styles.disabledText] : styles.loginText}
              >Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
}
}
const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    fontWeight: '500',
    height: 50,
    backgroundColor: Colors.lightGrey,
    color: '#333',
    padding: 8,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  inputGroup: {
    borderColor: Colors.lightGrey,
    borderWidth: 3,
    margin: 10,
    padding: 15,
    borderRadius: 20,
  },
  inputText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#333',
    paddingTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 40,
    color: '#333',
  },
  intro: {
    margin: 10,
  },
  description: {
    fontWeight: '500',
    fontSize: 15,
    color: Colors.lighterText,
  },
  loginButton: {
    backgroundColor: Colors.tintColor,
    borderRadius: 50,
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  loginGroup: {
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18
  },
  disabledText: {
    color: Colors.lighterText,
  },
  switchLoginText: {
    color: '#333',
    fontSize: 15,
    color: Colors.lighterText,
    marginTop: 30,
  },
  switchLoginAction: {
    color: Colors.tintColor,
    fontWeight: '700'
  },
  viewPasswordicon: {
    position: 'absolute',
    justifyContent: 'center',
    right: 0,
    alignItems : 'center',
    justifyContent : 'center',
    width: 50,
    height: 50,
    top: '12%',
    textAlign: 'center',
  },
  passwordIcon: {
    color: Colors.lighterText,
  },
  disabledButton: {
    backgroundColor: Colors.lightGrey
  },
  errorMsg: {
    color: Colors.tintColor,
    margin: 10,
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  loader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 1
  }
});