import React from 'react';
import { StyleSheet, View, Text, StatusBar, ImageBackground, ImageSourcePropType} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import TunerComponent from './TunerComponent';
import Meter from './Meter';
import Note from './Note';
import { Audio } from 'expo-av';
import { Recording } from 'react-native-recording';
import { MicStream } from 'react-native-microphone-stream'
import PitchFinder from "pitchfinder";
//import AudioRecord from 'react-native-audio-record';
//import { Buffer }  from 'buffer'


export interface NoteObject { 
    name: string, 
    octave: number, 
    frequency: number,
    value?: number,
    cents: number
}

type TunerRouteProp = RouteProp<RootStackParamList, 'Tuner'>;

type TunerNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Tuner'
>;

type Props = {
    route: TunerRouteProp;
    navigation: TunerNavigationProp;
  };

interface State{ 
    note: NoteObject,
    bgImage: ImageSourcePropType,
}

class Tuner extends React.Component<Props, State> {
    interval: number | undefined; 
    middleA : number = 440;
    semitone : number = 69;
    _lastNoteName: any;
    Recording = require('react-native-recording').default;

    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            note: {
                name: 'A',
                octave: 1, 
                frequency: 440,
                cents: 0
            },
            bgImage: require('../../assets/tuner_backdrop.png'),
        }
    }

    _update(note: NoteObject) {
        this.setState({ note });
      }

    async componentDidMount() {
        const audioPermResponse = await Audio.getPermissionsAsync();
        if (!audioPermResponse.granted) {
            await Audio.requestPermissionsAsync();
        }
        const pitchFinder = PitchFinder.YIN({
            sampleRate: 22050
          });
        const onNoteDetected = (note:any) => {
            if (this._lastNoteName === note.name) {
              this._update(note);
            } else {
              this._lastNoteName = note.name;
            }
          };
        const tuner =  new TunerComponent({});
        this.Recording.init({
            sampleRate: 22050,
            bufferSize: 4096,
            bitsPerChannel: 16,
            channelsPerFrame: 1,
        });
        this.Recording.addRecordingEventListener((data: Float32Array) => {
            const frequency = pitchFinder(data);
            if (frequency && onNoteDetected) {
                const note = this.getNote(frequency);
                onNoteDetected({
                name: tuner.noteStrings[note % 12],
                value: note,
                cents: this.getCents(frequency, note),
                octave: Math.round(note / 12) - 1,
                frequency: frequency
                });
            }
        });
        this.Recording.start();
    }

    getNote(frequency: number) {
        const note = 12 * (Math.log(frequency / this.middleA) / Math.log(2));
        const toReturn = Math.round(note) + this.semitone;
        return toReturn;
      }

    getStandardFrequency(note: number) {
        return this.middleA * Math.pow(2, (note - this.semitone) / 12);
      }

    getCents(frequency: number, note: number) {
        const centsUnrounded : number =
          (1200 * Math.log(frequency / this.getStandardFrequency(note))) /
            Math.log(2);
        const cents : number = Math.floor(centsUnrounded);
        const currentNote = this.state.note;
        currentNote.cents = centsUnrounded;
        this.setState({note:currentNote});
        return cents;
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    public render() {
        return (
          <View style={styles.body}>
            <ImageBackground source={this.state.bgImage} style={styles.bgImage} resizeMode='cover'>
              <StatusBar backgroundColor="#000" translucent />
              <Meter cents={this.state.note.cents} />
              <Note note={this.state.note}/>
              <Text style={styles.frequency}>
                {this.state.note.frequency.toFixed(1)} Hz
              </Text>
            </ImageBackground>
          </View>
        )
    }
}

export default Tuner;

const styles = StyleSheet.create({
    body: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center"
    },
    frequency: {
      fontSize: 16,
      fontFamily:'Fipps-Regular',
      color: "#37474f",
      marginBottom: 180
    },
    bgImage: {
      flex: 1,
      resizeMode: 'stretch',
      justifyContent: "space-between",
      alignItems: "center"
    },
});