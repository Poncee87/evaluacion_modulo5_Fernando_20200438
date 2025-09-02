import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { auth, database } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const HomeScreens = ({ navigation, setUser }) => {
  const [userData, setUserData] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user?.uid) {
        const docRef = doc(database, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}>Bienvenido/a</Text>
      <Text style={styles.userName}>{userData.name || 'Usuario'}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tu perfil</Text>
        <Text style={styles.cardText}>
          Aquí puedes gestionar la información de tu cuenta y editar tus datos personales.
        </Text>
        <Button
          title="Editar perfil"
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.editButton}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Funcionalidades</Text>
        <Text style={styles.cardText}>
          Esta aplicación te permite registrar tu información personal y mantenerla actualizada.
        </Text>
      </View>

      <Button
        title="Cerrar Sesión"
        onPress={handleLogout}
        style={styles.logoutButton}
        textStyle={styles.logoutText}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  welcome: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 15,
    color: '#555',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#007bff',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    lineHeight: 22,
  },
  editButton: {
    backgroundColor: '#28a745',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#dc3545',
    marginTop: 20,
  },
  logoutText: {
    color: '#dc3545',
  },
});

export default HomeScreens;