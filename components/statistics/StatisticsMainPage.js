
import React, { Component } from 'react';
import { Container, Content, Spinner, Input, Item, Form, Label, Row, Badge, Right } from 'native-base';
import {
    StyleSheet, TouchableOpacity, Button, Clipboard,
    ToastAndroid, TextInput, AlertIOS, Linking, Platform,
    I18nManager, AppRegistry, Dimensions, ScrollView, ImageBackground,
    View, Image, Text, Modal, TouchableHighlight, Alert, SocialView, ActivityIndicator
} from 'react-native';
var config = require('./Config.js')
export const { width: width, height: height } = Dimensions.get('window');
export default class StatisticsMainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <Container>
            </Container>
        )
    }

}