import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign/';
import Entypo from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();
  const handleSignIn = async () => {
    setEmailError('');
    setPasswordError('');
    setUsernameError('');

    if (!email.trim()) {
      setEmailError('Please enter your email');
    }
    if (!username.trim()) {
      setUsernameError('Please enter your name');
    }
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email');
    }
    if (!password.trim()) {
      setPasswordError('Create Your Password');
    }
    if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters');
    }
    try {
      const isUserCreated = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log(isUserCreated);
      Alert.alert('Account Created Successfully');
      navigation.navigate('Login');
    } catch (error) {
      console.warn(error.message);
    }
  };

  const isValidEmail = email => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handlePress = () => {
    setIsChecked(!isChecked);
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Create your new account.</Text>
        <Text style={styles.subtitle}>
          Create an account to start looking for the food you like
        </Text>
        <KeyboardAvoidingView style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            placeholder="Enter Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
          <Text style={styles.inputLabel}>User Name</Text>
          <TextInput
            placeholder="Enter User Name"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          {usernameError ? (
            <Text style={styles.errorText}>{usernameError}</Text>
          ) : null}
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              placeholder="Enter Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={styles.passwordInput}
            />
            <TouchableOpacity onPress={handlePassword} style={styles.eyeIcon}>
              <Entypo
                name={showPassword ? 'eye' : 'eye-with-line'}
                size={18}
                right={10}
              />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </KeyboardAvoidingView>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={handlePress}
            style={[
              styles.checkbox,
              {
                backgroundColor: isChecked ? '#FE8C00' : 'transparent',
              },
            ]}>
            <AntDesign
              name="check"
              size={15}
              style={{color: isChecked ? 'white' : 'black'}}
            />
          </TouchableOpacity>
          <View style={styles.agreementTextContainer}>
            <Text style={styles.agreementText}>I Agree with</Text>
            <TouchableOpacity style={styles.termsLink}>
              <Text
                style={[
                  styles.agreementText,
                  {color: '#FE8C00', textDecorationLine: 'underline'},
                ]}>
                Terms of Service
              </Text>
              <Text style={styles.agreementText}>And</Text>
              <Text
                style={[
                  styles.agreementText,
                  {color: '#FE8C00', textDecorationLine: 'underline'},
                ]}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>Or Sign in with</Text>
          <View style={styles.divider} />
        </View>
        <TouchableOpacity style={styles.imageview}>
          <Image source={require('../images/google.png')} />
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.registerLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    marginTop: windowHeight * 0.1,
    paddingHorizontal: windowWidth * 0.05,
    flex: 1,
  },
  title: {
    fontSize: windowWidth * 0.07,
    color: '#101010',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: windowWidth * 0.038,
    color: '#878787',
    lineHeight: windowWidth * 0.05,
    marginTop: 5,
  },
  inputContainer: {
    marginVertical: windowHeight * 0.02,
  },
  inputLabel: {
    fontSize: windowWidth * 0.035,
    color: '#101010',
    marginTop: windowHeight * 0.04,
    fontWeight: '500',
  },
  input: {
    height: windowHeight * 0.065,
    width: windowWidth * 0.9,
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: windowWidth * 0.03,
    padding: 10,
    marginTop: windowHeight * 0.002,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passwordInput: {
    height: windowHeight * 0.065,
    width: windowWidth * 0.9,
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: windowWidth * 0.03,
    padding: 10,
    marginTop: windowHeight * 0.002,
  },
  eyeIcon: {
    right: 20,
  },
  errorText: {
    color: 'red',
    fontSize: windowWidth * 0.035,
    marginTop: 5,
  },
  checkboxContainer: {
    marginLeft: windowWidth * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: windowHeight * 0.01,
  },
  checkbox: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.4,
    borderColor: 'black',
    borderRadius: 5,
  },
  agreementTextContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    gap: 5,
  },
  agreementText: {
    color: 'black',
    fontSize: windowWidth * 0.035,
  },
  termsLink: {
    flexDirection: 'row',
    gap: 5,
  },
  signInButton: {
    height: windowHeight * 0.06,
    width: windowWidth * 0.9,
    backgroundColor: '#FE8C00',
    borderRadius: windowWidth * 0.1,
    justifyContent: 'center',
    marginTop: windowHeight * 0.03,
  },
  signInButtonText: {
    fontSize: windowWidth * 0.035,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  dividerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: windowHeight * 0.05,
  },
  divider: {
    borderWidth: 0.3,
    width: windowWidth * 0.3,
    borderColor: '#878787',
  },
  dividerText: {
    paddingHorizontal: windowWidth * 0.05,
  },
  imageview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: windowHeight * 0.03,
  },
  registerText: {
    fontSize: windowWidth * 0.035,
    fontWeight: '500',
    color: '#101010',
  },
  registerLink: {
    color: '#FE8C00',
    fontSize: windowWidth * 0.035,
    fontWeight: '500',
  },
});

export default Signup;
