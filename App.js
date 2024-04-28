import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from './src/screens/Onbaording';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import BottomSheet from './src/screens/BottomSheet';
import GoogleLogin from './src/screens/GoogleLogin';
import HomeScreen from './src/screens/HomeScreen';
import auth from '@react-native-firebase/auth';

const App = () => {
  const Stack = createNativeStackNavigator();
  const [isUserLogin, setisUserLogin] = useState(false);
  auth().onAuthStateChanged(user => {
    if (user !== null) {
      setisUserLogin(true);
    }
  });
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isUserLogin ? (
          <Stack.Screen name="Onboarding" component={Onboarding} />
        ) : null}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="BottomSheet" component={BottomSheet} />
        <Stack.Screen name="GoogleLogin" component={GoogleLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;