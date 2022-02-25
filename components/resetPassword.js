import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import Icon from "react-native-vector-icons/AntDesign";
import { errorPrefix } from "@firebase/util";

const ResetPassword = ({ toggleVisible }) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  //Password reset handle, TODO: pop up to ask for email and change second param to input value!
  async function handlePasswordReset() {
    const isValid = email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
    if (isValid) {
      await sendPasswordResetEmail(auth, email)
        .then((result) => {
          console.log("Email sent!");
          setEmail("");
          setSent(true);
          setErrorMessage(null);
        })
        .catch((e) => {
          console.log("Error", e.message, e);
          setErrorMessage("Email address has not been registered!");
        });
    } else {
      setErrorMessage("Please enter a valid email!");
    }
  }
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity onPress={toggleVisible} style={styles.closeButton}>
        <Icon name="close" size={40} />
      </TouchableOpacity>
      <View style={styles.modalBox}>
        <View style={styles.inputContainer}>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter email..."
            style={styles.textInput}
          />
        </View>
        {sent ? (
          <Text style={[styles.text, {color: "green"}]}>Reset Email sent!</Text>
        ) : errorMessage ? (
          <Text style={[styles.text, {color: "red"}]}>{errorMessage}</Text>
        ) : <Text style={styles.text}></Text>}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handlePasswordReset}
            style={[styles.button, styles.buttonOutline]}
            disabled={sent}
          >
            <Text style={[styles.buttonText, styles.buttonOutlineText]}>
              Send Reset Email
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  inputContainer: {
    width: "80%",
  },
  modalBox: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    minHeight: 250,
    width: "80%",
    borderWidth: 2,
    backgroundColor: "white",
  },
  textInput: {
    color: "black",
    marginTop: 5,
    textAlignVertical: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
  },

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderWidth: 2,
  },
  text: {
    marginVertical: 5,
    fontSize: 15,
  },
  closeButton: {
    height: 50,
    width: 50,
    backgroundColor: "white",
    borderRadius: 50,
    alignSelf: "flex-end",
    marginRight: 25,
    top: 25,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
});
