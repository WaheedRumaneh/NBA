import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Dimensions, PixelRatio, I18nManager, Platform

} from 'react-native';
export const { width: width, height: height } = Dimensions.get('window');
export default class MainStyle extends Component {
    static returnStyles(IS_RTL) {

        var styles = StyleSheet.create({
            TextStyleReguler: {
                color: '#000000',
                fontFamily: 'Tajawal-Regular',
            },
            TextStyleBold: {
                color: '#000000',
                fontFamily: 'Tajawal-Bold',
                fontWeight: Platform.OS == 'ios' ? 'bold' : 'normal'
            },
            TextStyleMedium: {
                color: '#000000',
                fontFamily: 'Tajawal-Medium',
                fontWeight: Platform.OS == 'ios' ? '600' : 'normal'
            },
            loader: {
                width: width * 0.5,
                height: height * 0.35,
                left: '10%',
                marginTop: height * 0.1,
            },
            mainBackgroundColor: {
                backgroundColor: '#006AB7',
                flexDirection: 'row'
            },
            splashScreenContent: {
                justifyContent: 'center',
                alignItems: 'center',
            },
            mainPageView: {
                margin: '4%',
            },
            fullImagecontain: {
                overflow: 'hidden',
                width: '100%',
                height: '100%',
                borderRadius: 5
            },
            LinearGradient: {
                width: '100%',
                height: '100%',
            },
            card1TitleStyle: {
                fontSize: 33,
                color: '#fff',
                position: 'absolute',
                bottom: height * 0.04,
                textAlign: 'center',
                width: width * 0.9,
                letterSpacing: 10
            },
            card2TitleStyle: {
                fontSize: 33,
                color: '#fff',
                position: 'absolute',
                bottom: height * 0.04,
                textAlign: 'left',
                marginLeft: '17%',
                width: width * 0.9,
            },
            scondSectionMainPage: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: height * 0.4
            },
            card1Style: {
                height: height * 0.43,
                width: width * 0.435,
                marginTop: '4%'
            },
            emptyDataStyle: {
                color: '#ABABAB', fontSize: 18, textAlign: 'center',
                fontWeight: 'bold', paddingVertical: '15%'
            },
            mainTeamCard: {
                flexDirection: 'row',
                marginHorizontal: '4%',
                marginTop: '4%',
                width: width * 0.92,
                borderRadius: 5,
                backgroundColor: '#D71E54',
            },
            gameCardStyle: {
                flexDirection: 'row',
                marginHorizontal: '4%',
                marginTop: '4%',
                width: width * 0.92,
                borderRadius: 5,
                backgroundColor: '#fff',
            },
            teamCardSectionOne: {
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                width: width * 0.35,
                backgroundColor: '#006AB7',
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
            },
            teamCard2SectionOne: {
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                width: width * 0.45,
                backgroundColor: '#006AB7',
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                paddingVertical: '3%'
            },
            teamCard2SectionTow: {
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                width: width * 0.47,
                backgroundColor: '#006AB7',
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                paddingVertical: '3%'
            },
            virticalBorder: {
                marginVertical: '2%',
                borderRightWidth: 5,
                borderRightColor: '#fff',
                marginLeft: '-1%',
                borderRadius: 5,
            },
            scoreMainView: {
                marginVertical: '3%',
                backgroundColor: '#fff',
                borderRadius: 5,
                position: 'absolute',
                right: width * 0.38,
                zIndex: 100,
                width: width * 0.2,
                paddingHorizontal: '2%',
                justifyContent: 'center',
                alignItems: 'center',
                height: height * 0.1
            },
            abbreviationStyle: {
                fontSize: 25,
                letterSpacing: 8,
                color: '#fff',
                marginBottom: -2
            },
            scroeStyle: {
                fontSize: 30,
                color: '#fff',
                marginBottom: -2
            },
            nameStyle: {
                fontSize: 16,
                color: '#fff',
                marginTop: -2
            },
            teamCardSectionTwo: {
                padding: '4%',
                paddingLeft: '10%'
            },
            mainCardTextStyle: {
                color: '#fff',
                fontSize: 15,
            },
            marginBottomN: {
                marginBottom: -5
            },
            VSStyle: {
                color: '#000',
                fontSize: 30,
            },
            homeCard: {
                backgroundColor: '#FFBB00',
                position: 'absolute',
                paddingHorizontal: '3%',
                zIndex: 1000,
                borderRadius: 7,
                textAlign: 'center',
                marginTop: 10,
                transform: [{ rotate: "320deg" }]
            },
            vistorCard: {
                backgroundColor: '#FFBB00',
                position: 'absolute',
                right: 0,
                paddingHorizontal: '3%',
                zIndex: 1000,
                borderRadius: 7,
                textAlign: 'center',
                marginTop: 10,
                transform: [{ rotate: "40deg" }]
            },
            filterSection: {
                width: width,
                height: height * 0.07,
                backgroundColor: '#006AB7',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: '4%',
                position: 'absolute',
                top: 0,
            },
            selectorViewStyle: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: '#EBEBEB',
                padding: 0.5,
                height: width * 0.11,
                backgroundColor: 'white',
                width: width * 0.43,
            },
            selectorTextStyle: {
                padding: 4,
                alignContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                color: '#545252',
                paddingRight: 15,
                paddingLeft: 15,
            },
            mainImageSeeAllPage: {
                width: width,
                height: height * 0.23,
                marginBottom: 7,

            },
            card3TitleStyle: {
                position: 'absolute',
                top: height * 0.03,
                right: 20,
                alignSelf: 'flex-start',
                textAlign: IS_RTL ? 'right' : 'left',
                width: width * 0.9
            },
            playerCardStyle: {
                width: width * 0.45,
                height: height * 0.25,
                flexWrap: 'wrap',
                marginHorizontal: '2%',
                marginVertical: '3%'
            },
            playerCardText1Style: {
                fontSize: 30,
                color: '#fff',
                position: 'absolute',
                bottom: height * 0.13,
                textAlign: 'center',
                alignSelf: 'center'
            },
            editModalCloseBtn: {
                width: 42,
                height: 42,
                borderRadius: 50,
                backgroundColor: "#fff",
                position: "absolute",
                top: -12,
                left: -7,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
            },
            ModalContainer: {
                borderRadius: 5,
                padding: 10,
                backgroundColor: '#fff',
                paddingBottom: 20,
                bottom: 0,
                top: 120,
                height: height * 0.4,
            },
            playerCardText: {
                fontSize: 18,
                color: '#414042',
                marginTop: '2%'
            },
            playerCardDetail: {
                width: '60%',
                height: '100%',
                paddingTop: '15%',
                marginLeft: '-10%'
            },
            emptyContainer: {
                justifyContent: 'center',
                alignItems: 'center'
            },
            marginTop25: {
                marginTop: height * 0.25
            },
            bottom12: {
                bottom: width * 0.12
            },
            loadingTextStyle: {
                fontSize: 16,
                color: "#000000",
                textAlign: 'center',
                marginTop: '10%',
                marginHorizontal: '10%'
            },
            alignItemsCenter: {
                alignItems: 'center'
            },
            justifyContentStart: {
                justifyContent: 'flex-start',
            },
            modalCloseBtn: {
                top: 105,
                zIndex: 1000
            },
            modalCloseIcon: {
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
            },
            modalImgView: {
                width: '50%',
                height: '100%',
                alignSelf: 'center',
            },
            modalImg: {
                alignSelf: 'center',
                width: '100%',
                height: '100%'
            },
            splashScreenLogo: {
                width: width,
                height: height * 0.5
            },
        });

        return styles;
    }
}
