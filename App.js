import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, StatusBar, KeyboardAvoidingView, TouchableOpacity, Platform, Dimensions} from 'react-native';
import WordList from './components/WordList';
import DialogBox from './components/DialogBox';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'

export default function App() {
  const [visible, setVisible] = useState(false);
  const [words, setWords] = useState([]);
  const [tempWords, setTempWords] = useState([]);
  const [query, setQuery] = useState("");

  const retrieveWords = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("wordlist")
      if (jsonValue !== null) {
        newWords = JSON.parse(jsonValue)
        setWords(newWords)
        setTempWords(newWords)
      }
    } catch (error) {
      alert("no words?")
    }
  }

  const onAdd = (name, type, meaning) => {
    const word = {
      id: uuid.v4(), 
      name: name,
      type: type, 
      meaning: meaning,
    }
    let newWords = [...words, word]
    newWords.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    saveWords(newWords)
    setWords(newWords)
    setTempWords(newWords)
    setVisible(false)
  }

  const onCancel = () => {
    setVisible(false)
  }

  const handlePress = () => {
      setVisible(true)
  }

  const saveWords = (newWords) => {
    try {
      const jsonValue = JSON.stringify(newWords)
      AsyncStorage.setItem("wordlist", jsonValue)
    } catch (error) {
      console.log("words could not be saved")
    }
  }

  const onSearch = (query) => {
    setQuery(query)
    setTempWords(words.filter((a) => {
      return a.name.startsWith(query)
    }))
  }

  const removeWord = (id) => {
    const newData = [...words]
    const prevIndex = words.findIndex(item => item.id === id)
    newData.splice(prevIndex, 1)
    saveWords(newData)
    setWords(newData)
    setTempWords(newData)
  }

  useEffect(() => {
    retrieveWords()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>WordList</Text>
      <TextInput style={styles.search} placeholder='search for words here' onChangeText={onSearch} value={query}/>
      <WordList words={tempWords} style={styles.list} onDelete={removeWord}/>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#303030'}}>+</Text>
      </TouchableOpacity>
      <DialogBox visible={visible} handleAdd={onAdd} handleCancel={onCancel} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    paddingHorizontal: 20,
    paddingStart: 20, 
    paddingEnd:20,
    paddingTop: StatusBar.currentHeight,
  },
  title: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  button: {
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#34E4EA',
    height: 70,
    width: 70,
    right:10,
    bottom:10,
    borderRadius: 100,
    color: "black",
    position: 'absolute'
  },
  search: {
    backgroundColor:"white",
    color: 'black',
    opacity: 0.4,
    fontSize: 15,
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  list: {
    alignSelf: 'stretch',
  }
});
