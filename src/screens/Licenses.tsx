import React from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
  };

interface State {
}

class Licenses extends React.Component<Props, State> { 
    constructor(props: Readonly<Props>) {
      super(props);

      this.state = {
      }
  }

    public render() {
        return (
          <ScrollView >
            <Text style={{alignSelf: 'center', fontSize: 20}}>Privacy Policy:</Text>
            <Text style={{alignSelf: 'center', fontSize: 12, color: 'blue', textDecorationLine:'underline'}}
              onPress={() => Linking.openURL('https://brass-buddy.flycricket.io/privacy.html')}>
              https://brass-buddy.flycricket.io/privacy.html
            </Text>

            <Text style={{alignSelf: 'center', fontSize: 20}}>Licenses:</Text>
            {this.createLicensesList('expo', 'MIT', '^37.0.3')}
            {this.createLicensesList('@expo/vector-icons', 'MIT', '^10.0.2')}
            {this.createLicensesList('expo-av', 'MIT', '^8.1.0')}
            {this.createLicensesList('expo-splash-screen', 'MIT', '^0.2.3')}
            {this.createLicensesList('expo-updates', 'MIT', '^0.2.2')}
            {this.createLicensesList('@use-expo/font', 'MIT', '^2.0.0')}

            {this.createLicensesList("@react-native-community/masked-view", 'MIT', "0.1.6",)}
            {this.createLicensesList("@react-native-community/slider", 'MIT', "^3.0.0",)}
            {this.createLicensesList("@react-native-firebase/admob", 'Apache-2.0', "^7.1.4",)}
            {this.createLicensesList("@react-native-firebase/app", "Apache-2.0", "^7.2.1",)}
            {this.createLicensesList("@react-navigation/native", "MIT", "^5.2.1",)}
            {this.createLicensesList("@react-navigation/stack", "MIT", "^5.2.16",)}


            {this.createLicensesList("pitchfinder", 'GNU v3', "^2.3.1",)}
            {this.createLicensesList("react", 'MIT', "~16.9.0",)}
            {this.createLicensesList("react-dom", 'MIT', "~16.9.0",)}
            {this.createLicensesList("react-native",'MIT', "~0.61.5",)}
            {this.createLicensesList("react-native-audio-record",'MIT', "^0.2.2",)}
            {this.createLicensesList("react-native-elements",'MIT', "^2.0.0",)}
            {this.createLicensesList("react-native-fs",'MIT', "^2.16.6",)}

            {this.createLicensesList("react-native-gesture-handler", 'MIT', "~1.6.0",)}
            {this.createLicensesList("react-native-microphone-stream", 'MIT', "0.0.1")}
            {this.createLicensesList("react-native-modal", 'MIT', "^11.5.6",)}
            {this.createLicensesList("react-native-reanimated", 'MIT', "~1.7.0",)}
            {this.createLicensesList("react-native-recording", 'MIT', "^0.4.1",)}
            {this.createLicensesList("react-native-safe-area-context", 'MIT', "0.7.3",)}
            {this.createLicensesList("react-native-screens", 'MIT', "~2.2.0",)}

            {this.createLicensesList("react-native-sound", 'MIT', "^0.11.0",)}
            {this.createLicensesList("react-native-tuner", 'MIT', "^1.0",)}
            {this.createLicensesList("react-native-unimodules", 'MIT', "^0.9.1",)}
            {this.createLicensesList("react-native-vector-icons", 'MIT', "^6.6.0",)}
            {this.createLicensesList("react-native-web", 'MIT', "~0.11.7",)}
            {this.createLicensesList("realm" ,'Apache-2.0', "^5.0.4",)}
            {this.createLicensesList("rn-vertical-slider", 'MIT', "^1.0.6")}
            
          </ScrollView>
        )
    }    

    private createLicensesList = (name: string, license: string, version: string, username? : string) =>  {
      return (
        <View style={{justifyContent:'center', alignSelf:'center', borderRadius: 2, borderWidth:2, borderColor: 'gray'}}>
          {name &&  <Text>{'Library Name: ' + name}</Text>}
          {license &&  <Text>{'License: '+license}</Text>}
          {version &&  <Text>{'Version: '+version}</Text>}
          {username &&  <Text>{'Github Username: '+username}</Text>}
        </View>
      )
      };
    


    private capitalizeFirstLetter = (string: string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

    private extractNameFromGithubUrl = (url: string) => {
      if (!url) {
        return null;
      }
    
      const reg = /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_]{1,15})(\/([-a-z]{1,20}))?/i;
      const components = reg.exec(url);
    
      if (components && components.length > 5) {
        return components[5];
      }
      return null;
    }
}

export default Licenses;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  rowContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  img: {
    flex: 1,
    resizeMode: 'contain'
  }
});