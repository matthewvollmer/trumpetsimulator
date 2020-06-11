import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer, NavigationContainerRef} from '@react-navigation/native';
import { StyleSheet, View, Image} from 'react-native';
import { Text, Button } from 'react-native-elements';
import Main from './src/screens/Main';
import TrumpetSlider from './src/screens/TrumpetSlider';
import Metronome from './src/screens/Metronome';
import Tuner from './src/screens/Tuner'
import Drumpad from './src/screens/Drumpad'
import Licenses from './src/screens/Licenses'
import { Logo } from './src/components/Logo'
import { BackImage } from './src/components/BackImage'
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';
import Modal from 'react-native-modal'

export type RootStackParamList = {
  Main: { userid: string};
  TrumpetSlider: {};
  Metronome: {};
  Tuner: {};
  Drumpad: {};
  Licenses: {};
};

export const navigationRef = React.createRef<NavigationContainerRef>();

const Stack = createStackNavigator<RootStackParamList>();

interface State {
  showAbout: boolean
}

interface Props {

}

export default class App extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
      super(props);

      this.state = {
        showAbout: false
      }
  }

  public render() {
    return  (
      <NavigationContainer>
        <Modal
            isVisible={this.state.showAbout}
            onBackdropPress={() => this.setState({showAbout: false})}
            onBackButtonPress={() => this.setState({showAbout: false})}
        >
          <View style={{backgroundColor: 'white', height:'80%', width: '90%', borderRadius: 12, alignSelf: 'center'}}>
            <Licenses></Licenses>
          </View>
        </Modal>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={Main} options= {{headerTitle : () => <Logo/>,
            headerRight: () => (
            <Button
              title="About"
              type="outline"
              titleStyle={{fontFamily:'Fipps-Regular', fontSize:8}}
              onPress={() => this.setState({showAbout: true})}
            />)}}/>
          <Stack.Screen name="TrumpetSlider" component={TrumpetSlider} options={{headerTitle: () => 
              <Text style= {styles.headerTextStyles}>VIRTUAL BRASS</Text>, headerBackImage: () => <BackImage/>}}  />
          <Stack.Screen name="Metronome" component={Metronome} options={{headerTitle: () => 
              <Text style= {styles.headerTextStyles}>METRONOME</Text>, headerBackImage: () => <BackImage/>}}  />
          <Stack.Screen name="Tuner" component={Tuner} options={{headerTitle: () => 
              <Text style= {styles.headerTextStyles}>TUNER</Text>, headerBackImage: () => <BackImage/>}}  />
          <Stack.Screen name="Drumpad" component={Drumpad} options={{headerTitle: () => 
            <Text style= {styles.headerTextStyles}>DRUMPAD</Text>, headerBackImage: () => <BackImage/>}}  />
          <Stack.Screen name="Licenses" component={Licenses} options={{headerTitle: () => 
            <Text style= {styles.headerTextStyles}>ABOUT</Text>, headerBackImage: () => <BackImage/>}}  />
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
  logo: {
    width: 80,
  },
  headerTextStyles: {
    fontFamily:'Fipps-Regular', 
    color: '#F1641F'
  }
});
