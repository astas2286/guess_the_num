import React,{ useEffect,useState } from "react"
import { View,Text,StyleSheet,Alert } from "react-native"
import Title from "../components/ui/Title"
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

function generateRandomBetween(min,max,exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min,max,exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1
let maxBoundary = 100

function GameScreen({ userNumber,onGameOver }) {
    const initialGuessNumber = generateRandomBetween(1,100,userNumber) // change it using useMemo instead of hardcoding
    const [currentGuess,setCurrentGuess] = useState(initialGuessNumber)

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver()
        }
    },[currentGuess, userNumber, onGameOver])

    function nextGuessHandler(direction) {
        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)
        ) {
            Alert.alert(
                'Don`t lie',
                "You know this is wrong",
                [{ text: 'Sorry!',style: 'cancel' }])
            return
        }
        if (direction === 'lower') {
            maxBoundary = currentGuess
        } else {
            minBoundary = currentGuess + 1
        }
        const newRandomNumber = generateRandomBetween(minBoundary,maxBoundary,currentGuess)
        setCurrentGuess(newRandomNumber)
    }


    return (
        <View style={styles.screen}>
            <Title>{'Oponent\'s guess'}</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View>
                <Text >
                    Higher or lower
                </Text>
                <View>
                    <PrimaryButton onPress={nextGuessHandler.bind(this,'lower')}>-</PrimaryButton>
                    <PrimaryButton onPress={nextGuessHandler.bind(this,'greater')}>+</PrimaryButton>
                </View>
            </View>
            {/* <View>LOG ROUNDS</View> */}
        </View>
    )
}
export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    },
})