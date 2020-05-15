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
    onNoteDetected: (params: any) => void
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

  start() {
    // Recording.init({
    //   sampleRate: this.state.sampleRate,
    //   bufferSize: this.state.bufferSize,
    //   bitsPerChannel: 16,
    //   channelsPerFrame: 1,
    // });
    // Recording.addRecordingEventListener((data: Float32Array) => {
    //   MicStream.addListener((data: Float32Array) =>   {
    //   const frequency = this.state.pitchFinder(data);
    //   if (frequency && this.props.onNoteDetected) {
    //     const note = this.getNote(frequency);
    //     this.props.onNoteDetected({
    //       name: this.noteStrings[note % 12],
    //       value: note,
    //       cents: this.getCents(frequency, note),
    //       octave: (note / 12) - 1,
    //       frequency: frequency
    //     });
    //   }
    // });
    // Recording.start();
    // MicStream.init({
    //   bufferSize: 4096,
    //   sampleRate: 22050,
    //   bitsPerChannel: 16,
    //   channelsPerFrame: 1,
    // });
    // MicStream.start();
    //   const frequency = this.state.pitchFinder(data);
    //   if (frequency && this.props.onNoteDetected) {
    //     const note = this.getNote(frequency);
    //     this.props.onNoteDetected({
    //       name: this.noteStrings[note % 12],
    //       value: note,
    //       cents: this.getCents(frequency, note),
    //       octave: (note / 12) - 1,
    //       frequency: frequency
    //     });
    //   }
    // });
  }

  /**
   * get musical note from frequency
   *
   * @param {number} frequency
   * @returns {number}
   */
  getNote(frequency: number) {
    const note = 12 * (Math.log(frequency / this.middleA) / Math.log(2));
    return Math.round(note) + this.semitone;
  }

  /**
   * get the musical note's standard frequency
   *
   * @param note
   * @returns {number}
   */
  getStandardFrequency(note: number) {
    return this.middleA * Math.pow(2, (note - this.semitone) / 12);
  }

  /**
   * get cents difference between given frequency and musical note's standard frequency
   *
   * @param {float} frequency
   * @param {int} note
   * @returns {int}
   */
  getCents(frequency: number, note: number) {
    return Math.floor(
      (1200 * Math.log(frequency / this.getStandardFrequency(note))) /
        Math.log(2)
    );
  }
}