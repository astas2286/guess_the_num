import React from "react"
import { Text,StyleSheet, Platform } from "react-native"

function Title({ children }) {
  return (
    <Text style={styles.title}>{children}</Text>
  )
}
export default Title

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    // borderWidth: Platform.OS === 'android' ? 2 : 0,
    // borderWidth: Platform.select({ android: 2, ios: 0 }), // this is the same as above
    borderWidth: 2,//.android in file name makes it android specific
    borderColor: 'white',
    padding: 12,
    maxWidth: '80%',
    width: 300
  }
})