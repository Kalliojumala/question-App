import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Gameover = () => {

  const  navigation = useNavigation(); 

  return (
    <View>
      <ScrollView>
        <Text>Game Over!</Text>
        <Text>Want to play again?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("HomeScreen");
            }}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={[styles.buttonText, styles.buttonOutlineText]}>
              Home
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Gameover;

const styles = StyleSheet.create({});
