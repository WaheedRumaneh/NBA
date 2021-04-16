import React, { Component } from 'react';
import RNRestart from 'react-native-restart';
import { Linking, Platform, I18nManager, AppRegistry, View, Image, Modal, Alert, Text, Dimensions, ImageBackground } from 'react-native';
import { Content } from 'native-base';
var IS_RTL = I18nManager.isRTL;
export const { width: width, height: height } = Dimensions.get('window');
export default class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        this.loginInterval = setInterval(() => {
            this.renderLoading();
        }, 1500);
    }
    async renderLoading() {
        if (IS_RTL) {
            I18nManager.forceRTL(false);
            RNRestart.Restart();
        }
        clearInterval(this.loginInterval);
        this.props.navigation.replace('Home', {});
    }
    render() {
        return (
            <Content style={[styles.mainBackgroundColor,]} contentContainerStyle={[styles.splashScreenContent]} scrollEnabled={false}>
                <Image source={require('./images/nba.png')} style={[styles.splashScreenLogo]} />
            </Content>


        )
    }
}