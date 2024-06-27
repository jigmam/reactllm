import React, { useState } from 'react';
import { NativeModules, Button, TextInput, Text, View, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons'; // Importa el ícono de herramienta

const { CalendarModule } = NativeModules;

const NewModuleButton = ({ navigation }) => {
  const [textInput, setTextInput] = useState("");
  const [chat, setChat] = useState<{ sender: string, message: string }[]>([{ sender: 'Asistente', message: 'Hola' }]);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const onSubmit = async () => {
    if (textInput.trim() === "") return;

    try {
      setButtonEnabled(true);
      setChat([...chat, { sender: 'Usuario', message: textInput }]);

      const result: string = await CalendarModule.createCalendarEvent(textInput);
      setChat([...chat, { sender: 'Usuario', message: textInput }, { sender: 'Asistente', message: result }]);
      setTextInput("");
    } catch (e) {
      console.error(e);
    } finally {
      setButtonEnabled(false);
    }
  };

  const renderItem = ({ item }: { item: { sender: string, message: string } }) => (
    <View style={item.sender === 'Usuario' ? styles.userMessage : styles.assistantMessage}>
      <Text style={styles.messageSender}>{item.sender}:</Text>
      <Text style={styles.messageText}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chat}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.chatList}
      />
      <View style={styles.footer}>
        <TextInput
          style={styles.textInput}
          onChangeText={setTextInput}
          value={textInput}
          placeholder="Escribe un mensaje..."
        />
        <Button
          title="Enviar"
          color="#841584"
          onPress={onSubmit}
          disabled={buttonEnabled}
        />
        <Button // Botón de configuración con ícono de herramienta
          title=''
          onPress={() => navigation.navigate('Details')}
        >
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  chatList: {
    flex: 1,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#08234d',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    maxWidth: '80%',
    color:'black'
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#323336',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    maxWidth: '80%',
    color:'black'
  },
  messageSender: {
    fontWeight: 'bold',
  },
  messageText: {
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Ajuste para que el contenido esté alineado al final
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginRight: 10,
  },
});

export default NewModuleButton;
