import React from "react"
import { Text,View,Pressable,StyleSheet } from "react-native"


function PrimaryButton({ children }) { //we have to call props and then props.children, but we just use destructuring
    function pressHandler() {
        console.log('bop');
    }


    return (
        <View style={styles.buttoOuterContainer}>
            <Pressable 
            style={({pressed})=>pressed ? [styles.pressed,styles.buttonInnerContainer] : styles.buttonInnerContainer} 
            onPress={pressHandler} 
            android_ripple={{ color: '#57053b' }}
            >
                <Text style={styles.buttonText}>
                    {children}
                </Text>
            </Pressable>
        </View>
    )
}
export default PrimaryButton

const styles = StyleSheet.create({
    buttoOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
        backgroundColor: '#940764',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    pressed:{
        opacity: 0.75
    }
})