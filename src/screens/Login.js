import React, {useState, useRef} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';
import BottomSheet from './BottomSheet';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = () => {
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    setEmailError(''), setPasswordError('');

    if (!email.trim()) {
      setEmailError('Please enter your email');
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if (!password.trim()) {
      setPasswordError('Please enter your password');
      return;
    }

    if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters');
      return;
    }

    try {
      const isuserlogin = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      navigation.navigate('HomeScreen');
    } catch (error) {
      Alert.alert('Sign In Error', error.message);
      console.log(error);
    }
  };

  const isValidEmail = email => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <BottomSheet refRBSheet={refRBSheet} />
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.content}>
        <Text style={styles.title}>Login to your account.</Text>
        <Text style={styles.subtitle}>Please sign in to your account</Text>
        <KeyboardAvoidingView style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            placeholder="Enter Email"
            style={styles.input}
            value={email}
            onChangeText={value => setEmail(value)}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
          <Text style={styles.inputLabel}>Password</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Enter Password"
              secureTextEntry={!showPassword}
              style={[styles.input, {marginLeft: windowWidth * 0.04}]}
              value={password}
              onChangeText={value => setPassword(value)}
            />
            <TouchableOpacity
              style={{right: 15}}
              onPress={handlePasswordVisibility}>
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
        <TouchableOpacity style={styles.forgotPassword} onPress={() => {}}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>Or sign in with</Text>
          <View style={styles.divider} />
        </View>
        <TouchableOpacity
          style={styles.imageview}
          onPress={() => navigation.navigate('GoogleLogin')}>
          <Image source={require('../images/google.png')} />
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
    fontSize: windowWidth * 0.035,
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
  errorText: {
    color: 'red',
    fontSize: windowWidth * 0.035,
    marginTop: 5,
  },
  forgotPassword: {
    marginTop: windowHeight * 0.03,
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: windowWidth * 0.035,
    color: '#FE8C00',
    fontWeight: '500',
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

export default Login;
