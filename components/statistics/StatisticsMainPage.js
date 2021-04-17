
import React, { Component } from 'react';
import { Container, Content, Spinner, Input, Item, Form, Label, Row, Badge, Right } from 'native-base';
import {
    StyleSheet, TouchableOpacity, Button, Clipboard,
    ToastAndroid, TextInput, AlertIOS, Linking, Platform,
    I18nManager, AppRegistry, Dimensions, ScrollView, ImageBackground,
    View, Image, Text, Modal, TouchableHighlight, Alert, SocialView, ActivityIndicator
} from 'react-native';
var config = require('../Config.js')
import LottieView from 'lottie-react-native';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'
export const { width: width, height: height } = Dimensions.get('window');
export default class StatisticsMainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgress: false,
            callApi: false,
            data: [],
            minX: 0,
            maxX: 0,
            maxY: 0,
            minY: 0,
        };
    }
    componentDidMount() {
        this.getData();
    }
    async getData() {
        this.setState({ callApi: true, showProgress: true })
        try {
            let response = await fetch(config.DOMAIN + 'stats', {
                method: 'GET',
            });
            let res = await response.json();
            let data = [];
            let minX = 0, maxX = 0, minY = 0, maxY = 0;
            let virticalTruk = [], horizantalTruk = [];
            for (const key in res.data) {
                if (res.data[key]['pts'] != null && res.data[key]['reb'] != null) {
                    if (res.data[key]['pts'] > maxX) {
                        maxX = res.data[key]['pts'];
                    }
                    if (res.data[key]['pts'] < minX) {
                        minX = res.data[key]['pts'];
                    }
                    if (res.data[key]['reb'] > maxY) {
                        maxY = res.data[key]['reb'];
                    }
                    if (res.data[key]['reb'] < minY) {
                        minY = res.data[key]['reb'];
                    }
                    data.push({
                        x: res.data[key]['pts'],
                        y: res.data[key]['reb'],
                    })
                }
            }
            data.sort(function (a, b) {
                return a.x - b.x;
            });
            this.setState({
                showProgress: false,
                data: [...data],
                minX: minX,
                maxX: maxX,
                maxY: maxY,
                minY: minY,
            })
        } catch (error) {
            this.setState({
                showProgress: false,
            })
            alert('An error occurred, we are sorry -_- ')
        }
    }
    renderLoading() {
        if (this.state.showProgress) {
            return (
                <LottieView
                    source={require('../images/animations/loading.json')}
                    loop={true}
                    autoPlay
                    speed={1.1}
                    style={styles.loader}
                />
            );
        }
    }
    render() {
        return (
            <Container>
                <Content scrollEnabled={true}>
                    {this.renderLoading()}
                    {(this.state.showProgress == false) && this.state.callApi == true &&
                        <Chart
                            style={{ height: height * 0.9, width: width }}
                            data={this.state.data}
                            padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                            xDomain={{ min: this.state.minX, max: this.state.maxX }}
                            yDomain={{ min: this.state.minY, max: this.state.maxY }}
                            viewport={{ size: { width: 5 } }}
                        >
                            <VerticalAxis
                                tickValues={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30]}
                                theme={{
                                    axis: { stroke: { color: '#aaa', width: 2 } },
                                    ticks: { stroke: { color: '#aaa', width: 2 } },
                                    labels: { formatter: (v: number) => v.toFixed(2) },
                                }}
                            />
                            <HorizontalAxis
                                tickValues={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30]}
                                theme={{
                                    axis: { stroke: { color: '#aaa', width: 2 } },
                                    ticks: { stroke: { color: '#aaa', width: 2 } },
                                    labels: { label: { rotation: 50 }, formatter: (v) => v.toFixed(1) },
                                }}
                            />
                            <Line
                                theme={{
                                    stroke: { color: '#D71E54', width: 2 },
                                }}
                                smoothing="cubic-spline"
                            />
                            <Area theme={{ gradient: { from: { color: '#006AB7', opacity: 0.4 }, to: { color: '#92D1FF', opacity: 0.4 } } }} smoothing="cubic-spline" />
                        </Chart>
                    }
                </Content>
            </Container>
        )
    }

}

