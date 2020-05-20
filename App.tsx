import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';
import { StyleSheet, View, Image} from 'react-native';
import Main from './src/screens/Main';
import TrumpetSlider from './src/screens/TrumpetSlider';
import Metronome from './src/screens/Metronome';
import Tuner from './src/screens/Tuner'
import Drumpad from './src/screens/Drumpad'
import { Logo } from './src/components/Logo'

export type RootStackParamList = {
  Main: { userid: string};
  TrumpetSlider: {};
  Metronome: {};
  Tuner: {};
  Drumpad: {};
};

const Stack = createStackNavigator<RootStackParamList>();

export default class App extends React.Component {
  public render() {
    return  (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={Main} options= {{headerTitle : () => <Logo/>}}/>
          <Stack.Screen name="TrumpetSlider" component={TrumpetSlider} options={{title: 'Virtual Brass',}} />
          <Stack.Screen name="Metronome" component={Metronome} />
          <Stack.Screen name="Tuner" component={Tuner} />
          <Stack.Screen name="Drumpad" component={Drumpad} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const createLogo = () => {
  return <View>
    <Image
        resizeMode={'contain'}
        source={require('./assets/applogo.png')}
    />
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
},
});
