import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-web";

export default function WordScreen(props) {
  useEffect(() => {
    GetSynonyms();
  }, []);
  const GetSynonyms = async () => {
    const synList = [];

    try {
      const dictResponse = await fetch(
        "https://api.dictionaryapi.dev/api/v2/entries/en/" + props.name
      );
      const dictJson = await dictResponse.json();
      for (let i = 0; i < dictJson.length; i++) {
        const meanings = dictJson[i].meanings;
        for (let k = 0; k < meanings; k++) {
          const definitions = meanings[k].definitions;
          synList.concat(meanings[k].synonyms);
          for (let j = 0; j < definitions; j++) {
            synList.concat(definitions[j].synonyms);
          }
        }
      }
      console.log(synList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ backgroundColor: "#C490D1", padding: 10, borderRadius: 10 }}
      >
        <Text style={styles.name}>{props.route.params.name}</Text>
        <Text style={styles.type}>{props.route.params.type}</Text>
        <Text style={styles.meaning}>{props.route.params.meaning}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3c3645",
    paddingHorizontal: 10,
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
  },

  text: {
    color: "black",
  },

  type: {
    paddingTop: 5,
    color: "#303030",
  },

  meaning: {
    paddingTop: 5,
    fontWeight: "bold",
    color: "#303030",
  },
  name: {
    fontWeight: "bold",
    color: "#303030",
    fontSize: 30,
  },
});
