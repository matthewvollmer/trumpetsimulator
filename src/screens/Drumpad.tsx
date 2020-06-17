import React from 'react';
import { StyleSheet, View, Image, ImageSourcePropType, Dimensions, ImageURISource, NativeSyntheticEvent, TextInputSubmitEditingEventData} from 'react-native';
import { Button, Text, Input} from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import Sound from 'react-native-sound';
import { TouchableOpacity} from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';


type DrumpadRouteProp = RouteProp<RootStackParamList, 'Drumpad'>;

type DrumpadNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Drumpad'
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

    playing: boolean,

    kickimg: ImageSourcePropType,
    snareimg: ImageSourcePropType,
    hatimg: ImageSourcePropType,
    nextimg: ImageSourcePropType,

    recordimg: ImageSourcePropType,
    deselectimg: ImageSourcePropType,
    resetimg: ImageSourcePropType,
    playimg: ImageSourcePropType,
    stopimg: ImageSourcePropType,

    sliderImg: ImageURISource,

    screenWidth: number,
    sliderValue: number,
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
            playing: false,

            kickimg: require('../../assets/KICK.png'),
            snareimg: require('../../assets/SNARE.png'),
            hatimg: require('../../assets/HAT.png'),
            nextimg: require('../../assets/NEXT.png'),

            recordimg: require('../../assets/record_button.png'),
            deselectimg: require('../../assets/deselect_button.png'),
            resetimg: require('../../assets/reset_button.png'),
            playimg: require('../../assets/play_button_small.png'),
            stopimg: require('../../assets/stop_button_small.png'),

            sliderImg: require('../../assets/sliderbutton.png'),

            screenWidth: Dimensions.get('window').width,
            sliderValue: 60
        }
    }
    async componentDidMount() {
        Sound.setActive(true);
        Sound.setCategory('Playback', true);
    }

    public componentWillUnmount() {
        this.state.hat.release();
        this.state.hat2.release();
        this.state.kick.release();
        this.state.kick2.release();
        this.state.snare.release();
        this.state.snare2.release();
        this.handleStop();
    }

    public render() {
        return (
            <View style={styles.parentContainer}>
                <View style={[styles.rowContainer, {paddingVertical: 12}]}>
                    <View style={styles.buttonContainerSparse}
                        onTouchStart={this.handleHat}>
                            <TouchableOpacity >
                                <Image
                                    resizeMode='stretch'
                                    source={this.state.hatimg}
                                    style= {[styles.instrButtonStyle, {maxWidth: this.state.screenWidth*.45}]} 
                                />
                            </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainerSparse}
                        onTouchStart={this.handleSnare}>
                            <TouchableOpacity>
                                <Image
                                    resizeMode='stretch'
                                    source={this.state.snareimg}
                                    style= {[styles.instrButtonStyle, {maxWidth: this.state.screenWidth*.45}]}
                                />
                            </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.rowContainer, {paddingVertical: 12}]}>
                    <View style={styles.buttonContainerSparse}
                        onTouchStart={this.handleKick}>
                            <TouchableOpacity >
                                <Image
                                    resizeMode='stretch'
                                    source={this.state.kickimg}
                                    style= {[styles.instrButtonStyle, {maxWidth: this.state.screenWidth*.45}]}
                                />
                            </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainerSparse}
                        onTouchStart={this.handleNext}>
                            <TouchableOpacity>
                                <Image
                                    resizeMode='stretch'
                                    source={this.state.nextimg}
                                    style= {[styles.instrButtonStyle, {maxWidth: this.state.screenWidth*.45}]}
                                />
                            </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.columnContainer}>
                    <View style= {[styles.buttonContainer, {justifyContent: 'center', width: '100%'}]}>
                        <TouchableOpacity style={[styles.seqImgStyle]}
                            onPress={() => this.setState({seqSelected: 1})}>
                                <Image 
                                    resizeMode='contain' 
                                    source={this.state.recordimg} 
                                    style={styles.buttonStyle}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.seqImgStyle}
                            onPress={this.resetSequence}>
                                <Image 
                                    resizeMode='contain' 
                                    source={this.state.resetimg}
                                    style={styles.buttonStyle}
                                />
                        </TouchableOpacity>
                        {this.state.playing ? 
                            <TouchableOpacity style={styles.seqImgStyle}
                                onPress={this.handleStop}>
                                    <Image 
                                        resizeMode='contain' 
                                        source={this.state.stopimg}
                                        style={styles.buttonStyle}
                                    />
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.seqImgStyle}
                                onPress={this.handlePlay}>
                                    <Image 
                                        resizeMode='contain' 
                                        source={this.state.playimg}
                                        style={styles.buttonStyle}
                                    />
                            </TouchableOpacity>
                            }
                    </View>
                    <View style= {styles.sequenceRowContainer}>
                        <Slider
                            style={styles.slider}
                            minimumValue={60}
                            maximumValue={240}
                            onValueChange={this.onValueChange}
                            value={this.state.sliderValue}
                            thumbImage={this.state.sliderImg}
                            minimumTrackTintColor='#CC7F72'
                            maximumTrackTintColor='#F79A2F'
                            >
                        </Slider>
                        {/* <Text style={styles.text}>{"Tempo: " + this.state.currentTempo}</Text> */}
                        <Text style={[styles.text, {alignSelf: 'center', flex:0, bottom: 10,paddingRight: 0}]}>
                            Tempo:
                        </Text>
                        <Input 
                            inputStyle={[styles.text, {paddingBottom:0, textAlign: 'center', paddingRight:0}]}
                            containerStyle={{width:80, bottom: 12}}
                            value={this.state.currentTempo ? this.state.currentTempo.toString() : ''}
                            keyboardType='numeric'
                            returnKeyType='done'
                            onChangeText={this.handleManualTempoChange}
                            onSubmitEditing={this.handleManualTempoChangeSubmit}>
                        </Input>
                    </View>
                    <View style= {styles.sequenceRowContainer}>
                        {this.buildSeqBlocks(1)}
                    </View>
                    <View style= {styles.sequenceRowContainer}>
                        {this.buildSeqBlocks(5)}
                    </View>
                </View>
            </View>
        )
    }    

    private handleManualTempoChange = (text:string) => {
        let newTempo : number;
        let parsedString = Number.parseInt(text);
        this.setState({currentTempo: parsedString});
    }

    private handleManualTempoChangeSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        let parsedString = this.state.currentTempo;
        if (parsedString < 60 || !parsedString) {
            this.setState({
                currentTempo: 60,
                currentMillisPerBeat: 1000,
                sliderValue: 60
            })
        }
        else if (parsedString > 240) {
            this.setState({
                currentTempo: 240,
                currentMillisPerBeat: 250,
                sliderValue: 240
            })
        }
        else {
            this.setState(
                {
                    currentTempo: Math.round(parsedString),
                    currentMillisPerBeat: 60000/(Math.round(parsedString)),
                    sliderValue: parsedString
                });
        }
        clearInterval(this.interval)
        this.interval = setInterval(this.playBeat, this.state.currentMillisPerBeat); //0.5 seconds
    }

    private buildSeqBlocks = (barNumber: number) => {
        let seqBlocks = []; 
        for(let j=barNumber;j<barNumber+4;j++){
            seqBlocks.push(<Text style={styles.barNumberText}>{j}</Text>)
            for (let i=(j-1)*4+1; i<(j-1)*4+5; i++) {
                seqBlocks.push(
                    this.seqBlock(i)
                )
            }
        }    
        return seqBlocks;
    }

    private seqBlock = (idx: number) => {
        return (
            <Image
                style={[styles.seqImgStyle, {tintColor: this.getTintColor(idx), opacity: this.getHighlighedOpacity(idx)}]}
                source={this.state.sequenceImg}
            />
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
        alignItems: 'flex-start',
        alignContent: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex:1,
        flexDirection: 'row',
        height: '100%',
        borderRadius: 20,
        margin: 5
    },
    buttonContainerSparse: {
        flex:1,
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent: 'center'
    },
    sequenceRowContainer: {
        flex:1,
        flexDirection: 'row',
        width: '100%',
    },
    seqImgStyle: {
        flex:1,
    },
    instrButtonStyle: {
        width: '100%',
        height: undefined, 
        aspectRatio: 3/4,
    },
    buttonStyle: {
        marginHorizontal: 4
    },
    text: {
        fontSize: 12,
        alignSelf: 'center', 
        fontFamily:'Fipps-Regular', 
        color: 'black', 
        textAlign: 'center',
        paddingRight:12
    },
    barNumberText: {
        fontSize: 12,
        fontFamily:'Fipps-Regular', 
        color: 'black',
        alignItems:  'center',
        bottom: 4
    },
    slider: {
        alignSelf:'stretch', 
        flex:1
    }
});