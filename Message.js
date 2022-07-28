import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

export default function Message({ id, userId, body, title, selectedMessage, deleteMessage }) {
  return (
    <View style={styles.message}>
      <Text style={styles.heading}>{id}.{title}</Text>
      <Text style={styles.body}>{body}</Text>
      <Button title="Edit" onPress={() => selectedMessage({ id, title, description: body })} />
      <Button title="Delete" color="tomato" onPress={() => deleteMessage(id)} />
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    padding: 5,
  },
  body: {
    fontSize: 14,
    padding: 5,
  },
  message: {
    padding: 10,
    margin: 10
  }
})
