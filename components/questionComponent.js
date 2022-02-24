import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import GameOver from "./gameoverComponent";

const QuestionComponent = ({ questionData, getNextQuestion, gameOver }) => {
  const [buttonOutlines, setButtonOutlines] = useState([
    "white",
    "white",
    "white",
    "white",
  ]);
  const [buttonState, setButtonState] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

	//No mapping or listing questions so need to reset states when the question data changes.
  useEffect(() => {
    fadeAnim.setValue(0);
    setButtonOutlines(["white", "white", "white", "white"]);
    setButtonState(false);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [questionData]);

  //Function for handling user selection
  const handleAnswer = (userAnswer, i) => {
    //Disable buttons until next question
    setButtonState(true);

    //If correct turn selected block green
    if (userAnswer == questionData.a) {
      const recoloredButtons = matchColorArrays(i, i);
      setButtonOutlines(recoloredButtons);
    }
    //If incorrect find correct a index, turn correct green, userguess/wrong answer red
    else {
      const correctIndex = questionData.options.indexOf(questionData.a);
      const recoloredButtons = matchColorArrays(i, correctIndex);
      setButtonOutlines(recoloredButtons);
    }
    //Short timeout for user to see correct answer before next question
    setTimeout(() => {
      getNextQuestion();
    }, 2500);
  };

  //Function return color arrays for handleAnswer
  const matchColorArrays = (i, correct) => {
    var blank = ["white", "white", "white", "white"];
    if (correct == i) {
      blank.splice(i, 1, "green");
      return blank;
    } else {
      blank.splice(correct, 1, "green");
      blank.splice(i, 1, "red");
      return blank;
    }
  };

  //If out of questions return gameover screen.
  if (gameOver) {
    return <GameOver />;
  }
  return (
    <ScrollView>
      <View style={styles.componentContainer}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{questionData.q}</Text>
        </View>
        {questionData.options.map((item, i) => (
          <Animated.View
            key={i}
            style={[styles.buttonContainer, { opacity: fadeAnim }]}
          >
            <TouchableOpacity
              disabled={buttonState}
              onPress={() => handleAnswer(item, i)}
              style={[
                styles.button,
                styles.buttonOutline,
                { backgroundColor: buttonOutlines[i] },
              ]}
            >
              <Text style={[styles.buttonText, styles.buttonOutlineText]}>
                {item}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
};

export default QuestionComponent;

const styles = StyleSheet.create({
  componentContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  questionContainer: {
    width: "85%",
    height: 280,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 2,
  },

  questionText: {
    fontSize: 20,
  },

  buttonContainer: {
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonOutline: {
    marginTop: 5,
    borderWidth: 2,
  },
});
