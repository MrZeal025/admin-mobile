import React, { useEffect } from 'react';
import TabNavigator from './navigators/TabNavigator';
import { StyleSheet, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from './styles/styles-colors';

// create navigations
const Stack = createNativeStackNavigator();

export default function App() {

  // handles back button
  const disableBackButton = () => {
    BackHandler.exitApp();
    return true;
  };
  
  // react life cycle the runs always when the page is mounted
  useEffect(() => {
    // this will run uppon clicking the back button of the phone
    BackHandler.addEventListener('hardwareBackPress', disableBackButton);
  }, []);

  return (
   <NavigationContainer>
       <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: 'red',
          headerTransparent: true,
          headerTitle: '',
        }}
        initialRouteName="MainPages"
      >
        <Stack.Screen
          options={{ headerTintColor: Colors.primary, headerShadowVisible: false, headerTitle: () => null }}
          name="MainPages"
          component={TabNavigator}
        />
      </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
