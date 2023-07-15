import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import styles from "./UserInformationCard.style";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFormikContext } from "formik";

const UserInformationCard = ({ formikProps, setCardForwarding }) => {
  const { values, setFieldValue } = useFormikContext();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchCountryData();
  }, []);

  const fetchCountryData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data.map((country) => country.name.common));
    } catch (error) {
      console.log("Error fetching country data:", error);
    }
  };

  const fetchCityData = async (country) => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/cities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: country,
          }),
        }
      );

      const data = await response.json();
      const cities = data?.data || [];
      setCities(cities);
    } catch (error) {
      console.log("Error fetching city data:", error);
    }
  };

  const handlePhotoPicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      // Permission denied
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFieldValue("photo", result.assets[0].uri);
    }
  };

  const handleGenderChange = (gender) => {
    setFieldValue("selectedGender", gender);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setShow(false);
      setFieldValue("selectedBirthDate", currentDate);
    }
  };

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
    <>
      <Image source={{ uri: values.photo }} style={styles.photoPreview} />
      <TouchableOpacity style={styles.photoButton} onPress={handlePhotoPicker}>
        <Text style={styles.photoButtonText}>Fotoğraf Seç</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Ad Soyad</Text>
      <TextInput
        style={styles.input}
        placeholder="Ad Soyad"
        value={values.fullName}
        onChangeText={(text) => setFieldValue("fullName", text)}
      />
      <Text style={styles.title}>Ülke</Text>
      <View style={styles.dropdownContainer}>
        <Picker
          style={styles.dropdown}
          selectedValue={values.selectedCountry}
          onValueChange={(itemValue) => {
            setFieldValue("selectedCountry", itemValue);
            fetchCityData(itemValue);
          }}
        >
          <Picker.Item label="Seçiniz" value="" />
          {countries.sort().map((country, index) => (
            <Picker.Item key={index} label={country} value={country} />
          ))}
        </Picker>
      </View>

      <Text style={styles.title}>Şehir</Text>
      <View style={styles.dropdownContainer}>
        <Picker
          style={styles.dropdown}
          selectedValue={values.selectedCity}
          onValueChange={(itemValue) =>
            setFieldValue("selectedCity", itemValue)
          }
        >
          <Picker.Item label="Seçiniz" value="" />
          {cities.sort().map((city, index) => (
            <Picker.Item key={index} label={city} value={city} />
          ))}
        </Picker>
      </View>

      <Text style={styles.title}>Kimlik No *</Text>
      {values.identificationNumber == "" &&
        formikProps.touched.identificationNumber && (
          <Text style={styles.errorText}>
            {formikProps.errors.identificationNumber}
          </Text>
        )}
      <TextInput
        style={styles.input}
        placeholder="Kimlik No"
        value={values.identificationNumber}
        onChangeText={(no) => setFieldValue("identificationNumber", no)}
        onBlur={() => formikProps.setFieldTouched("identificationNumber")}
      />

      <Text style={styles.title}>Telefon *</Text>
      {values.phone == "" && formikProps.touched.phone && (
        <Text style={styles.errorText}>{formikProps.errors.phone}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Telefon"
        value={values.phone}
        onChangeText={(tel) => setFieldValue("phone", tel)}
        onBlur={() => formikProps.setFieldTouched("phone")}
      />

      <Text style={styles.title}>Doğum Tarihi</Text>
      <Pressable style={styles.inputButton} onPress={() => setShow(true)}>
        <TextInput
          style={[styles.input, { width: "auto" }]}
          placeholder="Doğum Tarihi"
          editable={false}
          value={formatDate(values.selectedBirthDate)}
        />
        {show && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={values.selectedBirthDate}
            onChange={onChange}
          />
        )}
      </Pressable>

      <Text style={styles.title}>Cinsiyet</Text>
      <View style={styles.dropdownContainer}>
        <Picker
          style={styles.dropdown}
          selectedValue={values.selectedGender}
          onValueChange={handleGenderChange}
        >
          <Picker.Item label="Seçiniz" value="" />
          <Picker.Item label="Erkek" value="Erkek" />
          <Picker.Item label="Kadın" value="Kadın" />
        </Picker>
      </View>

      <View style={{ width: "80%", alignItems: "flex-end" }}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAgreementChecked(!agreementChecked)}
        >
          <View
            style={[
              styles.checkbox,
              agreementChecked && styles.checkboxChecked,
            ]}
          />
          <Text style={styles.checkboxText}>KVKK Onayı</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, !agreementChecked && styles.disabledButton]}
        onPress={() => setCardForwarding((prev) => prev + 1)}
        disabled={!agreementChecked}
      >
        <Text style={styles.buttonTitle}>Devam</Text>
      </TouchableOpacity>
    </>
  );
};

export default UserInformationCard;
