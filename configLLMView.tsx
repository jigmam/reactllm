import React, { useState } from 'react';
import { View, NativeModules, TextInput, Button, StyleSheet } from 'react-native';
const { CalendarModule } = NativeModules;
const ConfigLLMView = ({ navigation }) => {
  const [path, setPath] = useState('');
  const [maxTokens, setMaxTokens] = useState('');
  const [randomSeed, setRandomSeed] = useState('');
  const [temperature, setTemperature] = useState('');
  const [topK, setTopK] = useState('');

  const handleLoadLLM = async () => {
    const maxTokensInt = parseInt(maxTokens);
    const randomSeedInt = parseInt(randomSeed);
    const temperatureFloat = parseFloat(temperature);
    const topKInt = parseInt(topK);

    if (!isNaN(maxTokensInt) && !isNaN(randomSeedInt) && !isNaN(temperatureFloat) && !isNaN(topKInt)) {
        await CalendarModule.loadLLM(path, maxTokensInt, randomSeedInt, temperatureFloat, topKInt);
        navigation.navigate('Home')
    } else {
      console.error('Por favor, ingrese valores válidos para todos los parámetros.');
    }
  };

  return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            value={path}
            onChangeText={setPath}
            placeholder="url"
            keyboardType="url"
        />
      <TextInput
        style={styles.input}
        value={maxTokens}
        onChangeText={setMaxTokens}
        placeholder="Max Tokens"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={randomSeed}
        onChangeText={setRandomSeed}
        placeholder="Random Seed"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={temperature}
        onChangeText={setTemperature}
        placeholder="Temperature"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={topK}
        onChangeText={setTopK}
        placeholder="Top K"
        keyboardType="numeric"
      />
      <Button
        title="Cargar LLM"
        onPress={handleLoadLLM}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ConfigLLMView;
