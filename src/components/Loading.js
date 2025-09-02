import React from 'react';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';

const Loading = ({ size = 'large', color = '#007bff' }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/splash-icon.png')} 
        style={styles.logo}
      />
      <ActivityIndicator size={size} color={color} style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  spinner: {
    marginTop: 20,
  },
});

export default Loading;