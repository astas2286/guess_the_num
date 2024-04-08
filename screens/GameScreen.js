import React,{ useEffect,useState } from "react"
import { View,StyleSheet,Alert,Text,FlatList,useWindowDimensions } from "react-native"
import { Ionicons } from '@expo/vector-icons'

import Card from "../components/ui/Card";
import Title from "../components/ui/Title"
import PrimaryButton from "../components/ui/PrimaryButton";
import NumberContainer from "../components/game/NumberContainer";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/guessLogItem";

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
    const [guessRounds,setGuessRounds] = useState([initialGuessNumber])
    const { width,height } = useWindowDimensions()

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length)
        }
    },[currentGuess,userNumber,onGameOver])

    useEffect(() => {
        minBoundary = 1
        maxBoundary = 100
    },[])

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
        setGuessRounds(prevGuessRounds => [newRandomNumber,...prevGuessRounds])
    }

    const guessRoundsListLength = guessRounds.length

    let content = <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.instructionText}>Higher or lower</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this,'lower')}>
                        <Ionicons name="remove-outline" size={24} color="white" />
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this,'greater')}>
                        <Ionicons name="add-outline" size={24} color="white" />
                    </PrimaryButton>
                </View>
            </View>
        </Card>
    </>

    if (width > 500) {
        content = <>
            <View style={styles.buttonsContainerWide}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this,'lower')}>
                        <Ionicons name="remove-outline" size={24} color="white" />
                    </PrimaryButton>
                </View>
                <NumberContainer>{currentGuess}</NumberContainer>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this,'greater')}>
                        <Ionicons name="add-outline" size={24} color="white" />
                    </PrimaryButton>
                </View>
            </View>
        </>
    }

    return (
        <View style={styles.screen}>
            <Title>Oponent's guess</Title>
            {content}
            <View style={styles.listContainer}>
                {/* {guessRounds.map((guessRound) => <Text key={guessRound}>{guessRound}</Text>)} */}
                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) => (
                        <
                            // @ts-ignore
                            GuessLogItem
                            roundNumber={guessRoundsListLength - itemData.index}
                            guess={itemData.item}>
                            {itemData.item}
                        </GuessLogItem>
                    )}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    )
}
export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    instructionText: {
        marginBottom: 20
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
    buttonsContainerWide: {
     flexDirection: 'row',
     alignItems: 'center',   
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
})