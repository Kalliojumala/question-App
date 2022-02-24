import {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import {auth} from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';

export default LoginScreen = ({ navigation }) => {

    //Init states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    //Effect to "log in", listens to auth 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if(user) {
                navigation.replace("Home")
            }
        })
        return unsubscribe
    }, [])

    //Handle singup, creates a user to firebase auth
    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password).then(userCreds => {
            const user = userCreds.user;
            console.log(user);
        } )
        .catch(error => alert(error.message))

    }

    //Handle login with email and password, other logins maybe added in the future?
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password).then(userCreds => {
            const user = userCreds.user;
            console.log(user);
        } )
        .catch(error => alert(error.message))

    }

    //Password reset handle, TODO: pop up to ask for email and change second param to input value!
    const handlePasswordReset = () => {
      sendPasswordResetEmail(auth, "joel.kallio@gmail.com")
    }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput value={email} onChangeText={text => setEmail(text)} placeholder="Email" style={styles.textInput}/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput value={password} onChangeText={text => setPassword(text)} placeholder="Password" style={styles.textInput} secureTextEntry={true}/>
      </View>
      
      <TouchableOpacity onPress={handlePasswordReset} style={styles.resetText}>
              <Text style={styles.resetText}>Forgot your password?</Text>
      </TouchableOpacity>
      
      <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={[styles.button, styles.buttonOutline]}>
              <Text style={[styles.buttonText, styles.buttonOutlineText]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignup} style={[styles.button, styles.buttonOutline]}>
              <Text style={[styles.buttonText, styles.buttonOutlineText]}>Register</Text>
          </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

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
      marginTop: 30,
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

  },
  resetText: {
    marginTop: 5,
    fontSize: 15,
    color: 'blue'
  }

});
