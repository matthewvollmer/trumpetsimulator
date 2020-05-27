//import Recording from "react-native-recording";
import MicStream from 'react-native-microphone-stream';
import PitchFinder from "pitchfinder";
import React from "react";
import { PitchDetector } from "pitchfinder/lib/detectors/types";


interface State{ 
    sampleRate: number,
    bufferSize: number, 
    pitchFinder: PitchDetector,
}

type Props = {
  };


export default class TunerComponent extends React.Component<Props, State> {
  middleA = 440;
  semitone = 69;
  noteStrings = [
    "C",
    "C♯",
    "D",
    "D♯",
    "E",
    "F",
    "F♯",
    "G",
    "G♯",
    "A",
    "A♯",
    "B"
  ];

  constructor(props: Readonly<Props>) {
    super(props);

    this.state = {
        sampleRate: 22050,
        bufferSize: 2048,
        pitchFinder : PitchFinder.YIN({
          sampleRate: 22050
        }),
    }
}
}