import React from 'react';

//import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button } from 'react-native';
import Main from './src/screens/Main';
import TrumpetSlider from './src/screens/TrumpetSlider';

export type RootStackParamList = {
  Main: { userId: string };
  TrumpetSlider: {}
};

const Stack = createStackNavigator<RootStackParamList>();

export default class App extends React.Component {
  public render() {
    return  (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={Main}/>
          <Stack.Screen name="TrumpetSlider" component={TrumpetSlider} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
