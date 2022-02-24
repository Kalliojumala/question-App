import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Button } from "react-native";
import React from "react";
import QuestionComponent from "../components/questionComponent";

const PlayScreen = () => {
  const dummydata = [
    {
      q: "how many stuff in things?",
      a: "16",
      options: ["16", "okay", "27", "5000"],
    },
    {
      q: "how many things in stuff?",
      a: "16",
      options: ["16", "toinen kyssäri", "22347", "1230"],
    },
  ];

  const [displayedInformation, setDisplayedInformation] = useState(
    dummydata[0]
  );
  const [listIndex, setListIndex] = useState(0);
	const [gameOver, setGameOver] = useState(false)

	useEffect(() => {
		setGameOver(false)
	}, [])

  useEffect(() => {
    setDisplayedInformation(dummydata[listIndex]);
  }, [listIndex]);

  //Test function
  const getNextQuestion = () => {
    
    if (listIndex < dummydata.length-1) {
      setListIndex((previousValue) => previousValue + 1);
    } else {
      setGameOver(true);
    }
  };

  return (
    <View style={styles.playContainer}>
      <QuestionComponent
        getNextQuestion={getNextQuestion}
        questionData={displayedInformation}
				gameOver={gameOver}
        
      />
    </View>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({
  playContainer: {
    width: "100%",
    height: "100%",
  },
});
