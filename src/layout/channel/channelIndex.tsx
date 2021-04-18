import React, {useEffect, useState} from 'react';
import {Layout, List, ListItem, Text, TopNavigation} from "@ui-kitten/components";
import {ListRenderItemInfo, StyleSheet} from "react-native";
// @ts-ignore
import {default as theme} from '../../../assets/theme/custom-theme.json';
import {HomeRootParams} from "../homeIndex";
import {BottomTabBarProps, BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {useDispatch, useSelector} from "react-redux";
import {ChannelTypes, saveSelectedChannel} from "../../redux/ChannelReducer";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import {RootState} from "../../redux/RootReducer";

type channelIndexNavigationProps = BottomTabNavigationProp<HomeRootParams>;

const ChannelIndex = ({navigation, state} : BottomTabBarProps) => {

    //States
    const [channelList, setChannelList] = useState([] as ChannelTypes[]);

    const getChannelData = async () => {
        const username = await AsyncStorage.getItem("uid").then(result => result);
        await axios.get(`/channel/get?username=${username}`)
            .then(res => {
                const channelData : ChannelTypes[] = res.data;
                setChannelList(channelData);
                console.log(channelData);
            })
    }

    //Redux
    const dispatcher = useDispatch();
    const selectedChannel = useSelector((state : RootState) => state.channel.selectedChannel);

    const dummyData = [
        {
            title : 'Dummy Title',
            description : 'Testing...'
        }
    ]

    const TopNav = () => {
        return (
            <TopNavigation
                title={'📋 내 채널'}
                alignment={'center'}
            />
        )
    }

    const setSelectedChannel = (navigation : any, selectedChannel : number) => {
        dispatcher(saveSelectedChannel(selectedChannel));
        navigation.navigate("Postings");
    }

    const renderItems = ({item, index} : ListRenderItemInfo<any>) => {
        return (
            <ListItem
                style={styles.listItem}
                title={item.chanName}
                description={item.chanAnnounce}
                onPress={() => setSelectedChannel(navigation, item.chanIdx)}
            />
        )
    }

    useEffect(() => {
        getChannelData();
    },[]);

    return (
        <Layout style={styles.container} level={'3'}>
            <TopNav/>
            <Layout style={styles.sortingContainer} level={'3'}>
                <Text>⭐️ 모든 채널</Text>
            </Layout>
            <List data={channelList} renderItem={renderItems}/>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    sortingContainer : {
        padding : 10,
        alignItems : "center"
    },
    listItem : {
    }
})

export default ChannelIndex;
