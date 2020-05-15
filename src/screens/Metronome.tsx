import React from 'react';
import { StyleSheet, Text, View, Slider, Button, Picker} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { Audio } from 'expo-av';


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
    downBeat: Audio.Sound
    beat: Audio.Sound
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
            downBeat: new Audio.Sound,
            beat: new Audio.Sound,
            beatsPerMeasure: 4,
            beatInMeasure: 1
        }
    }

    async componentDidMount() {
        const downbeatSound =  await Audio.Sound.createAsync(require('../../assets/sounds/downbeat.wav'), {}, null, true);
        this.setState({downBeat: downbeatSound.sound});
        const beatSound =  await Audio.Sound.createAsync(require('../../assets/sounds/offbeats.wav'), {isMuted: false, positionMillis: 0}, null, true);
        this.setState({beat: beatSound.sound});
    }

    componentWillUnmount() {
        clearInterval(this.interval)
        console.log("cleared interval from unmount");
    }

    public render() {
        return (
            <View style={styles.parentContainer}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 24, flex: 1, alignSelf: 'center'}}>Time Signature</Text>
                <Picker 
                    style={{ flex: 1, alignSelf: 'center'}}      
                    selectedValue={this.state.beatsPerMeasure}
                    onValueChange={this.changeBeatsPerMeasure}
                    mode='dropdown'
                    prompt='Time Signature'>
                        <Picker.Item label="3/4" value={3} />
                        <Picker.Item label="4/4" value={4} />
                        <Picker.Item label="5/4" value={5} />
                        <Picker.Item label="6/8" value={6} />
                </Picker>
                </View>
                <Text 
                    style={{fontSize: 24, textAlignVertical: 'center' }}>
                    {"Tempo: " + this.state.currentTempo}
                </Text>
                <Slider
                    style={{alignSelf:'stretch', margin: 24}}
                    minimumValue={60}
                    maximumValue={240}
                    onValueChange={this.onValueChange}>
                </Slider>
                {!this.state.playing &&<Button 
                    onPress={this.handlePlay} 
                    title='Play'>
                </Button>}
                {this.state.playing && <Button onPress={this.handleStop} 
                    title='Stop'>
                </Button>}
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
        this.state.downBeat.playFromPositionAsync(0);
        this.setState({beatInMeasure: 2})
        clearInterval(this.interval)
        this.interval = setInterval(this.playBeat, this.state.currentMillisPerBeat); //0.5 seconds
    }

     playBeat = async () => {
        if (this.state.playing) { 
            if (this.state.beatInMeasure === 1 ) {
                await this.state.downBeat.playFromPositionAsync(0);
                console.log("hit downbeat");
            } else {
                await this.state.beat.playFromPositionAsync(0);
                console.log("hit beat");
            }
            if (this.state.beatInMeasure != this.state.beatsPerMeasure ) {
                this.setState({beatInMeasure: this.state.beatInMeasure+1})
            }
            else {
                this.setState({beatInMeasure: 1})
            }
            console.log("METRONOME HIT at currentMilisPerBeat: " +this.state.currentMillisPerBeat + " and BPM: " + this.state.currentTempo)
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
        alignItems: 'center',
        justifyContent: 'center',
        flex:1 
    },
});