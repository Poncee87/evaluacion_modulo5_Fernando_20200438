import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Loading from '../components/Loading';

const SplashScreen = () => {
  // Simular tiempo de carga
  useEffect(() => {
    const timer = setTimeout(() => {
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/logo.png')} 
        style={styles.logo}
      />
      <Loading />
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
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
});

export default SplashScreen;