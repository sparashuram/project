import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider';
import App from '../App';
import Login from './Login';
import Register from './Register';
import UsersList from './UsersList';
const slides = [
  {
    key: 1,
    title: 'Dashboard',
    text: 'This is simple Employ Detils',
    image: require('../assets/logo.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Authentication',
    text: 'Other cool stuff',
    image: require('../assets/logo.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Get Strated',
    text: 'Ready to Login',
    image: require('../assets/logo.png'),
    backgroundColor: '#22bcb5',
  }
];
export default function OnboardingScreen() {
  const [showRealApp, setShowRealApp] = useState(false);
  const [screen, setScreen] = useState("Register");
  const _renderItem = ({ item }) => {
    return (
      <ImageBackground source={require("../assets/bg.png")} style={styles.bgImg}>
        <View style={[styles.slide]}>
          <Text style={styles.title}>{item.title}</Text>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </ImageBackground>
    );
  }
  const _onDone = () => {
    setShowRealApp(true)
  }
  if (showRealApp) {
    if (screen === "Register") {
      return <Register setScreen={(text) => setScreen(text)} />;
    } else if (screen === "Login") {
      return <Login setScreen={(text) => setScreen(text)} />
    } else if (screen === "UsersList") {
      return <UsersList />
    }
  } else {
    return <AppIntroSlider renderItem={_renderItem} data={slides} onDone={_onDone} />;
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  title: {
    fontSize: 30,
    color: "white"
  },
  text: {
    fontSize: 20,
    color: "white"
  },
  image: {
    margin: 10,
    width: "95%",
    borderRadius: 50
  },
  bgImg: {
    width: "100%",
    height: "100%"
  }

})