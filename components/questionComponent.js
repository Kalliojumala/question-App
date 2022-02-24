import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import React, {useEffect, useState} from "react";
import GameOver from "./gameoverComponent";

const QuestionComponent = ({ questionData, getNextQuestion, gameOver }) => {

	const [buttonOutlines, setButtonOutlines] = useState(["white","white","white","white"]);
	const [buttonState, setButtonState] = useState(false)

	useEffect(() => {
		setButtonOutlines(["white","white","white","white"])
		setButtonState(false)
	}, [questionData])

	const handleAnswer = (userAnswer, i) => {
		setButtonState(true)
		const correctIndex = questionData.options.indexOf(questionData.a)
		console.log(correctIndex)
		if (userAnswer == questionData.a) {
      
			const recoloredButtons = matchColorArrays(i, i);
			setButtonOutlines(recoloredButtons);
    }
		else {
			
			const recoloredButtons = matchColorArrays(i, correctIndex);
			setButtonOutlines(recoloredButtons);

		}
		setTimeout(() => {getNextQuestion()}, 4000);
		
		
	}
	
	const matchColorArrays = (i, correct) => {
		var blank = ["white","white","white","white"]
		if (correct == i)  {
		blank.splice(i, 1, "green")
		return blank;

		}
		else {
			blank.splice(correct, 1, "green")
			blank.splice(i, 1, "red")
			return blank;
		}
	}
	if(gameOver) {
		return (
		<GameOver />
		)
	}
  return (
    <ScrollView>
    <View style={styles.componentContainer}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{questionData.q}</Text>
      </View>
      {questionData.options.map((item, i) => 
      <View key={i} style={styles.buttonContainer}>
          <TouchableOpacity disabled={buttonState}  onPress={() => handleAnswer(item, i)} style={[styles.button, styles.buttonOutline, {backgroundColor: buttonOutlines[i]}]}>
              <Text style={[styles.buttonText, styles.buttonOutlineText]}>{item}</Text>
          </TouchableOpacity>
        </View>
        )}
      
    </View>
    </ScrollView>
  );
};

export default QuestionComponent;

const styles = StyleSheet.create({
  componentContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: 'column',
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
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    
    },
    button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
    },

    buttonOutline: {
       
        marginTop: 5,
        borderWidth: 2,

}
});
