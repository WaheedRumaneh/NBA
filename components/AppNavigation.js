import React, { Component } from 'react';
import {
    Image,
    Dimensions,
    I18nManager,
    StatusBar,
    Platform,
    View,
    Text,
    BackHandler,
    TextInput,
    Alert,
    Keyboard, TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import MainStyle from './style/mainStyle';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import Home from "./Home";
import SplashScreen from "./SplashScreen";
import TeamsMainPage from "./teams/TeamsMainPage";
import TeamDetailsPage from "./teams/TeamDetailsPage";
import GamesMainPage from "./games/GamesMainPage";
import StatisticsMainPage from "./statistics/StatisticsMainPage";
var IS_RTL = I18nManager.isRTL;
export const { width: width, height: height } = Dimensions.get('window');
export default class MainNavigator extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async backNav(navigation) {
        if (!navigation.goBack(null)) { }
    }
    render(navigation) {
        const Stack = createStackNavigator();
        backBtn = !IS_RTL ? 'arrow-back' : 'arrow-forward';
        backNav = this.backNav
        styles = MainStyle.returnStyles(IS_RTL);
        RTL = IS_RTL
        const BackBtn = ({ navigation, title }) => {
            return (
                <TouchableOpacity style={{ marginLeft: 15, marginRight: 0 }} onPress={() => this.backNav(navigation)}>
                    <IconMaterial name={backBtn} color={'#fff'} size={25} />
                </TouchableOpacity>
            )
        }
        let TitleHeader = (props, title, dontShowBackBtn = false) => {
            const { navigation } = props;
            const { state, setParams } = navigation;
            if (props.route != undefined) {
                if (props.route.params != undefined && props.route.params.title != undefined) {
                    title = props.route.params.title
                }
            }
            global.navigation = props.navigation
            return {
                title: title,
                headerTintColor: '#fff',
                ...dontShowBackBtn ? TransitionPresets.ScaleFromCenterAndroid : TransitionPresets.SlideFromRightIOS,
                headerLeft: () => !dontShowBackBtn && <BackBtn navigation={navigation} title={title} />,
                headerStyle: { backgroundColor: '#006AB7', elevation: title == 'Games' ? 0 : 8, shadowColor: Platform.OS == 'ios' ? "#006AB7" : "#000", },
                gestureEnabled: dontShowBackBtn ? false : true,
                headerTitleStyle: {
                    color: '#fff',
                    elevation: 0,
                    textAlign: 'center',
                    marginTop: Platform.OS == 'ios' ? 5 : 0,
                    marginRight: Platform.OS == 'ios' ? 0 : '20%',
                    fontWeight: Platform.OS == 'ios' ? 'bold' : 'normal',
                    fontSize: 18,
                    width: width * 0.8,
                    alignSelf: 'center',
                    marginLeft: !dontShowBackBtn || Platform.OS == 'ios' ? 0 : '20%',
                    fontFamily: 'Tajawal-Bold',
                },
            }
        };
        return (
            <NavigationContainer>
                <StatusBar
                    backgroundColor='rgba(255, 255, 255, 0)'
                    barStyle='light-content'
                    translucent={true}
                />
                <Stack.Navigator>
                    <Stack.Screen name="SplashScreen" component={SplashScreen}
                        options={{ headerShown: false, ...TransitionPresets.ScaleFromCenterAndroid, }} />
                    <Stack.Screen name="Home" component={Home} options={(props) => TitleHeader(props, 'Home', true)} />
                    <Stack.Screen name="Teams" component={TeamsMainPage} options={(props) => TitleHeader(props, 'Teams')} />
                    <Stack.Screen name="Games" component={GamesMainPage} options={(props) => TitleHeader(props, 'Games')} />
                    <Stack.Screen name="TeamDetailsPage" component={TeamDetailsPage} options={(props) => TitleHeader(props, props.route.params.title)} />
                    <Stack.Screen name="Statistics" component={StatisticsMainPage} options={(props) => TitleHeader(props, 'Statistics')} />
                </Stack.Navigator>
            </NavigationContainer >
        )
    }
}