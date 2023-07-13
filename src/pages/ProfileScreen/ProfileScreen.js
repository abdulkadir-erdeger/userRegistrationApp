import { View, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import styles from "./Profile.style";
import * as SQLite from "expo-sqlite";
import { ScrollView } from "react-native-gesture-handler";

const db = SQLite.openDatabase("veritabani");

const ProfileScreen = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM users WHERE id = ?`,
        [userId],
        (tx, result) => {
          if (result.rows.length > 0) {
            const user = result.rows.item(0);
            setUserData(user);
          }
        },
        (error) => {
          console.log("Error querying database:", error);
        }
      );
    });
  }, [userId]);

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${day}-${month}-${year}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: userData?.photo }} style={styles.photoPreview} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Ad Soyad :</Text>
        <Text style={styles.input}> {userData?.fullName}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Ülke :</Text>
        <Text style={styles.input}> {userData?.selectedCountry}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Şehir :</Text>
        <Text style={styles.input}> {userData?.selectedCity}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Kimlik No :</Text>
        <Text style={styles.input}> {userData?.identificationNumber}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Telefon :</Text>
        <Text style={styles.input}> {userData?.phone}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Cinsiyet :</Text>
        <Text style={styles.input}> {userData?.selectedGender}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Doğum Tarihi :</Text>
        <Text style={styles.input}>
          {userData?.selectedBirthDate
            ? formatDate(new Date(userData.selectedBirthDate))
            : null}
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Çalışma Durumu :</Text>
        <Text style={styles.input}>{userData?.employmentStatus}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Meslek :</Text>
        <Text style={styles.input}>{userData?.occupation}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Eğitim Seviyesi :</Text>
        <Text style={styles.input}>{userData?.educationLevel}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Okul Adı :</Text>
        <Text style={styles.input}>{userData?.schoolName}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Bölüm:</Text>
        <Text style={styles.input}>{userData?.section}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Mezuniyet Tarihi :</Text>
        <Text style={styles.input}>
          {userData?.graduationYear
            ? formatDate(new Date(userData.graduationYear))
            : null}
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>CV :</Text>
        <Text style={styles.input}>
          {userData?.cv ? JSON.parse(userData?.cv)?.name : null}
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Yekinlikler :</Text>
        {userData?.skills
          ? JSON.parse(userData?.skills).map((item, index) => (
              <View
                key={index}
                style={[
                  styles.input,
                  { flexDirection: "row", alignItems: "center" },
                ]}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Yetkinlik:{" "}
                </Text>
                <Text>{item.skill}</Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginStart: 5,
                  }}
                >
                  Derece:{" "}
                </Text>
                <Text>{item.degree}</Text>
              </View>
            ))
          : null}
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Projeler :</Text>

        {userData?.projects && JSON.parse(userData?.projects).length > 0
          ? JSON.parse(userData?.projects).map((item, index) => (
              <View
                key={index}
                style={[
                  styles.input,
                  { flexDirection: "row", alignItems: "center" },
                ]}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Başlık:{" "}
                </Text>
                <Text>{item.title}</Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginStart: 5,
                  }}
                >
                  Açıklama:{" "}
                </Text>
                <Text>{item.description}</Text>
              </View>
            ))
          : null}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
