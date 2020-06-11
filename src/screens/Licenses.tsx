import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import LicensesList from '../../LicensesList'
import LicensesItem from './LicensesItem';

type Props = {
    // route: ScreenRouteProp;
    // navigation: NavigationProp;
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
        let licenses : any = Object.keys(LicensesList).map((key:string) => {
          let { licenses, ...license } = LicensesList[key];
          let [name, version] = key.split('@');

          let username = this.extractNameFromGithubUrl(license.repository) || this.extractNameFromGithubUrl(license.licenseUrl)

          let repository=license.repository;

          let userUrl;
          let image;
          if (username) {
            username = this.capitalizeFirstLetter(username)
            image = `http://github.com/${username}.png`;
            userUrl = `http://github.com/${username}`;
          }

          return {
            key,
            name,
            image,
            userUrl,
            username,
            licenses: licenses.slice(0, 405),
            version,
            ...license,
            repository
          }
        })


        return (
          <View>
            <Text style={{alignSelf: 'center'}}>Licenses:</Text>
            {this.createLicensesList(licenses)}
            {/* <Text>{licenses[0].key}</Text> */}
            {/* <FlatList
              style={{flex:1}}
              keyExtractor={({ key }) => key}
              data={licenses}
              renderItem={({ item }) => <LicensesItem {...item} />}
            /> */}
          </View>
        )
    }    

    private createLicensesList = (licenses: any) =>  {
      let licenceElements: JSX.Element[] = [];
      for (let i:number = 0; i< licenses.length; i++) {

      // licenses.forEach((license: any) => {
        let license = licenses[i];
        licenceElements.push(
          <View>
            <Text>{license.name}</Text>
          </View>
        )
      }
      return licenceElements;
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