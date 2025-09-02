import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = ({ setUser }) => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007bff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Login" options={{ title: 'Iniciar Sesión' }}>
       {props => <LoginScreen {...props} setUser={setUser} />}
      </Stack.Screen>
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ title: 'Registrarse' }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;