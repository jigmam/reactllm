import React from 'react';
import {
  Button,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ToastAndroid
} from 'react-native';


const PermissionModule = ({navigation}) => {
  const showToastWithGravity = (value:string) => {
    ToastAndroid.showWithGravity(
      value,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        showToastWithGravity("puedes usar la camara")
      } else {
        showToastWithGravity("No puedes usar la camara")
      }
      navigation.navigate('Home')
    } catch (err) {
      console.warn(err);
    }
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: StatusBar.currentHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    item: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.item}>Try permissions</Text>
      <Button title="request permissions" onPress={requestCameraPermission} />
    </View>
  )
};



export default PermissionModule;