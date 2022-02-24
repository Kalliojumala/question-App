import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { signOut } from 'firebase/auth';
import {auth} from '../firebaseConfig';

const HomeScreen = ({navigation}) => {
    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigation.replace("Login")
        })
        .catch(error => error.message)
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Text>Welcome to questionApp!</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => {navigation.navigate("PlayScreen")}} style={[styles.button, styles.buttonOutline]}>
              <Text style={[styles.buttonText, styles.buttonOutlineText]}>Play</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignOut} style={[styles.button, styles.buttonOutline]}>
              <Text style={[styles.buttonText, styles.buttonOutlineText]}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

export default HomeScreen;
  const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
  
    inputContainer: {
      width: "80%",
      
      
    },
    textInput: {
      color: 'black',
      marginTop: 5,
      textAlignVertical: "center",
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
    },
  
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center'
    },
  
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderWidth: 2,
  
    }
  
  });