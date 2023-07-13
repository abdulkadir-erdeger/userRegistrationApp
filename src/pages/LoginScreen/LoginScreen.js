import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import styles from "./LoginScreen.styles";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("veritabani");

const LoginScreen = ({ navigation }) => {
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    navigation.navigate("UserRegistrationScreen");
  };

  const handleLogin = () => {
    if (!identificationNumber || !phone) {
      Alert.alert("Hata", "TC Kimlik Numarası ve Telefon Numarası gereklidir.");
      return;
    }

    setLoading(true);
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM users WHERE identificationNumber = ? AND phone = ?`,
        [identificationNumber, phone],
        (tx, result) => {
          if (result.rows.length > 0) {
            // Giriş başarılı
            setLoading(false);
            navigation.navigate("DashboardScreen", {
              userId: result.rows.item(0).id,
            });
          } else {
            // Giriş başarısız
            Alert.alert(
              "Hata",
              "Geçersiz TC Kimlik Numarası veya Telefon Numarası"
            );
            setLoading(false);
          }
        },
        (error) => {
          console.log("Error querying database:", error);
          setLoading(false);
        }
      );
    });
  };

  if (loading) {
    return (
      <View
        style={{
          ...StyleSheet.absoluteFill,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: "https://cdnik.baykartech.com/static/assets/media/illustrations/sigma-1/akinci-hd.jpg",
      }}
      style={styles.backgroundImage}
      resizeMode="contain"
      imageStyle={{ bottom: -Dimensions.get("window").width * 1.8 }}
    >
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://cdnik.baykartech.com/media/images/contents/hr-logo_1.png",
          }}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.title}>Giriş Yap</Text>

        <TextInput
          style={styles.input}
          placeholder="Kimlik No"
          value={identificationNumber}
          onChangeText={setIdentificationNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefon"
          // secureTextEntry
          value={phone}
          onChangeText={setPhone}
        />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Kayıt Oluştur</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonTitle}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
