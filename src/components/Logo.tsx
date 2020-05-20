import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export class Logo extends React.Component {
    public render() {
        return (
            <View>
                <Image
                    style={styles.logo}
                    resizeMode={'contain'}
                    source={require('../../assets/applogo.png')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 40,
    },
});