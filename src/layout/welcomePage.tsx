import React from 'react';
import {Layout, Text, TopNavigation} from "@ui-kitten/components";
import {StyleSheet} from "react-native";
import AnimatedLottieView from "lottie-react-native";

const WelcomePage = () => {
    return (
        <Layout style={styles.container} level={'4'}>
            <TopNavigation
                title={'πICONICμ μ€μ κ²μ νμν©λλ€.'}
                subtitle={'μ±λμ κ°μνκ³  μλ‘μ΄ μμμ νμΈν΄λ³΄μΈμ!'}
            />
            <AnimatedLottieView style={styles.welcomeImage} source={require('../../assets/lottie/14482-welcome-onboard.json')} autoPlay loop={false}/>
            <Text style={{marginTop : 10}} category={"p2"} status={'primary'}>
                π κ°λ°μ λΈνΈ
                - λͺ¨λ°μΌ λ²μ μ΄ μΆμλμμ΅λλ€.
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
