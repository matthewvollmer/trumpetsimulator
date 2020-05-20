import React from 'react';
import { StyleSheet, Text, View, GestureResponderEvent ,Dimensions, Image, ImageSourcePropType } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Sound from 'react-native-sound';


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
    currentPitchDebugtext?: number
    screenHeight: number
    screenWidth: number
    sliderHeight: number

    firstValveColor: string
    secondValveColor: string
    thirdValveColor: string

    firstValveUnpressed: ImageSourcePropType
    firstValvePressed: ImageSourcePropType
    secondValveUnpressed: ImageSourcePropType
    secondValvePressed: ImageSourcePropType
    thirdValveUnpressed: ImageSourcePropType
    thirdValvePressed: ImageSourcePropType

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
}

class TrumpetSlider extends React.Component<Props, State> { 
    firstValveUnpressed = require('../../assets/tpt_valve2_unpressed_rot.png');
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            sliderValue : 0,
            currentPitchDebugtext: 48,
            currentPitch: 48,
            previouslyActivePitch: undefined,
            first: false,
            second: false,
            third: false,
            screenHeight: Math.round(Dimensions.get('window').height),
            screenWidth: Math.round(Dimensions.get('window').width),
            sliderHeight: 0,
            firstValveColor: '#2196F3',
            secondValveColor: '#2196F3',
            thirdValveColor: '#2196F3',
            firstValveUnpressed: require('../../assets/tpt_valve1_unpressed_rot.png'),
            firstValvePressed: require('../../assets/tpt_valve1_pressed_rot.png'),
            secondValveUnpressed: require('../../assets/tpt_valve2_unpressed_rot.png'),
            secondValvePressed: require('../../assets/tpt_valve2_pressed_rot.png'),
            thirdValveUnpressed: require('../../assets/tpt_valve3_unpressed_rot.png'),
            thirdValvePressed: require('../../assets/tpt_valve3_pressed_rot.png'),

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

            soundList : []
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


    public render() {
        return (
            <View style={styles.parentContainer}>
                <View style={styles.sliderContainer}
                onStartShouldSetResponder={(ev) => {
                    //return (ev.nativeEvent.pageX < this.state.screenWidth/2)
                    return true
                }}
                onMoveShouldSetResponder={(ev) => {
                    //return (ev.nativeEvent.pageX < this.state.screenWidth/2)
                    return true
                }}
                onResponderGrant= {(ev) => this.onTouchEvent(ev)}
                onResponderMove = {(ev) => this.onTouchEvent(ev)}
                onTouchEnd = {this.handleTouchEnd}
                onResponderTerminationRequest={(ev) => true} 
                >   
                <Image source={require('../../assets/quickpoof_big.png')}
                style= {{alignSelf: 'center', position: 'absolute', bottom: this.state.sliderHeight-5, alignItems: 'flex-end'}}
                />
                </View>
                
                <View style={styles.container}>
                <Text>{"Slider Value: " + Math.round(this.state.sliderValue)}</Text>
                <Text>{"Current Pitch: " + this.state.currentPitchDebugtext}</Text>
                    <TouchableOpacity 
                        activeOpacity={1}
                        delayPressIn={0}
                        delayPressOut={0}
                        style={styles.valveButton}
                        onPressIn={this.handleThirdValvePress} 
                        onPressOut={this.handleThirdValveUnpress} 
                        >
                            <Image 
                                source={this.state.third ? this.state.thirdValvePressed : this.state.thirdValveUnpressed}
                                style={styles.valves}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        activeOpacity={1}
                        delayPressIn={0}
                        delayPressOut={0}
                        style={styles.valveButton}
                        onPressIn={this.handleSecondValvePress} 
                        onPressOut={this.handleSecondValveUnpress}
                        >
                            <Image 
                                source={this.state.second ? this.state.secondValvePressed : this.state.secondValveUnpressed}
                                style={styles.valves}  
                            />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.valveButton}
                        onPressIn={this.handleFirstValvePress} 
                        activeOpacity={1}
                        delayPressIn={0}
                        delayPressOut={0}
                        onPressOut={this.handleFirstValveUnPress}>
                            <Image 
                                style={styles.valves}
                                source={this.state.first ? this.state.firstValvePressed : this.state.firstValveUnpressed}
                            />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }    

    async setSliderState(set: boolean){
        this.setState({ sliderPressed: set });
    }

