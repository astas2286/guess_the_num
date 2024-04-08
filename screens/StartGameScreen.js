import React,{ useState } from "react"
import { TextInput,StyleSheet,View,Alert,useWindowDimensions,KeyboardAvoidingView,ScrollView } from "react-native"
import PrimaryButton from "../components/ui/PrimaryButton"
import Colors from "../constants/colors"
import Title from "../components/ui/Title"
import Card from "../components/ui/Card"
import InstructionText from "../components/ui/InstructionText"

function StartGameScreen({ onPickNumber }) {
    const [enteredNumber,setEnteredNumber] = useState('')

    const { width,height } = useWindowDimensions()

    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText)
    }

    function resetInputHandler() {
        setEnteredNumber('')
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber)

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number',
                'Enter number between 1 and 99',
                [{ text: 'Okay',style: "destructive",onPress: resetInputHandler }]
            )
            return
        }

        onPickNumber(chosenNumber)
    }

    const margirTopDistance = height < 380 ? 30 : 100
    const titleColor = height < 380 ? 'white' : Colors.accent500

    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior="position">
                <View style={[styles.rootContainer,{ marginTop: margirTopDistance }]}>
                    <Title>Guess My Number</Title>
                    <Card>
                        <InstructionText
                        >Enter a number</InstructionText>
                        <TextInput
                            style={[styles.numberInput,{ color: titleColor }]}
                            maxLength={2}
                            keyboardType="number-pad"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={enteredNumber}
                            onChangeText={numberInputHandler}
                        />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default StartGameScreen

// const {width,height} = Dimensions.get('window') it is better to use useWindowDimensions

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
        //  marginTop: marginTop,
        alignItems: 'center',
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        // color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    }
});