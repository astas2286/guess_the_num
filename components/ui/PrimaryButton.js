import React from "react"
import { Text,View,Pressable,StyleSheet } from "react-native"
import Colors from "../../constants/colors"

function PrimaryButton({ children, onPress }) { //we have to call props and then props.children, but we just use destructuring
    


    return (
        <View style={styles.buttoOuterContainer}>
            <Pressable 
            style={({pressed})=>pressed 
            ? [styles.pressed,styles.buttonInnerContainer] 
            : styles.buttonInnerContainer} 
            onPress={onPress} 
            android_ripple={{ color: Colors.primary600 }}
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
        backgroundColor: Colors.primary500,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    pressed:{
        opacity: 0.75
    }
})