import React, { PureComponent, } from "react";
import { View, StyleSheet, Image, ImageSourcePropType, Dimensions, Animated } from "react-native";

type Props = {
  cents: number;
};

interface State {
  tunerDialImg: ImageSourcePropType,
  tunerIndImg: ImageSourcePropType,
  screenWidth: number,
  dialLocation: Animated.Value;
}

export default class Meter extends PureComponent<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);

    this.state = {
      tunerDialImg: require('../../assets/tunerDial-export.png'),
      tunerIndImg: require('../../assets/tunerInd.png'),
      screenWidth: Math.round(Dimensions.get('window').width),
      dialLocation: new Animated.Value(0),
    }
}

  public componentDidUpdate(prevProps: Props) {
    Animated.timing(this.state.dialLocation, {
      toValue: this.props.cents,
      duration: 50,
    }).start();
  }

  render() {
    const cents = this.state.dialLocation.interpolate({
      inputRange: [-40, 40],
      outputRange: [-0.75*this.state.screenWidth/2, 0.75*this.state.screenWidth/2]
    });
    return (
    <View style={styles.parentContainer}>
      <View style={styles.rowContainer}>
        <Image
          style={styles.seqImgStyle}
          source={this.state.tunerDialImg}
          resizeMode='contain'
        />
        <Animated.Image 
          source={this.state.tunerIndImg}
          style= {[
            {
              transform: [{translateX: cents}],
              tintColor: this.calculateTintColor()
            }
          ]}
        />
      </View>
  </View>
    );
  }

  private calculateTintColor = () => {
    const hue = 180 - this.props.cents;
    return 'hsl('+hue+', 50%, 50%)'
  }

  // private calculateDialLocation = () => {
  //   console.log("cents is : " + this.props.cents);
  //   this.setState({dialLocation: this.props.cents * this.state.screenWidth / 52});
  // }

}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  rowContainer: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      top: 100,
  },
  seqImgStyle: {
    aspectRatio:4.
  },
});