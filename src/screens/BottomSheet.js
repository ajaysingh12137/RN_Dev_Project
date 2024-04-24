import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  StyleSheet,
  StatusBar,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BottomSheet = ({refRBSheet}) => {
  const navigation = useNavigation();
  const handleSignOut = async () => {
    try {
      const userSignOut = await auth()
        .signOut()
        .then(() => console.log('User signed out!'));
      navigation.navigate('Onboarding');
      refRBSheet.current.close();
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <RBSheet
      ref={refRBSheet}
      height={windowHeight / 2}
      draggable={true}
      closeOnPressMask={true}
      dragOnContent={true}
      customStyles={{
        wrapper: {flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'},
        draggableIcon: {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'grey',
          opacity: 0.7,
          width: 60,
          height: 6,
        },
        container: {
          backgroundColor: 'white',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        },
      }}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Login Successfully</Text>
        <Text style={styles.description}>
          An event has been created and the invite has been sent to you via
          email.
        </Text>
        <TouchableOpacity
          onPress={() => handleSignOut()}
          style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.2,
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: '600',
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: '#878787',
    textAlign: 'center',
    marginTop: 10,
    width: windowWidth * 0.7,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#FE8C00',
    width: windowWidth * 0.9,
    height: windowHeight * 0.05,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default BottomSheet;
