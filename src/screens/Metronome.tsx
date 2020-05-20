import React from 'react';
import { StyleSheet, View, Slider, Picker, Image, TouchableOpacity} from 'react-native';
import { Text, Button} from 'react-native-elements'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { Audio } from 'expo-av';
import Sound from 'react-native-sound';


type MetronomeRouteProp = RouteProp<RootStackParamList, 'Metronome'>;

type MetronomeNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Metronome'
>;

type Props = {
    route: MetronomeRouteProp;
    navigation: MetronomeNavigationProp;
  };

interface State{ 
    currentTempo: number
    currentMillisPerBeat: number,
    playing: boolean
    downBeat: Sound
    beat: Sound
    downBeat2: Sound
    beat2: Sound
    beatsPerMeasure: number
    beatInMeasure: number
}

class Metronome extends React.Component<Props, State> {
    interval: number | undefined; 
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            currentTempo: 60,
            currentMillisPerBeat: 1000,
            playing: false,
            downBeat : new Sound('downbeat.mp3', Sound.MAIN_BUNDLE, (error) => {error &&  console.log(error)}),
            beat: new Sound('offbeats.mp3', Sound.MAIN_BUNDLE, (error) => {error &&  console.log(error)}),
            downBeat2 : new Sound('downbeat.mp3', Sound.MAIN_BUNDLE, (error) => {error &&  console.log(error)}),
            beat2: new Sound('offbeats.mp3', Sound.MAIN_BUNDLE, (error) => {error &&  console.log(error)}),
            beatsPerMeasure: 4,
            beatInMeasure: 1
        }
    }

    async componentDidMount() {
        Sound.setActive(true);
        Sound.setCategory('Playback', true);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
        console.log("cleared interval from unmount");
    }

    public render() {
        return (
            <View style={styles.parentContainer}>
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={() => this.setState({beatsPerMeasure: 4})}>
                        <Image source = {this.state.beatsPerMeasure === 4 ? 
                            require('../../assets/44_pr.png') : require('../../assets/44_unpr.png')}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({beatsPerMeasure: 5})}>
                        <Image source = {this.state.beatsPerMeasure === 5 ? 
                            require('../../assets/54_pr.png') : require('../../assets/54_unpr.png')}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={() => this.setState({beatsPerMeasure: 3})}>
                        <Image source = {this.state.beatsPerMeasure === 3 ? 
                            require('../../assets/34_pr.png') : require('../../assets/34_unpr.png')}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({beatsPerMeasure: 6})}>
                        <Image source = {this.state.beatsPerMeasure === 6 ? 
                            require('../../assets/68_pr.png') : require('../../assets/68_unpr.png')}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.columnContainer}>
                    <Text 
                        style={styles.text}>
                        {"Tempo: " + this.state.currentTempo}
                    </Text>
                {/* </View>
                <View style={styles.rowContainer}> */}
                    <Slider
                        style={{alignSelf:'stretch', marginHorizontal: 24, flex:1}}
                        minimumValue={60}
                        maximumValue={240}
                        thumbImage={require('../../assets/play_button.png')}
                        onValueChange={this.onValueChange}>
                    </Slider>
                {/* </View>
                <View style={styles.rowContainer}> */}
                <TouchableOpacity onPress={this.state.playing ? this.handleStop : this.handlePlay}>
                    <Image source = {this.state.playing ? 
                            require('../../assets/stop_button.png') : require('../../assets/play_button.png')}
                            resizeMode={'contain'}
                            style={{margin:24}}
                        />
                </TouchableOpacity>
                </View>
            </View>
        )
    }    

    private changeBeatsPerMeasure = (itemValue : number, _itemIndex: number) => {
        this.setState(
            {
                beatsPerMeasure: itemValue,
                beatInMeasure: 1
            })
    }

    private onValueChange = (value:number) => {
        this.setState(
            {
                currentTempo: Math.round(value),
                currentMillisPerBeat: 60000/(Math.round(value))
            });
            clearInterval(this.interval)
            this.interval = setInterval(this.playBeat, this.state.currentMillisPerBeat); //0.5 seconds
    }

    private handlePlay = async () => {
        this.setState({playing: true});
        this.state.downBeat.play();
        this.setState({beatInMeasure: 2})
        clearInterval(this.interval)
        this.interval = setInterval(this.playBeat, this.state.currentMillisPerBeat); //0.5 seconds
    }

     playBeat = async () => {
        if (this.state.playing) { 
            if (this.state.beatInMeasure === 1 ) {
                this.state.downBeat.isPlaying() ? this.state.downBeat2.play() : this.state.downBeat.play()
                console.log("hit downbeat");
            } else {
                this.state.beat.isPlaying() ? this.state.beat2.play() : this.state.beat.play()
                console.log("hit beat");
            }
            if (this.state.beatInMeasure != this.state.beatsPerMeasure ) {
                this.setState({beatInMeasure: this.state.beatInMeasure+1})
            }
            else {
                this.setState({beatInMeasure: 1})
            }
        }
    }

    private handleStop = () => {
        this.setState({playing: false});
        clearInterval(this.interval)
    }
}

export default Metronome;

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'stretch',
        justifyContent: 'center',
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    columnContainer: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    buttonContainer: {
        flex:1,
        flexDirection: 'row',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 5
    },
    text: {
        flex:1,
        fontSize: 16,
        alignSelf: 'center', 
        fontFamily:'Fipps-Regular', 
        color: 'black', 
        textAlign: 'center'
    }
});