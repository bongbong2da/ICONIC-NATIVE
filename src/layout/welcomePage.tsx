import React from 'react';
import {Layout, Text, TopNavigation} from "@ui-kitten/components";
import {StyleSheet} from "react-native";
import AnimatedLottieView from "lottie-react-native";

const WelcomePage = () => {
    return (
        <Layout style={styles.container} level={'4'}>
            <TopNavigation
                title={'👋ICONIC에 오신것을 환영합니다.'}
                subtitle={'채널에 가입하고 새로운 소식을 확인해보세요!'}
            />
            <AnimatedLottieView style={styles.welcomeImage} source={require('../../assets/lottie/14482-welcome-onboard.json')} autoPlay loop={false}/>
            <Text style={{marginTop : 10}} category={"p2"} status={'primary'}>
                🚀 개발자 노트
                - 모바일 버전이 출시되었습니다.
            </Text>
        </Layout>
    )
}

const styles = StyleSheet.create({
   container : {
       flex : 1,
       alignItems : "center"
   },
    welcomeImage : {
       height : 350
   }
});

export default WelcomePage;
