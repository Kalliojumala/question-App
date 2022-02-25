import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const StatsFlatListItem = ( stats ) => {
  return (
    <View style={styles.flatlistContainer}>
      <View style={styles.flatlistItem}>
        <Text style={styles.titleText}>{stats}</Text>
        <Text style={styles.titleText}>Nice work! Keep working on it!</Text>
        <Text style={styles.titleText}>Nice work! Keep working on it!</Text>
      </View>
    </View>
  );
};

const Gameover = ({ stats }) => {
  const navigation = useNavigation();
  var totalCorrect = 0;
  console.log(stats);
  stats.map(({ correct }) => {
    if (correct) {
      totalCorrect += 1;
    }
  });
  console.log(stats);

  return (
    <ScrollView>
      <View style={styles.componentContainer}>
        <View style={styles.recapContainer}>
          <Text style={styles.titleText}>
            {totalCorrect} out of {stats.length}!
          </Text>
          <Text style={styles.titleText}>Nice work! Keep working on it!</Text>
        </View>
        <View style={styles.recapContainer}>
          <FlatList
            horizontal
            data={stats}
            renderItem={(item) => (
              <StatsFlatListItem stats={item}/>)}
            pagingEnabled={true}
            snapToAlignment="start"
            keyExtractor={(item) => item.q}
          />
        </View>
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
      </View>
    </ScrollView>
  );
};

export default Gameover;

const styles = StyleSheet.create({
  componentContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  recapContainer: {
    width: "85%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 2,
  },
  flatlistContainer: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatlistItem: {
    padding: 40,
  },
  titleText: {
    fontSize: 20,
  },

  buttonContainer: {
    width: "80%",
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
    backgroundColor: "white",
  },
});
