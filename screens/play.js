import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Button } from "react-native";
import React from "react";
import QuestionComponent from "../components/questionComponent";
import GameOver from "../components/gameoverComponent";
import { SafeAreaView } from "react-native-safe-area-context";
//Logic/Data file for the "game"/quiz
const PlayScreen = () => {

	//Training Data
  const dummydata = [
    {
      q: "how many stuff in things?",
      a: "16",
      options: ["16", "okay", "27", "5000"],
    },
    {
      q: "how many things in stuff?",
      a: "16",
      options: ["16", "toinen kyssäri", "22347",],
    },
  ];

	//Init needed states, displayInfo = data rendered, listIndex for fetching new items.
  const [displayedInformation, setDisplayedInformation] = useState(
    dummydata[0]
  );
  const [listIndex, setListIndex] = useState(0);
	const [gameOver, setGameOver] = useState(false)
	const [stats, setStats] = useState([])

	//Reset "gamestate" just incase
	useEffect(() => {
		setGameOver(false)
	}, [])

	//Effect to change questionComponent content
  useEffect(() => {
    setDisplayedInformation(dummydata[listIndex]);
  }, [listIndex]);

  //Gets next question, this func is passed to QuestionComponent and called when the user selects an item.
  const getNextQuestion = () => {
    
    if (listIndex < dummydata.length-1) {
      setListIndex((previousValue) => previousValue + 1);
    } else {
      setGameOver(true);
    }
  };

  if (gameOver) {
    return (
    <SafeAreaView style={styles.playContainer}>
      <GameOver stats={stats}/>
    </SafeAreaView>
    )
  }
  return (

    
    <SafeAreaView style={styles.playContainer}>
    
      <QuestionComponent
        getNextQuestion={getNextQuestion}
        questionData={displayedInformation}
				setStats={setStats}
        stats={stats}
        
      />
    </SafeAreaView>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({
  playContainer: {
    width: "100%",
    height: "100%",
    flex: 1,
    
  },
});
