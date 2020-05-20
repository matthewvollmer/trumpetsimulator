import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import {useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

//interface Props extends NavigationInjectedProps {}

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Main'
>;

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Main'>;

type Props = {
    route: ProfileScreenRouteProp;
    navigation: ProfileScreenNavigationProp;
  };

interface State {
  virtualBrass: ImageSourcePropType,
  tuner: ImageSourcePropType,
  metronome: ImageSourcePropType,
  drumpad: ImageSourcePropType
}

class Main extends React.Component<Props, State> { 
    constructor(props: Readonly<Props>) {
      super(props);

      this.state = {
        virtualBrass: require('../../assets/VIRTUAL_BRASS.png'),
        tuner: require('../../assets/TUNER.png'),
        metronome: require('../../assets/METRONOME.png'),
        drumpad: require('../../assets/DRUMPAD.png'),
      }
  }

    public render() {
        return (
          <View style={styles.parentContainer}>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                style= {styles.img}
                onPress={() => this.props.navigation.navigate('TrumpetSlider')}>
                <Image 
                  source={this.state.virtualBrass}
                  style= {styles.img}
                ></Image>
              </TouchableOpacity>
              <TouchableOpacity
                style= {styles.img}
                onPress={() => this.props.navigation.navigate('Metronome')}>
                <Image 
                  source={this.state.metronome}
                  style= {styles.img}
                ></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                style= {styles.img}
                onPress={() => this.props.navigation.navigate('Tuner')}>
                <Image 
                  source={this.state.tuner}
                  style= {styles.img}
                ></Image>
              </TouchableOpacity>
              <TouchableOpacity
                style= {styles.img}
                onPress={() => this.props.navigation.navigate('Drumpad')}>
                <Image 
                  source={this.state.drumpad}
                  style= {styles.img}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
        )
    }    
}

export default Main;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  img: {
    flex: 1,
    //alignSelf: "stretch",
    resizeMode: 'contain'
  }
});