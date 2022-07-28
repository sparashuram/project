import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Login from './Login';
import Message from './Message';
import OnboardingScreen from './Onboarding';

export default function UsersList() {
  const [messages, setMessages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const fetchMessages = () => {
    //GET Method
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10", {
      method: "GET"
    })
      .then((response) => response.json())
      .then(data => setMessages(data))
  }
  const addMessage = () => {
    //POST Method
    const requestBody = {
      title,
      body: description
    }
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(requestBody)
    })
      .then((response) => response.json())
      .then(data => {
        if (data) {
          requestBody.id = messages.length + 1;
          let updatedMessages = [...messages, requestBody]
          setMessages(updatedMessages);
        }
      })
  }
  const updateMessage = () => {
    //PUT Method
    const requestBody = {
      title,
      body: description
    }
    fetch("https://jsonplaceholder.typicode.com/posts/" + selectedId, {
      method: "PUT",
      body: JSON.stringify(requestBody)
    })
      .then((response) => response.json())
      .then(data => {
        if (data) {
          let updatedMessages = [...messages];
          let index = updatedMessages.findIndex((message) => message.id === selectedId);
          updatedMessages[index] = { ...updatedMessages[index], ...requestBody }
          setMessages(updatedMessages);
          setSelectedId(null);
          setTitle("");
          setDescription("")
        }
      })
  }
  const deleteMessage = (id) => {
    //DELETE Method
    fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(data => {
        if (data) {
          let updatedMessages = [...messages];
          let index = updatedMessages.findIndex((message) => message.id === id);
          updatedMessages.splice(index, 1);
          setMessages(updatedMessages);
        }
      })
  }
  const selectedMessage = (requestBody) => {
    setTitle(requestBody.title);
    setDescription(requestBody.description);
    setSelectedId(requestBody.id)
  }
  useEffect(() => {
    fetchMessages();
  }, [])
  return (
    <View>
      <Text style={styles.heading}>DashBoard</Text>
      <Button title="Log out"  onPress={() =>alert('user was logged out')}/>
      <View style={styles.form}>
        <TextInput
          placeholder='Add Employ Name'
          style={styles.input}
          value={title}
          onChangeText={(text) => setTitle(text)} />
        <TextInput
          placeholder='Add Employ Details'
          style={styles.input}
          value={description}
          onChangeText={(text) => setDescription(text)} />
        <TouchableOpacity style={styles.button} onPress={selectedId === null ? addMessage : updateMessage}>
          <Text style={styles.add}>{selectedId === null ? "Add" : "Update"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <FlatList
          data={messages}
          renderItem={({ item }) =>
            <Message
              {...item}
              selectedMessage={selectedMessage}
              deleteMessage={deleteMessage}
            />}
          ItemSeparatorComponent={() => (<View style={styles.border} />)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
    backgroundColor: "black",
    padding: 5
  },
  border: {
    borderWidth: 0.5,
    borderColor: "lightgray",
  },
  input: {
    borderWidth: 1,
    padding: 5
  },
  button: {
    backgroundColor: "black",
    padding: 5
  },
  add: {
    color: "white",
    textAlign: "center",
    fontSize: 16
  },
  form: {
    padding: 10,
    margin: 10
  },
  list: {
    height: 500
  }
})


