import React, { PureComponent } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { NoteObject } from "./Tuner";

type Props = {
    note: NoteObject
  };

export default class Note extends PureComponent<Props> {
  render() {
    return (
      <View style={style.note}>
        <Text style={style.name}>{this.props.note.name[0]}</Text>
        <Text style={style.octave}>{this.props.note.octave}</Text>
        <Text style={style.sharp}>{this.props.note.name[1]}</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  note: {
    width: 110,
    height: 146,
    marginBottom: 10
  },
  name: {
    fontSize: 70,
    fontWeight: "600",
    color: "#662d36",
    flexDirection: "row",
    fontFamily:'Fipps-Regular', 
  },
  sharp: {
    fontSize: 32,
    fontFamily:'Fipps-Regular', 
    color: "#662d36",
    position: "absolute",
    right: 0,
    top: 32,
    ...Platform.select({
      ios: {
        top: 10,
        fontSize: 48
      }
    })
  },
  octave: {
    fontSize: 16,
    color: "#662d36",
    position: "absolute",
    right: 0,
    bottom: 0,
    fontFamily:'Fipps-Regular', 
  }
});