import React from 'react';
import {Layout, List, ListItem, TopNavigation} from "@ui-kitten/components";
import {ListRenderItemInfo, StyleSheet} from "react-native";

const FriendMain = () => {

    const dummyData = [
        {
            title : '김철수',
            description : '최근 메세지'
        }
    ]

    const TopNav = () => {
        return (
            <TopNavigation
                title={'친구'}
                alignment={"center"}
            />
        )
    }

    const renderItem = ({item, index} : ListRenderItemInfo<any>) => {
        return (
            <ListItem
                onPress={()=>alert("clicked!")}
                title={item.title}
                description={item.description}
            />
        )
    }

    return (
        <Layout style={styles.container} level={'3'}>
            <TopNav/>
            <List data={dummyData} renderItem={renderItem}/>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    }
});

export default FriendMain;
