import React from 'react';
import { StyleSheet, Text, View, GestureResponderEvent ,Dimensions, Image, ImageSourcePropType, TouchableOpacity, TouchableNativeFeedback, PanResponder } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import Modal from 'react-native-modal';


type TrumpetSliderRouteProp = RouteProp<RootStackParamList, 'Main'>;

type TrumpetSliderNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TrumpetSlider'
>;

type Props = {
    route: TrumpetSliderRouteProp;
    navigation: TrumpetSliderNavigationProp;
  };

interface State{ 
    sliderValue: number;
    sliderPressed?:  boolean
    currentPitch: number;
    previouslyActivePitch: number | undefined;
    first: boolean;
    second: boolean;
    third: boolean;
    currentPitchDebugtext: string
    screenHeight: number
    screenWidth: number
    sliderHeight: number

    firstValveUnpressed: ImageSourcePropType
    firstValvePressed: ImageSourcePropType
    secondValveUnpressed: ImageSourcePropType
    secondValvePressed: ImageSourcePropType
    thirdValveUnpressed: ImageSourcePropType
    thirdValvePressed: ImageSourcePropType
    tube : ImageSourcePropType
    settings: ImageSourcePropType

    gb0: Sound,
    g0: Sound,
    ab0: Sound, 
    a0: Sound,
    bb0: Sound,
    b0: Sound, 

    c1: Sound,
    db1: Sound,
    d1: Sound, 
    eb1: Sound,
    e1: Sound,
    f1: Sound, 
    gb1: Sound,
    g1: Sound,
    ab1: Sound, 
    a1: Sound,
    bb1: Sound,
    b1: Sound, 

    c2: Sound,
    db2: Sound,
    d2: Sound, 
    eb2: Sound,
    e2: Sound,
    f2: Sound, 
    gb2: Sound,
    g2: Sound,
    ab2: Sound, 
    a2: Sound,
    bb2: Sound,
    b2: Sound, 

    c3: Sound,

    soundList: Sound[]

    showSettings: boolean
    concert: ImageSourcePropType
    concertPr: ImageSourcePropType
    Bb: ImageSourcePropType
    BbPr: ImageSourcePropType

    concertPitch: boolean;

    panResponder?: any;
}

class TrumpetSlider extends React.Component<Props, State> { 
    currentPitch = 48;
    previouslyActivePitch : number | undefined = undefined;
    sliderPressed : boolean | undefined = false;
    first : boolean = false;
    second : boolean = false;
    third : boolean = false;
    sliderValue: number = 0;
    previousSliderValue: number = 0;
    currentDirection: number = 0;
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            sliderValue : 0,
            currentPitchDebugtext: '',
            currentPitch: 48,
            previouslyActivePitch: undefined,
            first: false,
            second: false,
            third: false,
            screenHeight: Math.round(Dimensions.get('window').height),
            screenWidth: Math.round(Dimensions.get('window').width),
            sliderHeight: 0,
            firstValveUnpressed: require('../../assets/tpt_valve1_unpressed_rot.png'),
            firstValvePressed: require('../../assets/tpt_valve1_pressed_rot.png'),
            secondValveUnpressed: require('../../assets/tpt_valve2_unpressed_rot.png'),
            secondValvePressed: require('../../assets/tpt_valve2_pressed_rot.png'),
            thirdValveUnpressed: require('../../assets/tpt_valve3_unpressed_rot.png'),
            thirdValvePressed: require('../../assets/tpt_valve3_pressed_rot.png'),
            tube: require('../../assets/tpt_tube.png'),
            settings: require('../../assets/settings_icon.png'),

