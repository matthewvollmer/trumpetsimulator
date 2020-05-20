import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export class BackImage extends React.Component {
    public render() {
        return (
            <View>
                <Image
                    style={styles.logo}
                    resizeMode={'contain'}
                    source={require('../../assets/back_button.png')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 30,
        paddingLeft: 35
    },  
});