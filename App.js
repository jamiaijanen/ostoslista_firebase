import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue } from 'firebase/database';
import React, { useState, useEffect } from 'react';

export default function App() {

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);

  const firebaseConfig = {
    apiKey: "AIzaSyBF4HyezCmpJ7Busv9T6uwzicTFbSmNmq0",
    authDomain: "ostoslista-a3547.firebaseapp.com",
    databaseURL: "https://ostoslista-a3547-default-rtdb.firebaseio.com",
    projectId: "ostoslista-a3547",
    storageBucket: "ostoslista-a3547.appspot.com",
    messagingSenderId: "246934048561",
    appId: "1:246934048561:web:ba5e0db5a8adad71e56a10"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  useEffect(() => {
    const itemsRef = ref(database, 'items/');  
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data == null) {

      } else {
      setItems(Object.values(data));
      }
    })
  }, []);

  const saveItem = () => {  
    push(    
      ref(database, 'items/'),    
      { 'product': product, 'amount': amount });
    }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={product => setProduct(product)} value={product} placeholder="product" />
      <TextInput style={styles.input} onChangeText={amount => setAmount(amount)} value={amount} placeholder="amount" />
      <Button onPress={saveItem} title="save" />
      <Text style={styles.text}>Shopping list</Text>
      <FlatList 
        renderItem={({item}) =>
          <View>
            <Text>{item.product}, {item.amount} </Text>
          </View>}
          data={items}
        />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 240,
    margin: 12,
    borderWidth: 1,
  },
});