            gb0 : new Sound('gb0.mp3', Sound.MAIN_BUNDLE, (error) => {error &&  console.log(error)}),
            g0 : new Sound('g0.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
            ab0 : new Sound('ab0.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
            a0 : new Sound('a0.mp3', Sound.MAIN_BUNDLE, (error) => {error &&  console.log(error)}),
            bb0 : new Sound('bb0.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
            b0 : new Sound('b0.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),

            c1 : new Sound('c1.mp3', Sound.MAIN_BUNDLE, (error) => {error &&  console.log(error)}),
            db1 : new Sound('db1.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
            d1 : new Sound('d1.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
            eb1 : new Sound('eb1.mp3', Sound.MAIN_BUNDLE, (error) => {error &&  console.log(error)}),
            e1 : new Sound('e1.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
            f1 : new Sound('f1.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
            gb1 : new Sound('gb1.mp3', Sound.MAIN_BUNDLE, (error) => {error &&  console.log(error)}),
            g1 : new Sound('g1.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
            ab1 : new Sound('ab1.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
            a1 : new Sound('a1.mp3', Sound.MAIN_BUNDLE, (error) => {error &&  console.log(error)}),
            bb1 : new Sound('bb1.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
            b1 : new Sound('b1.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),

            c2 : new Sound('c2.mp3', Sound.MAIN_BUNDLE, (error) => {error &&  console.log(error)}),
            db2 : new Sound('db2.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
            d2 : new Sound('d2.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
            eb2 : new Sound('eb2.mp3', Sound.MAIN_BUNDLE, (error) => {error &&  console.log(error)}),
            e2 : new Sound('e2.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
            f2 : new Sound('f2.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
            gb2 : new Sound('gb2.mp3', Sound.MAIN_BUNDLE, (error) => {error &&  console.log(error)}),
            g2 : new Sound('g2.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
            ab2 : new Sound('ab2.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
            a2 : new Sound('a2.mp3', Sound.MAIN_BUNDLE, (error) => {error &&  console.log(error)}),
            bb2 : new Sound('bb2.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),
            b2 : new Sound('b2.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),

            c3: new Sound('c3.mp3', Sound.MAIN_BUNDLE, (error) => {error && console.log(error)}),

            soundList : [],
            showSettings: false,

            concert: require('../../assets/concert_pitch.png'),
            concertPr: require('../../assets/concert_pitch_pr.png'),
            Bb: require('../../assets/Bb.png'),
            BbPr: require('../../assets/Bb_pr.png'),

            concertPitch: false,
        }
    }

    public componentDidMount() {
        Sound.setActive(true);
        Sound.setCategory('Playback', true);
        this.setState({soundList: [this.state.gb0, this.state.g0, this.state.ab0, this.state.a0, this.state.bb0, this.state.b0, 
                
            this.state.c1, this.state.db1, this.state.d1, this.state.eb1, this.state.e1, this.state.f1, 
            this.state.gb1, this.state.g1, this.state.ab1, this.state.a1, this.state.bb1, this.state.b1,

            this.state.c2, this.state.db2, this.state.d2, this.state.eb2, this.state.e2, this.state.f2, 
            this.state.gb2, this.state.g2, this.state.ab2, this.state.a2, this.state.bb2, this.state.b2, this.state.c3
        ]})
    }

    public componentWillUnmount() {
        this.unloadAll();
    }


    public render() {
        return (
            <View style={styles.parentContainer}>
                <Modal
                        isVisible={!!this.state.showSettings}
                        onBackdropPress={() => this.setState({showSettings: false})}
                        onBackButtonPress={() => this.setState({showSettings: false})}
                    >
                    <View 
                        style={{height: '50%', width: '90%', borderRadius: 12, borderWidth: 4, backgroundColor: 'white', 
                                  alignSelf: 'center', justifyContent: 'space-evenly', alignItems: 'center'}}
                        >
                        <Text style={styles.text}>Pitch: </Text>
                        <TouchableNativeFeedback
                            style={{zIndex: 100}}
                            onPressIn={this.setConcert}>
                            <Image
                                source= {this.state.concertPitch ? this.state.concertPr : this.state.concert}
                                resizeMode='contain'
                            />
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPressIn={this.unsetConsert}>
                            <Image
                                source= {this.state.concertPitch ? this.state.Bb : this.state.BbPr}
                                resizeMode='contain'
                            />
                        </TouchableNativeFeedback>
                    </View>
                </Modal>
                <View style={{backgroundColor:'white', justifyContent:'space-between', height:'100%', top: 24,}}>
                    <Text style={[styles.text, {flex:1.5}]}>{this.state.concertPitch ? "A#-" : "C-"}</Text>
                    <Text style={[styles.text, {flex:1.5}]}>{this.state.concertPitch ? "G#-" : "A#-"}</Text>
                    <Text style={[styles.text, {flex:1.7}]}>{this.state.concertPitch ? "F-" : "G-"}</Text>
                    <Text style={[styles.text, {flex:2}]}>{this.state.concertPitch ? "D-" : "E-"}</Text>
                    <Text style={[styles.text, {flex:2}]}>{this.state.concertPitch ? "A#-" : "C-"}</Text>
                    <Text style={[styles.text, {flex:2}]}>{this.state.concertPitch ? "F-" : "G-"}</Text>
                    <Text style={[styles.text, {flex:3}]}>{this.state.concertPitch ? "A#-" : "C-"}</Text>
                </View>
                <View style={[styles.sliderContainer, {width:this.state.screenWidth/2}]}
                    onStartShouldSetResponder={(ev) => {
                        return true
                    }}
                    onMoveShouldSetResponder={(ev) => {
                        return true
                    }}
                    onResponderGrant= {(ev) => this.onTouchEvent(ev)}
                    onResponderMove = {(ev) => this.onTouchEvent(ev)}
                    onTouchEnd = {this.handleTouchEnd}
                    onResponderTerminationRequest={(ev) => true} 
                    hitSlop={{right:25}}
                >   
                    <Image source={require('../../assets/quickpoof_big.png')}
                        style= {[this.sliderPressed===true && { height: 125},
                            {alignSelf: 'flex-start', position: 'absolute', bottom: this.state.sliderHeight-12, alignItems: 'flex-end'}]}
                    />
                </View>
                <Image 
                    resizeMode='stretch'
                    source={this.state.tube}
                    style={{position:'absolute', left:this.state.screenWidth/2 - 50, height:'100%'}}
                />
                <View style={[styles.container, {width:this.state.screenWidth/2}]}>
                    {this.sliderPressed &&  
                        <View style={{position:'absolute', top:0}}>
                            <Text style={styles.text}>{"Pitch:"}</Text>
                            <Text style={[styles.text, {fontSize:16}]}>{this.state.currentPitchDebugtext}</Text>
                        </View>
                    }
                    <TouchableWithoutFeedback 
                        delayPressIn={0}
                        delayPressOut={0}
                        style={styles.valveButton}
                        onPressIn={this.handleThirdValvePress} 
                        onPressOut={this.handleThirdValveUnpress} 
                        >
                            <Image 
                                source={this.third? this.state.thirdValvePressed : this.state.thirdValveUnpressed}
                                style={styles.valves}
                            />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback 
                        delayPressIn={0}
                        delayPressOut={0}
                        style={styles.valveButton}
                        onPressIn={this.handleSecondValvePress} 
                        onPressOut={this.handleSecondValveUnpress}
                        >
                            <Image 
                                source={this.second? this.state.secondValvePressed : this.state.secondValveUnpressed}
                                style={styles.valves}  
                            />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback 
                        style={styles.valveButton}
                        onPressIn={this.handleFirstValvePress} 
                        delayPressIn={0}
                        delayPressOut={0}
                        onPressOut={this.handleFirstValveUnPress}
                        pressRetentionOffset={{left:25}}
                        >
                            <Image 
                                style={styles.valves}
                                source={this.first? this.state.firstValvePressed : this.state.firstValveUnpressed}
                            />
                    </TouchableWithoutFeedback>
                    <View style={{position:'absolute', bottom: 0, right:0}}> 
                        <TouchableOpacity style={{borderRadius:4, borderWidth: 4, borderColor: 'dimgray'}}
                            onPress={() => this.setState({showSettings: true})}>
                            <Image
                                resizeMode='contain'
                                source={this.state.settings}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }    

    private unloadAll() {
        this.state.soundList.forEach(element => element.release());
    }
    
    private setConcert = () => {
        console.log("setting concert pitch")
        this.setState({concertPitch: true});
    }

    private unsetConsert = () => {
        console.log("unsetting concert pitch")
        this.setState({concertPitch: false});
    }

    private calculateSliderValue = (locationY: number) => {
        let newSliderValue = (this.state.screenHeight - locationY- 110)/2.1;
        this.sliderValue = newSliderValue;
        if (newSliderValue - this.previousSliderValue > 3) this.currentDirection = 1;
        else if (newSliderValue - this.previousSliderValue < 3) this.currentDirection = -1;
        else this.currentDirection = 0;
        let sliderHeight = this.state.screenHeight-locationY;
        this.setState({sliderHeight})
    }

    private onTouchEvent= (ev: GestureResponderEvent) => {
        console.log("changed touches: "+ ev.nativeEvent.changedTouches.length);
        if (ev.nativeEvent.pageX < this.state.screenWidth/2) {
            if (!this.sliderPressed) this.sliderPressed = true;
            this.calculateSliderValue(ev.nativeEvent.pageY)
            this.playCurrentPitch()
        }
    }

    private handleTouchEnd = (ev: GestureResponderEvent) => {
        if (ev.nativeEvent.pageX < this.state.screenWidth/2) {
            this.sliderPressed = false;
            this.setState({sliderPressed: false});
            this.stopPreviouslyActivePitch()
        }
    }

    private handleFirstValvePress = (ev : GestureResponderEvent) => {
        // if (ev.nativeEvent.locationX > this.state.screenWidth/2) {
            console.log('ev stuff' + ev)
            this.first = true;
            this.setState({first: true})
            this.playCurrentPitch()
        // }
    }

    private handleFirstValveUnPress = (ev : GestureResponderEvent) => {
        // if (ev.nativeEvent.pageX > this.state.screenWidth/2) {
            this.first = false;
            this.setState({first: false})
            this.playCurrentPitch()
        // }
    }

    private handleSecondValvePress = (ev : GestureResponderEvent) => {
        this.second = true;
        this.setState({second: true})
        this.playCurrentPitch()
    }
    private handleSecondValveUnpress = (ev : GestureResponderEvent) => {
        this.second = false;
        this.playCurrentPitch()
        this.setState({second: false})
    }

    private handleThirdValvePress = (ev : GestureResponderEvent) => {
        this.third = true;
        this.setState({third: true})
        this.playCurrentPitch()
    //}
    }
    private handleThirdValveUnpress = (ev : GestureResponderEvent) => {
    //if (ev.nativeEvent.pageX > this.state.screenWidth/2) {
        this.third = false;
        this.setState({third: false})
        this.playCurrentPitch()
    //}
    }


    private stopPreviouslyActivePitch = () => {
        this.previouslyActivePitch && this.state.soundList[this.previouslyActivePitch-42].stop()
        this.previouslyActivePitch = undefined;
    }

    private playCurrentPitch = () => {
        if (this.sliderPressed) {
            this.currentPitch = this.calculatePitch()
            if(this.previouslyActivePitch!==this.currentPitch || this.previouslyActivePitch === undefined) {
                this.setState({currentPitchDebugtext: this.calculateCurrentPitchDebugText(this.currentPitch)});
                this.stopPreviouslyActivePitch()
                this.getCurrentPitchSound().play();
                this.previouslyActivePitch = this.currentPitch;
            }
        }
    }

    private calculateCurrentPitchDebugText(pitch: number) : string {
        const pitchMod : number = pitch % 12;
        let noteName : string ='';
        switch(pitchMod) {
            case(0): noteName = this.state.concertPitch ? "A#" : "C"; break;
            case(1): noteName = this.state.concertPitch ? "B" : "C#";break;
            case(2): noteName = this.state.concertPitch ? "C" : "D";break;
            case(3): noteName = this.state.concertPitch ? "C#" : "D#";break;
            case(4): noteName = this.state.concertPitch ? "D" : "E";break;
            case(5): noteName = this.state.concertPitch ? "D#" : "F";break;
            case(6): noteName = this.state.concertPitch ? "E" : "F#";break;
            case(7): noteName = this.state.concertPitch ? "F" : "G";break;
            case(8): noteName = this.state.concertPitch ? "F#" : "G#";break;
            case(9): noteName = this.state.concertPitch ? "G" : "A";break;
            case(10): noteName = this.state.concertPitch ? "G#" : "A#";break;
            case(11): noteName = this.state.concertPitch ? "A" : "B";break;
        }
        return noteName;
      }

    private getCurrentPitchSound = () => {
        return this.state.soundList[this.currentPitch-42];
    }

    private calculatePitch =  () => {
        let pitchRange : number[] = this.calculatePitchRange()
        console.debug("entered calc pitch. pitch range: " + pitchRange)
        let goal : number = this.sliderValue ? this.sliderValue/10+48 + this.currentDirection : 0
        let closest  = pitchRange.reduce(function(prev, curr) {
            return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
          });
        console.log("closest pitch calculated: " + closest)
        return closest;
    }

    private calculatePitchRange = () => {
        if (!this.first&& !this.second&& !this.third) {
            return [48, 55, 60, 64, 67, 70 ,72] //
         }
         else if (!this.first&& this.second&& !this.third) {
            return [47, 54, 59, 63, 66, 69 ,71] // 2
         }
         else if (this.first&& !this.second&& !this.third) {
             return [46, 53, 58, 62, 65, 68, 70] // 1
         }
         else if (this.first&& this.second&& !this.third) {
             return [45, 52, 57, 61, 64, 67, 69] // 1+2
         }
         else if (!this.first&& this.second&& this.third) {
             return [44, 51, 56, 60, 63, 66, 68] // 2+3
         }
         else if (this.first&& !this.second&& this.third) {
             return [43, 50, 55, 59, 62, 65, 67] // 1+3
         }
         else if (this.first&& this.second&& this.third) {
             return [42, 49, 54, 58, 61, 64, 66] // 1+2+3
         }
         else  {
             return [45, 52, 57, 61, 64, 67, 69] // 3
         }
    }
}

export default TrumpetSlider;

const styles = StyleSheet.create({
    parentContainer: {
        flexDirection: 'row',
        //justifyContent: 'space-around',
        alignItems: 'center',
        flex:1,
        backgroundColor: 'white'
    },
    sliderContainer: {
        flex: 1,
        //rotation: 270,
        alignSelf: 'stretch',
        alignContent: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        height:'100%',
        justifyContent:'center'
        //alignSelf: 'stretch'
    },
    valveButton: {
        flex: 1,
        maxHeight: 180,
        width : 180,
        borderColor: '#d6d7da',
        //backgroundColor: '#2196F3',
        alignSelf: 'stretch',
        alignContent: 'center'
    },
    valves: {
        flex:1, 
        height: undefined, 
        width: undefined,
        resizeMode:'contain'
    },
    text: {
        fontSize: 12,
        alignSelf: 'center', 
        fontFamily:'Fipps-Regular', 
        color: 'dimgray', 
        textAlign: 'center'
    }
});