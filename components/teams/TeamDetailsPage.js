
import React, { Component } from 'react';
import { Container, Content, } from 'native-base';
import { TouchableOpacity, Dimensions, ImageBackground, FlatList, View, Image, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
var config = require('../Config.js')
import LottieView from 'lottie-react-native';
export const { width: width, height: height } = Dimensions.get('window');
export default class TeamDetailsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgress: false,
            callApi: false,
            data: props.route.params.data == undefined ? '' : props.route.params.data,
            players: [],
            modalVisable: false,
            playerSelected: {},
        };
    }
    componentDidMount() {
        this.getData();
    }
    async getData(flag = true) {
        this.setState({ callApi: true, showProgress: flag })
        var page = 1;
        var loadeMore = true;
        var allData = [];
        while (loadeMore) {
            try {
                let response = await fetch(config.DOMAIN + 'players?page=' + page + '&per_page=100', {
                    method: 'GET',
                });
                let res = await response.json();
                page = page + 1;
                let filterData = res.data.filter(mainData => mainData.team.id == this.state.data.id);
                allData = [...allData, ...filterData];
                loadeMore = res.data.length > 0;
            } catch (error) {
                this.setState({
                    showProgress: false,
                }, function () {
                    loadeMore = false
                })
                alert('An error occurred, we are sorry -_- ')
            }
        }
        this.setState({
            showProgress: false,
            players: [...allData],
        })
    }
    openCloseModal(value, data = {}) {
        this.setState({ modalVisable: value, playerSelected: data })
    }
    renderLoading() {
        if (this.state.showProgress) {
            return (
                <View>
                    <LottieView
                        source={require('../images/animations/loading.json')}
                        loop={true}
                        autoPlay
                        speed={1.1}
                        style={styles.loader}
                    />
                    <Text style={[styles.TextStyleBold, styles.loadingTextStyle]}>
                        This page will take several moments, please wait ...
                    </Text>
                </View>
            );
        }
    }
    getCard(data) {
        return (
            <ImageBackground style={[styles.fullImagecontain, { borderRadius: 0 }]}
                resizeMode='cover' source={require('../images/player.png')} >
                <LinearGradient
                    colors={['rgba(0.6,0.6,0.6,0.6)', 'rgba(0.6,0.6,0.6,0.6)']}
                    style={[styles.LinearGradient]}>
                </LinearGradient>
                <Text style={[styles.TextStyleBold, styles.playerCardText1Style,]} >
                    {data.first_name}
                </Text>
                <Text style={[styles.TextStyleBold, styles.playerCardText1Style, styles.bottom12]} >
                    {data.last_name}
                </Text>
            </ImageBackground >
        )
    }
    getPlayerView(data, index) {
        return (
            <TouchableOpacity key={index} onPress={() => { this.openCloseModal(true, data) }} style={[styles.playerCardStyle]}>
                {this.getCard(data)}
            </TouchableOpacity>
        );
    }
    getMainDetail(data) {
        return (
            <Text style={[styles.TextStyleBold, styles.mainCardTextStyle, styles.marginBottomN]} >
                {data}
            </Text>
        )
    }
    getPlayerText(data, title) {
        return (
            <Text style={[styles.TextStyleBold, styles.playerCardText,]}>
                {title}{data == null || data == '' ? ' - ' : data}
            </Text>
        )
    }
    render() {
        const GetEmptyView = ({ }) => {
            return (
                <Content scrollEnabled={false} contentContainerStyle={[styles.emptyContainer]} style={[styles.marginTop25]}>
                    <Text style={[styles.TextStyleBold, styles.emptyDataStyle]}>There is no data to display ...</Text>
                </Content>
            );
        }
        return (
            <Container>
                {this.renderLoading()}
                {(this.state.showProgress == false) && this.state.callApi == true &&
                    <View style={[styles.mainImageSeeAllPage]}>
                        <ImageBackground style={[styles.fullImagecontain, { borderRadius: 0 }]}
                            resizeMode='cover' source={require('../images/teamCoverImage.png')} >
                            <LinearGradient locations={[.2, 1]}
                                colors={['rgba(255,255,255,0)', 'rgba(0,0,0,0.6)']}
                                style={[styles.LinearGradient]}>
                            </LinearGradient>
                            <View style={[styles.card3TitleStyle,]}>
                                <Text style={[styles.TextStyleBold, styles.abbreviationStyle]}>
                                    {this.state.data.abbreviation}
                                </Text>
                                {this.getMainDetail(this.state.data.name)}
                                {this.getMainDetail(this.state.data.full_name)}
                                {this.getMainDetail(this.state.data.division)}
                                {this.getMainDetail(this.state.data.conference)}
                                {this.getMainDetail(this.state.data.city)}
                            </View>
                        </ImageBackground >
                    </View>
                }
                {(this.state.showProgress == false) && this.state.callApi == true &&
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        removeClippedSubviews={true}
                        contentContainerStyle={[styles.alignItemsCenter]}
                        horizontal={false}
                        data={this.state.players}
                        ListEmptyComponent={() =>
                            this.state.showProgress == false &&
                            <GetEmptyView />
                        }
                        onScrollEndDrag={() => { }}
                        renderItem={({ item, index }) =>
                            this.state.showProgress == false &&
                            this.getPlayerView(item, index)
                        }
                        keyExtractor={item => item.id}
                    />
                }
                <Modal style={[styles.justifyContentStart]}
                    onRequestClose={() => { this.openCloseModal(false) }}
                    isVisible={this.state.modalVisable}
                    onBackButtonPress={() => { this.openCloseModal(false) }}
                    onBackdropPress={() => { this.openCloseModal(false) }} >
                    <TouchableOpacity onPress={() => { this.openCloseModal(false) }} style={[styles.editModalCloseBtn, styles.modalCloseBtn]}>
                        <Icon2 style={[styles.modalCloseIcon]} name={'closecircle'} size={40} color={'#006AB7'} />
                    </TouchableOpacity>
                    <View style={[styles.ModalContainer,]}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.modalImgView]}>
                                <Image style={[styles.modalImg]} resizeMode={'cover'} source={require('../images/playerCard.png')} />
                            </View>
                            <View style={[styles.playerCardDetail]}>
                                {this.getPlayerText(this.state.playerSelected.first_name, 'First name: ')}
                                {this.getPlayerText(this.state.playerSelected.last_name, 'Last name: ')}
                                {this.getPlayerText(this.state.playerSelected.position, 'Position: ')}
                                {this.getPlayerText(this.state.playerSelected.height_feet, 'Height(feet): ')}
                                {this.getPlayerText(this.state.playerSelected.height_inches, 'Height(inches): ')}
                                {this.getPlayerText(this.state.playerSelected.weight_pounds, 'Weight(pounds): ')}
                            </View>
                        </View>
                    </View>
                </Modal>
            </Container>
        )
    }

}