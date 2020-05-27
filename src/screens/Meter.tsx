import React, { PureComponent, } from "react";
import { View, StyleSheet, Image, ImageSourcePropType, Dimensions } from "react-native";

type Props = {
  cents: number;
};

interface State {
  tunerDialImg: ImageSourcePropType,
  tunerIndImg: ImageSourcePropType,
  screenWidth: number
}

export default class Meter extends PureComponent<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);

    this.state = {
      tunerDialImg: require('../../assets/tunerDial.png'),
      tunerIndImg: require('../../assets/tunerInd.png'),
      screenWidth: Math.round(Dimensions.get('window').width),
    }
}

  componentDidUpdate() {

  }

  render() {
    return (
    <View style={styles.parentContainer}>
      <View style={styles.rowContainer}>
        <Image
          style={styles.seqImgStyle}
          source={this.state.tunerDialImg}
          resizeMode='contain'
        />
        <Image
          style={[styles.seqImgStyle, {marginLeft: this.calculateDialLocation(), tintColor: this.calculateTintColor(), bottom: Math.abs(this.props.cents/2)}]}
          source={this.state.tunerIndImg}
          resizeMode='contain'
        />
      </View>
  </View>
    );
  }

  private calculateTintColor = () => {
    const hue = 180 - this.props.cents;
    return 'hsl('+hue+', 50%, 50%)'
  }

  private calculateDialLocation = () => {
    console.log("cents is : " + this.props.cents);
    return this.props.cents * this.state.screenWidth / 52;
  }

}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  rowContainer: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      top: 100
  },
  seqImgStyle: {
  },
});