    private calculateSliderValue = (locationY: number) => {
        let sliderValue = (this.state.screenHeight - locationY- 100)/2;
        let sliderHeight = this.state.screenHeight-locationY;
        this.setState({sliderValue, sliderHeight})
    }

    private onTouchEvent= (ev: GestureResponderEvent) => {
        if (ev.nativeEvent.pageX < this.state.screenWidth/2) {
            this.setState({sliderPressed: true});
            this.calculateSliderValue(ev.nativeEvent.pageY)
            this.playCurrentPitch()
        }
    }

    private handleTouchEnd = async () => {
        //this.setSliderState(false)
        await this.setState({sliderPressed: false});
        this.stopPreviouslyActivePitch()
        //this.state.soundList[this.state.currentPitch-42].stop();
    }

    private handleFirstValvePress = () => {
        this.setState({
            first: true,
            firstValveColor: '#fff',
        });
        this.playCurrentPitch()
    }

    private handleFirstValveUnPress = () => {
        this.setState({
            first: false,
            firstValveColor: '#2196F3',
        });
        this.playCurrentPitch()
    }

    private handleSecondValvePress = () => {
        this.setState({
            second: true,
            secondValveColor: '#fff',
        });
        this.playCurrentPitch()
    }
    private handleSecondValveUnpress = () => {
        this.setState({
            second: false,
            secondValveColor: '#2196F3',
        });
        this.playCurrentPitch()
    }

    private handleThirdValvePress = () => {
        this.setState({
            third: true,
            thirdValveColor: '#fff',
        });
        this.playCurrentPitch()
    }
    private handleThirdValveUnpress = () => {
        this.setState({
            third: false,
            thirdValveColor: '#2196F3',
        });
        this.playCurrentPitch()
    }


    private stopPreviouslyActivePitch = () => {
        this.state.previouslyActivePitch && this.state.soundList[this.state.previouslyActivePitch-42].stop()
        this.setState({previouslyActivePitch: undefined});
    }

    private playCurrentPitch = async () => {
        if (this.state.sliderPressed) {
            console.debug("entered play current pitch")
            this.calculatePitch()
            console.debug("XXX prev vs current pitch com: " + this.state.previouslyActivePitch + ", " + this.state.currentPitch);
            if(this.state.previouslyActivePitch!==this.state.currentPitch || this.state.previouslyActivePitch === undefined) {
                this.setState({currentPitchDebugtext: this.state.currentPitch})
                await this.stopPreviouslyActivePitch()
                console.debug("current pitch is loaded? : " + this.getCurrentPitchSound().isLoaded())
                this.getCurrentPitchSound().play();
                this.setState({previouslyActivePitch: this.state.currentPitch})
            }
        }
    }

    private getCurrentPitchSound = () => {
        return this.state.soundList[this.state.currentPitch-42];
    }

    private calculatePitch = () => {
        let pitchRange : number[] = this.calculatePitchRange()
        console.debug("entered calc pitch. pitch range: " + pitchRange)
        let goal : number = this.state.sliderValue ? this.state.sliderValue/10+48 : 0
        let closest  = pitchRange.reduce(function(prev, curr) {
            return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
          });
        console.log("closest pitch calculated: " + closest)
        this.setState({
            currentPitch: closest
        })
    }

    private calculatePitchRange = () => {
        if (!this.state.first && !this.state.second && !this.state.third) {
            return [48, 55, 60, 64, 67, 70 ,72] //
         }
         else if (!this.state.first && this.state.second && !this.state.third) {
            return [47, 54, 59, 63, 66, 69 ,71] // 2
         }
         else if (this.state.first && !this.state.second && !this.state.third) {
             return [46, 53, 58, 62, 65, 68, 70] // 1
         }
         else if (this.state.first && this.state.second && !this.state.third) {
             return [45, 52, 57, 61, 64, 67, 69] // 1+2
         }
         else if (!this.state.first && this.state.second && this.state.third) {
             return [44, 51, 56, 60, 63, 66, 68] // 2+3
         }
         else if (this.state.first && !this.state.second && this.state.third) {
             return [43, 50, 55, 59, 62, 65, 67] // 1+3
         }
         else if (this.state.first && this.state.second && this.state.third) {
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
        flex:1
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
        //alignSelf: 'stretch'
    },
    valveButton: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 0.5,
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
    }
});