import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, Alert } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { auth, database } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const EditProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    age: '',
    specialty: '',
  });
  const [loading, setLoading] = useState(false);

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

  const handleChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    const { name, email, age, specialty } = userData;

    if (!name || !email || !age || !specialty) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user?.uid) {
        const docRef = doc(database, 'users', user.uid);
        await updateDoc(docRef, { name, email, age, specialty });
        Alert.alert('Éxito', 'Perfil actualizado correctamente');
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <Input
        label="Nombre completo"
        value={userData.name}
        onChangeText={(value) => handleChange('name', value)}
        placeholder="Ingresa tu nombre"
      />

      <Input
        label="Correo electrónico"
        value={userData.email}
        onChangeText={(value) => handleChange('email', value)}
        placeholder="Ingresa tu correo"
        keyboardType="email-address"
      />

      <Input
        label="Edad"
        value={userData.age}
        onChangeText={(value) => handleChange('age', value)}
        placeholder="Ingresa tu edad"
        keyboardType="numeric"
      />

      <Input
        label="Especialidad"
        value={userData.specialty}
        onChangeText={(value) => handleChange('specialty', value)}
        placeholder="Ingresa tu especialidad"
      />

      <Button
        title="Guardar Cambios"
        onPress={handleUpdate}
        disabled={loading}
      />

      <Button
        title="Cancelar"
        onPress={() => navigation.goBack()}
        style={styles.cancelButton}
        textStyle={styles.cancelText}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#333' },
  cancelButton: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#6c757d' },
  cancelText: { color: '#6c757d' },
});

export default EditProfileScreen;