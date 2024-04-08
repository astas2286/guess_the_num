import React,{ useState } from 'react';
import { StyleSheet,ImageBackground,SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber,setUserNumber] = useState(null)
  const [gameIsOver,setGameIsOver] = useState(true)
  const [numberRounds,setNumberRounds] = useState(0)

  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    // @ts-ignore
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    // @ts-ignore
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    SplashScreen.hideAsync(); // Hide the splash screen once the fonts are loaded
  }


  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }

  // @ts-ignore
  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true)
    setNumberRounds(numberOfRounds)
  }

  function startNewGameHandler() {
    setUserNumber(null)
    setGameIsOver(false)
    setNumberRounds(0)
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={numberRounds} onStartNewGame={startNewGameHandler} />
  }


  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700,Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          // @ts-ignore
          source={require('./assets/images/background.png')}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.bgImage}
        >
          <SafeAreaView style={styles.rootScreen}>
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  bgImage: {
    opacity: 0.15
  }
});
