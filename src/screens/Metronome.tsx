import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ImageURISource, NativeSyntheticEvent, TextInputSubmitEditingEventData} from 'react-native';
import { Text, Input } from 'react-native-elements'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';


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
    beatInMeasure: number,
    
    sliderImg: ImageURISource,
    sliderValue: number,
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
            beatInMeasure: 1,
            sliderValue: 60,
            sliderImg: require('../../assets/sliderbutton.png'),
        }
    }

    async componentDidMount() {
        Sound.setActive(true);
        Sound.setCategory('Playback', true);
    }

    componentWillUnmount() {
        clearInterval(this.interval);

        this.state.downBeat.release();
        this.state.downBeat2.release();
        this.state.beat.release();
        this.state.beat2.release();
    }

    public render() {
        return (
            <View style={styles.parentContainer}>
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={() => this.updateBeatsPerMeasure(4)}>
                        <Image source = {this.state.beatsPerMeasure === 4 ? 
                            require('../../assets/44_pr.png') : require('../../assets/44_unpr.png')}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.updateBeatsPerMeasure(5)}>
                        <Image source = {this.state.beatsPerMeasure === 5 ? 
                            require('../../assets/54_pr.png') : require('../../assets/54_unpr.png')}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={() => this.updateBeatsPerMeasure(3)}>
                        <Image source = {this.state.beatsPerMeasure === 3 ? 
                            require('../../assets/34_pr.png') : require('../../assets/34_unpr.png')}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.updateBeatsPerMeasure(6)}>
                        <Image source = {this.state.beatsPerMeasure === 6 ? 
                            require('../../assets/68_pr.png') : require('../../assets/68_unpr.png')}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.columnContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={[styles.text, {alignSelf: 'center', flex:0, bottom: 10}]}>
                            Tempo:
                        </Text>
                        <Input 
                            inputStyle={[styles.text, {paddingBottom:0, }]}
                            containerStyle={{width:100}}
                            value={this.state.currentTempo ? this.state.currentTempo.toString() : ''}
                            keyboardType='numeric'
                            returnKeyType='done'
                            onChangeText={this.handleManualTempoChange}
                            onSubmitEditing={this.handleManualTempoChangeSubmit}>
                        </Input>
                    </View>
                    <Slider
                        style={{alignSelf:'stretch', marginHorizontal: 24, flex:1}}
                        minimumValue={60}
                        maximumValue={240}
                        thumbImage={this.state.sliderImg}
                        minimumTrackTintColor='#CC7F72'
                        maximumTrackTintColor='#F79A2F'
                        value={this.state.sliderValue}
                        onValueChange={this.onValueChange}>
                    </Slider>
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

    private updateBeatsPerMeasure = async (beats : number)  => {
        await this.setState({beatsPerMeasure: beats});
        this.setInterval(this.state.currentMillisPerBeat);
    }

    private handleManualTempoChange = (text:string) => {
        let newTempo : number;
        let parsedString = Number.parseInt(text);
        this.setState({currentTempo: parsedString});
    }

    private handleManualTempoChangeSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        let parsedString = this.state.currentTempo;
        let millis: number;
        if (parsedString < 60 || !parsedString) {
            this.setState({
                currentTempo: 60,
                currentMillisPerBeat: 1000,
                sliderValue: 60
            })
            millis = 1000;
        }
        else if (parsedString > 240) {
            this.setState({
                currentTempo: 240,
                currentMillisPerBeat: 250,
                sliderValue: 240
            })
            millis = 250;
        }
        else {
            this.setState(
                {
                    currentTempo: Math.round(parsedString),
                    currentMillisPerBeat: 60000/(Math.round(parsedString)),
                    sliderValue: parsedString
                });
                millis = 60000/(Math.round(parsedString));
        }
        this.setInterval(millis);
    }

    private onValueChange = (value:number) => {
        this.setState({sliderValue: value})
        let millis : number = 60000/(Math.round(value));
        this.setState(
            {
                currentTempo: Math.round(value),
                currentMillisPerBeat: millis,
            });
        this.setInterval(millis);
    }

    private handlePlay = async () => {
        this.setState({playing: true});
        this.state.downBeat.play();
        this.setState({beatInMeasure: 2})
        this.setInterval(this.state.currentMillisPerBeat);
    }

    private setInterval = (millis: number) => {
        clearInterval(this.interval)
        let adjustedMillis : number = this.state.beatsPerMeasure===6 ? millis/2 : millis;
        this.interval = setInterval(this.playBeat, adjustedMillis); //0.5 seconds
    }

     playBeat = async () => {
        let effectiveBeatsPerMeasure = this.state.beatsPerMeasure === 6 ? 3: this.state.beatsPerMeasure;
        if (this.state.playing) { 
            if (this.state.beatInMeasure === 1 ) {
                this.state.downBeat.isPlaying() ? this.state.downBeat2.play() : this.state.downBeat.play()
            } else {
                this.state.beat.isPlaying() ? this.state.beat2.play() : this.state.beat.play()
            }
            if (this.state.beatInMeasure != effectiveBeatsPerMeasure ) {
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