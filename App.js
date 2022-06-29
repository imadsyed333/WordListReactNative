import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, StatusBar, KeyboardAvoidingView, TouchableOpacity, Platform, Dimensions} from 'react-native';
import WordList from './components/WordList';
import DialogBox from './components/DialogBox';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import {Feather, Entypo} from '@expo/vector-icons'

export default function App() {
  const [visible, setVisible] = useState(false);
  const [words, setWords] = useState([]);
  const [tempWords, setTempWords] = useState([]);
  const [query, setQuery] = useState("");

  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [meaning, setMeaning] = useState("")

  const[currId, setCurrId] = useState("")

  const [dialogFunction, setDialogFunction] = useState("Add Word")

  const retrieveWords = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("wordlist")
      if (jsonValue !== null) {
        const newWords = JSON.parse(jsonValue)
        setWords(newWords)
        setTempWords(newWords)
      }
    } catch (error) {
      alert("no words?")
    }
  }

  const onAdd = () => {
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
    setName("")
    setType("")
    setMeaning("")
  }

  const onCancel = () => {
    setVisible(false)
    setName("")
    setType("")
    setMeaning("")
  }

  const handleAddPress = () => {
      setCurrId("")
      setDialogFunction("Add Word")
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

  const handleEdit = (id) => {
    setCurrId(id)
    const prevIndex = words.findIndex(item => item.id === id)
    const word = words[prevIndex]
    setName(word.name)
    setType(word.type)
    setMeaning(word.meaning)
    setDialogFunction("Update Word")
    setVisible(true)
  }

  const editWord = () => {
    const newWords = [...words]
    const prevIndex = words.findIndex(item => item.id === currId)
    newWords[prevIndex].name = name
    newWords[prevIndex].type = type
    newWords[prevIndex].meaning = meaning
    setWords(newWords)
    setTempWords(newWords)
    saveWords(newWords)
    setName("")
    setType("")
    setMeaning("")
    setVisible(false)
  }

  const handleDialogFunction = () => {
    if (dialogFunction === "Add Word") {
      onAdd()
    } else if (dialogFunction === "Update Word") {
      editWord()
    }
  }

  const importWords = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync()
      const file = await FileSystem.readAsStringAsync(result.uri)
      const importedWords = JSON.parse(file)
      const newWords = [...words, ...importedWords]
      const uniqueWords = [...new Map(newWords.map((item) => [item.id, item])).values()]
      uniqueWords.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
      saveWords(uniqueWords)
      setWords(uniqueWords)
      setTempWords(uniqueWords)
    } catch (error) {
      console.log(error)
    }
  }

  const exportWords = async () => {
    let fileUrI = FileSystem.documentDirectory + "words.json"
    await FileSystem.writeAsStringAsync(fileUrI, JSON.stringify(words))
    await Sharing.shareAsync(fileUrI)
  }

  const clearWords = () => {
    setWords([])
    setTempWords([])
  }

  useEffect(() => {
    retrieveWords()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection:'row'}}>
        <Text style={styles.title}>WordList</Text>
        <View style={{flexDirection:'row', justifyContent:'space-around', position:'absolute', right: 10, top: 10}}>
          <TouchableOpacity onPress={() => importWords()} style={styles.command}>
            <Feather name="arrow-down-left" size={40} color="#3C91E6" />
          </TouchableOpacity>
          <TouchableOpacity onPress={exportWords} style={styles.command}>
            <Feather name="arrow-up-right" size={40} color="#7CEA9C" />
          </TouchableOpacity>
          <TouchableOpacity onPress={clearWords} style={styles.command}>
            <Entypo name="cross" size={40} color="#DE3C4B" />
          </TouchableOpacity>
        </View>
      </View>
      <TextInput style={styles.search} placeholder='search for words here' onChangeText={onSearch} value={query}/>
      <WordList words={tempWords} style={styles.list} onDelete={removeWord} onEdit={handleEdit}/>
      <TouchableOpacity style={styles.button} onPress={handleAddPress}>
        <Text style={{fontWeight: 'bold', color: '#303030', fontSize: 30}}>+</Text>
      </TouchableOpacity>
      <DialogBox visible={visible} handleAction={handleDialogFunction} handleCancel={onCancel} name={name} type={type} meaning={meaning} setName={setName} setType={setType} setMeaning={setMeaning} dialogFunction={dialogFunction}/>
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
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight : 0,
  },
  title: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  button: {
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#73FBD3',
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
    margin:10,
  },
  list: {
    alignSelf: 'stretch',
  },
  command: {
    height: 40, 
    width: 40, 
    borderRadius: 10, 
    alignContent:'center', 
    justifyContent: 'center'
  }
});
