import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from './src/screens/Onbaording';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import BottomSheet from './src/screens/BottomSheet';
import GoogleLogin from './src/screens/GoogleLogin';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="BottomSheet" component={BottomSheet} />
        <Stack.Screen name="GoogleLogin" component={GoogleLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

