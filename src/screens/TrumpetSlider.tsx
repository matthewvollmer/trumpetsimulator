import React from 'react';
import { StyleSheet, Text, View, GestureResponderEvent ,Dimensions, Image, ImageSourcePropType } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { TouchableOpacity } from 'react-native-gesture-handler';


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
    currentPitch?: number;
    previouslyActivePitch?: number;
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
}

class TrumpetSlider extends React.Component<Props, State> { 
    firstValveUnpressed = require('../../assets/tpt_valve1_unpressed_rot.png');
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            sliderValue : 0,
            currentPitchDebugtext: 0,
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
            thirdValvePressed: require('../../assets/tpt_valve3_pressed_rot.png')
        }
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
                onResponderRelease = {this.handleTouchEnd}
                onResponderTerminationRequest={(ev) => true} 
                >   
                <Image source={require('../../assets/quickpoof_big.png')}
                style= {{alignSelf: 'center', position: 'absolute', bottom: this.state.sliderHeight, alignItems: 'flex-end'}}
                />
                </View>
                
                <View style={styles.container}>
                <Text>{"Slider Value: " + Math.round(this.state.sliderValue)}</Text>
                <Text>{"Current Pitch: " + this.state.currentPitch}</Text>
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
        console.log("sliderValue is: " + sliderValue)
        console.log("locationY is: " + locationY)
        let sliderHeight = this.state.screenHeight-locationY;
        this.setState({sliderValue, sliderHeight})
    }

    private onTouchEvent= (ev: GestureResponderEvent) => {
        if (ev.nativeEvent.pageX < this.state.screenWidth/2) {
            this.calculateSliderValue(ev.nativeEvent.pageY)
            this.playCurrentPitch()
            this.setSliderState(true)
        }
    }

    private handleTouchEnd = () => {
        this.setSliderState(true)
        this.stopPreviouslyActivePitch
        console.debug("entered handle touch end: "+ this.state.sliderPressed)
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
        //stop executing midi note for currentPitch
        //this.setState({currentPitchDebugtext: 0})
    }

    private playCurrentPitch = () => {
        if (this.state.sliderPressed) {
            console.debug("entered play current pitch")
            this.calculatePitch()
            if(this.state.previouslyActivePitch!=this.state.currentPitch) {
                //execute midi note for currentPitch
                this.setState({currentPitchDebugtext: this.state.currentPitch})
                this.stopPreviouslyActivePitch
            }
        }
        this.setState({previouslyActivePitch: this.state.currentPitch})
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
        backgroundColor: '#2196F3',
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
        backgroundColor: '#2196F3',
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