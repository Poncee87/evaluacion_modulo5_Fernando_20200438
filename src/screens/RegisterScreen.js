import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, Alert } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { auth, database } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !age || !specialty) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar datos del usuario en Firestore
      await setDoc(doc(database, 'users', user.uid), { name, email, password, age, specialty });

      Alert.alert('Éxito', 'Usuario registrado correctamente');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

      <Input label="Nombre completo" value={name} onChangeText={setName} placeholder="Ingresa tu nombre" />
      <Input label="Correo electrónico" value={email} onChangeText={setEmail} placeholder="Ingresa tu correo" keyboardType="email-address" />
      <Input label="Contraseña" value={password} onChangeText={setPassword} placeholder="Crea una contraseña" secureTextEntry />
      <Input label="Edad" value={age} onChangeText={setAge} placeholder="Ingresa tu edad" keyboardType="numeric" />
      <Input label="Especialidad" value={specialty} onChangeText={setSpecialty} placeholder="Ingresa tu especialidad" />

      <Button title="Registrarse" onPress={handleRegister} disabled={loading} />

      <Button
        title="¿Ya tienes cuenta? Inicia sesión"
        onPress={() => navigation.navigate('Login')}
        style={styles.linkButton}
        textStyle={styles.linkText}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#333' },
  linkButton: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#007bff' },
  linkText: { color: '#007bff' },
});

export default RegisterScreen;