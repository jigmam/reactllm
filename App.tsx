/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewModuleButton from './newModule';
import ConfigLLMView from './configLLMView';
import PermissionModule from './PermissionModule';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const Stack = createNativeStackNavigator();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Permission" component={PermissionModule} />

        <Stack.Screen name="Home" component={NewModuleButton} />
        <Stack.Screen name="Details" component={ConfigLLMView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
