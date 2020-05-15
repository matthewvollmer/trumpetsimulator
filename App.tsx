import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';
import { StyleSheet} from 'react-native';
import Main from './src/screens/Main';
import TrumpetSlider from './src/screens/TrumpetSlider';
import Metronome from './src/screens/Metronome';
import Tuner from './src/screens/Tuner'

export type RootStackParamList = {
  Main: { userid: string};
  TrumpetSlider: {};
  Metronome: {};
  Tuner: {};
};

const Stack = createStackNavigator<RootStackParamList>();

export default class App extends React.Component {
  public render() {
    return  (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={Main}/>
          <Stack.Screen name="TrumpetSlider" component={TrumpetSlider} />
          <Stack.Screen name="Metronome" component={Metronome} />
          <Stack.Screen name="Tuner" component={Tuner} />
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
