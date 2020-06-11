import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Linking} from 'react-native';
import { Text } from 'react-native-elements'
import licenses from '../../LicensesList'


type Props = {
         key:string, 
            name:string, 
            image:string,
            userUrl: string,
            username: string,
            licenses: string,
            version: string,
            license: any,
            repository: string,
            licenseUrl: string
  };

interface State {
}

class LicensesItem extends React.Component<Props, State> { 
    constructor(props: Readonly<Props>) {
      super(props);

      this.state = {
      }
  }

    public render() {

      let title = this.props.name;
      if (this.props.username) {
        if (title.toLowerCase() != this.props.username.toLowerCase()) {
          title += ` by ${this.props.username}`;
        }
      }

        return (
          <View>
          <View style={styles.cardShadow}>
            <View style={styles.card}>
              {this.props.image &&
                <TouchableOpacity onPress={() => Linking.openURL(this.props.userUrl)}>
                  <Image source={{ uri: this.props.image }} style={styles.image} />
                </TouchableOpacity>}
              <TouchableOpacity
                onPress={() => Linking.openURL(this.props.repository)}
                style={styles.item}>
                <View style={{ maxWidth: '90%' }}>
                  <Text style={styles.name}>{title}</Text>
                  {/* <TouchableOpacity onPress={() => Linking.openURL(this.props.userUrl)}>
                    {licenses}
                  </TouchableOpacity> */}
                  <Text style={styles.text}>{this.props.version}</Text>
                </View>
                <Text
                  style={{ alignSelf: 'center' , color :'#34495e', fontSize: 16 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        )
    }    
}

export default LicensesItem;

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  cardShadow: {
    marginHorizontal: 12,
    marginVertical: 6,
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
  },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    maxWidth: '100%',
    flexWrap: 'wrap',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    aspectRatio: 1,
    width: 96,
    borderRadius: 0,
  },

  text: {
    color: '#34495e',
    marginTop: 3,
  },
});