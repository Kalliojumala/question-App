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
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export default LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if(user) {
                navigation.replace("Home")
            }
        })
        return unsubscribe
    }, [])

    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password).then(userCreds => {
            const user = userCreds.user;
            console.log(user);
        } )
        .catch(error => alert(error.message))

    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password).then(userCreds => {
            const user = userCreds.user;
            console.log(user);
        } )
        .catch(error => alert(error.message))

    }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput value={email} onChangeText={text => setEmail(text)} placeholder="Email" style={styles.textInput}/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput value={password} onChangeText={text => setPassword(text)} placeholder="Password" style={styles.textInput} secureTextEntry={true}/>
      </View>

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
