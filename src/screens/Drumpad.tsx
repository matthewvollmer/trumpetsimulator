import React from 'react';
import { StyleSheet, View, Image, ImageSourcePropType, Slider} from 'react-native';
import { Button, Text} from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
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

    sequenceImg: ImageSourcePropType,
    seqSelected?: number;
    sequenceValues: number[]

    currentTempo: number,
    currentMillisPerBeat: number,

    playing: boolean
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

             sequenceImg: require('../../assets/sequence.png'),
             sequenceValues: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],

            currentTempo: 60,
            currentMillisPerBeat: 250,
            playing: false
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
                    <View style= {[styles.buttonContainer, {backgroundColor: 'lightblue'}]}
                    onTouchStart={this.handleHat}>
                        <Text>Hat</Text>
                    </View>
                    <View style= {[styles.buttonContainer, {backgroundColor: 'lightcoral'}]}
                        onTouchStart={this.handleSnare}>
                        <Text>Snare</Text>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style= {[styles.buttonContainer, {backgroundColor: 'lightgreen'}]}
                        onTouchStart={this.handleKick}>
                            <Text>Kick</Text>
                    </View>
                    <View style= {[styles.buttonContainer, {backgroundColor: 'lightyellow'}]}
                        onTouchStart={this.handleNext}>
                            <Text>Next</Text>
                    </View>
                </View>
                <View style={styles.columnContainer}>
                    <View style= {styles.buttonContainer}>
                        <Button buttonStyle={styles.buttonStyle} title="Record" onPress={() => this.setState({seqSelected: 1})}></Button>
                        <Button buttonStyle={styles.buttonStyle}  title="Deselect" onPress={() => this.setState({seqSelected: undefined})}></Button>
                        <Button buttonStyle={styles.buttonStyle}  title="Reset" onPress={this.resetSequence}></Button>
                        {this.state.playing ? 
                            <Button buttonStyle={styles.buttonStyle}  title="Stop" onPress={this.handleStop}></Button> :
                            <Button buttonStyle={styles.buttonStyle}  title="Play" onPress={this.handlePlay}></Button>
                            }
                    </View>
                    <View style= {styles.sequenceRowContainer}>
                        <Slider
                            style={{alignSelf:'stretch', flex:1}}
                            minimumValue={60}
                            maximumValue={240}
                            onValueChange={this.onValueChange}>
                        </Slider>
                        <Text>{"Tempo: " + this.state.currentTempo}</Text>
                    </View>
                    <View style= {styles.sequenceRowContainer}>
                        {/* 1 */}
                        <Text>1</Text>
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(1), opacity: this.getHighlighedOpacity(1)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(2), opacity: this.getHighlighedOpacity(2)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(3), opacity: this.getHighlighedOpacity(3)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(4), opacity: this.getHighlighedOpacity(4)}]}
                            source={this.state.sequenceImg}
                        />

                        {/* 2 */}
                        <Text>2</Text>
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(5), opacity: this.getHighlighedOpacity(5)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(6), opacity: this.getHighlighedOpacity(6)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(7), opacity: this.getHighlighedOpacity(7)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(8), opacity: this.getHighlighedOpacity(8)}]}
                            source={this.state.sequenceImg}
                        />

                        {/* 3 */}
                        <Text>3</Text>
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(9), opacity: this.getHighlighedOpacity(9)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(10), opacity: this.getHighlighedOpacity(10)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(11), opacity: this.getHighlighedOpacity(11)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(12), opacity: this.getHighlighedOpacity(12)}]}
                            source={this.state.sequenceImg}
                        />

                        {/* 4 */}
                        <Text>4</Text>
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(13), opacity: this.getHighlighedOpacity(13)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(14), opacity: this.getHighlighedOpacity(14)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(15), opacity: this.getHighlighedOpacity(15)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(16), opacity: this.getHighlighedOpacity(16)}]}
                            source={this.state.sequenceImg}
                        />
                    </View>
                    <View style= {styles.sequenceRowContainer}>
                        {/* 1 */}
                        <Text>1</Text>
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(17), opacity: this.getHighlighedOpacity(17)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(18), opacity: this.getHighlighedOpacity(18)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(19), opacity: this.getHighlighedOpacity(19)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(20), opacity: this.getHighlighedOpacity(20)}]}
                            source={this.state.sequenceImg}
                        />

                        {/* 2 */}
                        <Text>2</Text>
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(21), opacity: this.getHighlighedOpacity(21)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(22), opacity: this.getHighlighedOpacity(22)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(23), opacity: this.getHighlighedOpacity(23)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(24), opacity: this.getHighlighedOpacity(24)}]}
                            source={this.state.sequenceImg}
                        />

                        {/* 3 */}
                        <Text>3</Text>
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(25), opacity: this.getHighlighedOpacity(25)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(26), opacity: this.getHighlighedOpacity(26)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(27), opacity: this.getHighlighedOpacity(27)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(28), opacity: this.getHighlighedOpacity(28)}]}
                            source={this.state.sequenceImg}
                        />

                        {/* 4 */}
                        <Text>4</Text>
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(29), opacity: this.getHighlighedOpacity(29)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(30), opacity: this.getHighlighedOpacity(30)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(31), opacity: this.getHighlighedOpacity(31)}]}
                            source={this.state.sequenceImg}
                        />
                        <Image
                            style={[styles.seqImgStyle, {tintColor: this.getTintColor(32), opacity: this.getHighlighedOpacity(32)}]}
                            source={this.state.sequenceImg}
                        />
                    </View>
                </View>
            </View>
        )
    }    

    private getTintColor = (index: number): string => {
        switch (this.state.sequenceValues[index]) {
            case 1:
                return 'lightblue'
            case 2:
                return 'lightcoral'
            case 3:
                return 'lightgreen'
            default:
                return 'dimgray'
        }
    }

    private getHighlighedOpacity = (index: number): number => {
        return index === this.state.seqSelected ? 0.75 : 1
    }

    private handleKick = () => {
        this.state.kick.isPlaying() ? this.state.kick2.play() : this.state.kick.play()
        if (this.state.seqSelected) {
            this.state.sequenceValues[this.state.seqSelected] = 3
            this.setState({seqSelected: this.state.seqSelected+1})
        }
    }

    private handleSnare = () => {
        this.state.snare.isPlaying() ? this.state.snare2.play() : this.state.snare.play()
        if (this.state.seqSelected) {
            this.state.sequenceValues[this.state.seqSelected] = 2
            this.setState({seqSelected: this.state.seqSelected+1})
        }
    }

    private handleHat = () => {
        this.state.hat.isPlaying() ? this.state.hat2.play() : this.state.hat.play()
        if (this.state.seqSelected) {
            this.state.sequenceValues[this.state.seqSelected] = 1
            this.setState({seqSelected: this.state.seqSelected+1})
        }
    }

    private handleNext = () => {
        if (this.state.seqSelected) {
            this.setState({seqSelected: this.state.seqSelected+1})
        }
    }

    private resetSequence = () => {
        this.setState({
            sequenceValues: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            playing: false,
            seqSelected : undefined
        })
    }

    private handlePlay = () => {
        clearInterval(this.interval)
        this.setState(
            {
                playing: true,
                seqSelected : 1
            }
        )
        this.interval = setInterval(this.playBeat, this.state.currentMillisPerBeat);
    }

    private handleStop = () => {
        console.debug("stopping");
        this.setState(
            {
                playing: false,
                seqSelected : undefined
            }
        )
        clearInterval(this.interval)
    }

    private onValueChange = (value:number) => {
        this.setState(
            {
                currentTempo: Math.round(value),
                currentMillisPerBeat: 15000/(Math.round(value))
            });
    }

    playBeat = async () => {
        if (this.state.playing && this.state.seqSelected) { 
            switch(this.state.sequenceValues[this.state.seqSelected]) {
                case 1: 
                    this.state.hat.isPlaying() ? this.state.hat2.play() : this.state.hat.play()
                    break;
                case 2: 
                    this.state.snare.isPlaying() ? this.state.snare2.play() : this.state.snare.play()
                    break;
                case 3: 
                    this.state.kick.isPlaying() ? this.state.kick2.play() : this.state.kick.play()
                    break;
                default: 
                    break;
            }
            this.setState({seqSelected: this.state.seqSelected===32? 1 : this.state.seqSelected+1})
        }
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
    columnContainer: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex:1,
        flexDirection: 'row',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 5
    },
    sequenceRowContainer: {
        flex:1,
        flexDirection: 'row',
        width: '100%',
        //height: '100%',
        backgroundColor: 'white',
        //borderRadius: 20,
        //margin: 5
    },
    seqImgStyle: {
        flex:1,
    },
    buttonStyle: {
        flex:1,
        margin: 1,
        borderRadius: 20
    }
});