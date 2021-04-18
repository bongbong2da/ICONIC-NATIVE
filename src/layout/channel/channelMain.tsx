import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Divider, Layout, Modal, Spinner, Text, TopNavigation} from "@ui-kitten/components";
import {Image, ScrollView, StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/RootReducer";
import AnimatedLottieView from "lottie-react-native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import {ChannelTypes} from "../../redux/ChannelReducer";
import {PageDataTypes, PostingTypes} from "../../redux/PostingReducer";
import {refreshPostingList} from "../../redux/RefreshReducer";

const ChannelMain = () => {

    //States
    const [channelInfo, setChannelInfo] = useState({} as ChannelTypes);
    const [postingList, setPostingList] = useState([] as PostingTypes[]);
    const [pageData, setPageData] = useState({} as PageDataTypes);
    const [loading, setLoading] = useState(false);

    //Redux
    const selectedChannel = useSelector((state : RootState) => state.channel.selectedChannel);
    const refresh = useSelector((state : RootState) => state.refresh.postingList);
    const dispatcher = useDispatch();

    //Request Methods
    const getChannelInfo = async () => {
        if(selectedChannel === 0) {
            setLoading(false);
            return;
        }
        setLoading(true);
        const token = await AsyncStorage.getItem("token").then(result=>result);
        await axios.get(`/channel/getChannelInfo?idx=${selectedChannel}`, {headers : {"Authorization" : `Bearer ${token}`}})
            .then(res => {
                console.log("RECEIVED_CHANNEL_INFO")
                setChannelInfo(res.data);
                getChannelPostings();
        });
        setLoading(false);
    }

    const getChannelPostings = async () => {
        const token = await AsyncStorage.getItem("token").then(result => result);
        const url = `/posting/get/${channelInfo.chanIdx}/0`;
        await axios.get(url, {headers : {"Authorization" : `Bearer ${token}`}})
            .then(res => {
                console.log("RECEIVED_POSTING_LIST")
                setPageData(res.data);
                setPostingList(res.data.content);
            })
            .catch(err => {
                console.log("FAILED_TO_GET_POSTING_LIST")
            });
    };

    useEffect(() => {
        getChannelInfo();
    },[selectedChannel, refresh]);

    const unselected = () => {
        return (
            <Layout style={styles.content} level={'3'}>
                <AnimatedLottieView style={{height : 300}} source={require('../../../assets/lottie/31490-no-connection.json')}/>
                <Text>🚫 선택된 채널이 없습니다.</Text>
            </Layout>
        )
    };

    const renderPostings = () => {
        return postingList.map((data, index) => {
            const Header = () => {
                return (
                    <View style={{padding : 10 , alignItems : "center"}}>
                        <Avatar source={{uri : `https://iconic-backend.herokuapp.com/upload/${data.postingAttach}`}}  />
                        <Text status={'warning'}>{data.postingWriter}</Text>
                        <Text>{data.postingReg}</Text>
                    </View>
                )
            }

            const Footer = () => {
                return (
                    <View>
                    </View>
                )
            }

            return (
                <Card status={"danger"} style={styles.card} header={Header} footer={Footer}>
                    <Image style={styles.img} source={{uri : `https://iconic-backend.herokuapp.com/upload/${data.postingAttach}`}} />
                    <Divider/>
                    <Layout style={{alignItems : "center"}}>
                        <Text style={{fontSize : 40}}>{data.postingEmoji}</Text>
                    </Layout>
                    <Divider/>
                    <Text>{data.postingContent}</Text>
                </Card>
            )
        });
    }

    const TopNav = () => {
        return (
            <TopNavigation
                title={'🔍 Postings'}
                subtitle={channelInfo.chanName}
                alignment={"center"}
            />
        )
    };

    return (
        <Layout style={styles.container}>
            <Button onPress={() => dispatcher(refreshPostingList())}>REFRESH</Button>
            <Modal visible={loading} backdropStyle={styles.backdrop}>
                <Spinner size={'giant'}/>
            </Modal>
            <TopNav/>
            {selectedChannel === 0 && unselected()}
            <ScrollView>
                {renderPostings()}
            </ScrollView>
        </Layout>
    )
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        overflow : 'scroll'
    },
    content : {
        flex : 1,
        alignItems : 'center',
        justifyContent : "center"
    },
    card : {
        // flex : 1,
        minHeight : 400,
        margin : 10,
        justifyContent : "center",
    },
    img : {
        height : 300,
        flex : 1,
        marginBottom : 20
    },
    backdrop : {
        backgroundColor : 'rgba(0, 0, 0, 0.5)'
    }
});

export default ChannelMain;
