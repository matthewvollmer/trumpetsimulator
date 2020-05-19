import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Button, Text} from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { Audio } from 'expo-av';
import Sound from 'react-native-sound';


type DrumpadRouteProp = RouteProp<RootStackParamList, 'Drumpad'>;

type DrumpadNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Metronome'
>;

type Props = {
    route: DrumpadRouteProp;
    navigation: DrumpadNavigationProp;
  };

interface State{ 
    kick: Sound,
    hat: Sound,
    snare: Sound, 
    kick2: Sound,
    hat2: Sound,
    snare2: Sound, 
}

class Drumpad extends React.Component<Props, State> {
    interval: number | undefined; 
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
             kick : new Sound('kickshort.mp3', Sound.MAIN_BUNDLE, (error) => {error &&  console.log(error)}),
             hat : new Sound('hatshort.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
             snare : new Sound('snare.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
             kick2 : new Sound('kickshort.mp3', Sound.MAIN_BUNDLE, (error) => {error &&  console.log(error)}),
             hat2 : new Sound('hatshort.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
             snare2 : new Sound('snare.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
        }
    }
    async componentDidMount() {
        Sound.setActive(true);
        Sound.setCategory('Playback', true);
    }

    public render() {
        return (
            <View style={styles.parentContainer}>
                <View style={styles.rowContainer}>
                    <View style= {styles.buttonContainer}
                    onTouchStart={this.handleHat}>
                        {/* <Button 
                            buttonStyle = {{height: '94%', margin: 10, borderRadius: 20}}
                            onPress={this.handleHat} 
                            title='Hat'>
                        </Button> */}
                        <Text>Hat</Text>
                    </View>
                    <View style= {styles.buttonContainer}
                        onTouchStart={this.handleSnare}>
                        {/* <Button 
                            buttonStyle = {{height: '94%', margin: 10, borderRadius: 20}}
                            onPress={this.handleSnare} 
                            title='Snare'>
                        </Button> */}
                        <Text>Snare</Text>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style= {styles.buttonContainer}
                        onTouchStart={this.handleKick}>
                            {/* <Button 
                                buttonStyle = {{height: '94%', margin: 10, borderRadius: 20}}
                                onPress={this.handleKick} 
                                title='Kick'>
                            </Button> */}
                            <Text>Kick</Text>
                        </View>
                </View>
            </View>
        )
    }    

    private handleKick = () => {
        this.state.kick.isPlaying() ? this.state.kick2.play() : this.state.kick.play()
        this.state.kick.play();
    }

    private handleSnare = () => {
        this.state.snare.isPlaying() ? this.state.snare2.play() : this.state.snare.play()
        this.state.snare.play();
    }

    private handleHat = () => {
        this.state.hat.isPlaying() ? this.state.hat2.play() : this.state.hat.play()
        this.state.hat.play();
    }
}

export default Drumpad;

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
    buttonContainer: {
        flex:1,
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 5
    }
});