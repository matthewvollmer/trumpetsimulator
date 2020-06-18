import React from "react";
import { View, Text, StyleSheet,  Image, GestureResponderEvent, Dimensions, PanResponder, PanResponderInstance} from "react-native";
import { PanGestureHandler } from 'react-native-gesture-handler';

type Props = {
    sliderPressed: boolean | undefined;
    sliderHeight: number;
    onTouchEvent: (event: GestureResponderEvent) => void;
    handleTouchEnd: (ev: GestureResponderEvent) => void;
  };

  interface State {
    screenWidth: number
  }
  

class AirSlider extends React.Component<Props, State> {
  public panResponder!: PanResponderInstance;
  constructor(props: Readonly<Props>) {
    super(props);

    this.state= {
      screenWidth: Dimensions.get('screen').width,
    }
  }

componentWillMount = () => { 
  this.panResponder = PanResponder.create({ 
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: (e, gestureState) => { }, 
    onPanResponderMove: (ev) => this.props.onTouchEvent(ev),
    onPanResponderStart: (ev) => this.props.onTouchEvent(ev),
    onPanResponderEnd: (ev) => this.props.handleTouchEnd(ev),
    onShouldBlockNativeResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (e, {vx, vy}) => { } }
    );
} 

  render() {
    return (
      <View {...this.panResponder.panHandlers}
      style={[styles.sliderContainer, {width:this.state.screenWidth/2}]}
      hitSlop={{right:25}}
  >   
      <Image source={require('../../assets/quickpoof_big.png')}
          style= {[this.props.sliderPressed===true && { height: 125},
              {alignSelf: 'flex-start', position: 'absolute', bottom: this.props.sliderHeight-12, alignItems: 'flex-end'}]}
      />
  </View>
    );
  }
}

export default AirSlider;

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    alignSelf: 'stretch',
    alignContent: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'white',
},
});