import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Button } from 'react-native-elements'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import admob, { MaxAdContentRating, BannerAdSize } from '@react-native-firebase/admob';
import { BannerAd, TestIds } from '@react-native-firebase/admob';

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

  public componentDidMount() {
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.G,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: false,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
      });
  }

    public render() {
      const adId = __DEV__ ?  TestIds.BANNER : "ca-app-pub-9855234796425536/6028942568";
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
            <View style={{justifyContent:'center'}}>
              <BannerAd 
                unitId={adId}
                size={BannerAdSize.BANNER}
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                }}
                onAdLoaded={() => {
                  console.log('Advert loaded');}}
                onAdFailedToLoad={(error: any) => {
                  console.error('Advert failed to load: ', error);}}
              />
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