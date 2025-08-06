import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import { sendBroadcast } from 'react-native-boardcast-sender';

export default function App() {
  const [action, setAction] = useState('com.pda.uhfdemo.read');
  const [extras, setExtras] = useState([{ key: 'clear', value: 'clear' }]);
  const [message, setMessage] = useState('');

  const updateExtra = (idx: number, field: 'key' | 'value', val: string) => {
    setExtras((extras) =>
      extras.map((e, i) => (i === idx ? { ...e, [field]: val } : e))
    );
  };

  const addExtra = () => setExtras([...extras, { key: '', value: '' }]);
  const removeExtra = (idx: number) =>
    setExtras((extras) => extras.filter((_, i) => i !== idx));

  const handleSend = () => {
    const extrasObj: { [key: string]: string } = {};
    extras.forEach(({ key, value }) => {
      if (key) extrasObj[key] = value;
    });
    sendBroadcast(action, extrasObj);
    setMessage('Broadcast sent!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Send Broadcast</Text>
      <Text>Action:</Text>
      <TextInput
        style={styles.input}
        value={action}
        onChangeText={setAction}
        placeholder="Action"
      />
      <Text>Extras:</Text>
      {extras.map((extra, idx) => (
        <View key={idx} style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={extra.key}
            onChangeText={(val) => updateExtra(idx, 'key', val)}
            placeholder="Key"
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={extra.value}
            onChangeText={(val) => updateExtra(idx, 'value', val)}
            placeholder="Value"
          />
          <Button
            title="-"
            onPress={() => removeExtra(idx)}
            disabled={extras.length === 1}
          />
        </View>
      ))}
      <Button title="Add Extra" onPress={addExtra} />
      <View style={{ height: 16 }} />
      <Button title="Send Broadcast" onPress={handleSend} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginVertical: 4,
    minWidth: 120,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  message: {
    marginTop: 16,
    color: 'green',
    fontWeight: 'bold',
  },
});
