import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  StyleSheet,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Font from "@expo/vector-icons/FontAwesome5";
import Icoon from 'react-native-vector-icons/FontAwesome';
import Ion from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
 import { useDispatch, useSelector } from 'react-redux'
import { getAllNurses, search  } from '../../Redux/Slices/NurseSlice';
import { IP } from  '../../src/screens/Theme'
const DoctorCard = ({ data, navigation }) => {
  const { name, address, region, profile,rates, experienceYear , shiftPrice} = data;
  const [stars, setStars] = useState([]);
  const MAX_RATING = 5; // Maximum rating value

  useEffect(() => {
    const fullStars = Math.floor(rates); // Calculate the number of full stars
    const remainingStars = MAX_RATING - fullStars; // Calculate the number of remaining stars

    // Create an array of star icons to render
    const starIcons = [];
    for (let i = 0; i < fullStars; i++) {
      starIcons.push(
        <Icoon name="star" key={i} size={20} style={{ color: "#EEED3F" }} />
      );
    }

    // Check if there's a remainder to determine if a half star should be displayed
    // if (rate % 1 !== 0) {
    //   staros.push(
    //     <Icoon name="star-half-full" key="half" size={20} style={{ color: "#EEED3F" }} />
    //   );
    // }

    // Fill the remaining space with empty stars
    for (let i = 0; i < remainingStars; i++) {
      starIcons.push(
        <Icoon name="star-o" key={i + fullStars} size={20} style={{ color: "#EEED3F" }} />
      );
    }

    setStars(starIcons);
  }, [rates]);
  

  return (
    <TouchableOpacity onPress={() => navigation.navigate("nurseProfile", { data })}>
      <LinearGradient colors={["white", "white"]} style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: `http://${IP}:3500/${profile}`}} style={styles.image} />
          {/* <Image source={ require('../../assets/nurse.jpg') } style={styles.image} /> */}
          <View style={styles.ratingContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {stars}
              <Text style={styles.rating}>{}</Text>
            </View>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <View style={{marginLeft:50}}>
          <View style={[styles.location, { justifyContent: "flex-start" }]}>
            <Ion name="ribbon-outline" size={20} color="#0A1929" />
            <Text style={styles.locationText}>
  {experienceYear == 1 ?`${experienceYear} سنة خبرة` : `${experienceYear} سنوات خبرة`}
</Text>
          </View>
          <View style={[styles.location, { justifyContent: "flex-start" }]}>
            <Icon name="map-marker-outline" size={20} color="#041585" />
            <Text style={[styles.locationText, { textAlign: "left" }]}>{region}</Text>
          </View>
          <View style={[styles.location, { justifyContent: "flex-start" }]}>
            <Font name="dollar-sign" size={20} color="#041585" />
            <Text style={[styles.locationText, { textAlign: "left" }]}>{shiftPrice}ج.م</Text>
          </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { filteredNerses, loading } = useSelector(state => state.NurseSlice);
  console.log(filteredNerses)

  useEffect(() => {
    dispatch(getAllNurses());
  }, []);

  const handleSearchChange = (text) => {
    dispatch(search(text)); // Change to dispatch search(text)
  };

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <TextInput
        placeholder="ابحث عن ممرض"
        style={[styles.searchBar, { fontSize: 18, backgroundColor: "#fff", borderRadius: 40 }]}
        onChangeText={handleSearchChange}
      />
    </View>
    <ScrollView>
      {filteredNerses === null ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
          <Image source={require('../../assets/R.gif')} style={styles.loader} />
        </View>
      ) : (
        filteredNerses.map((nurse, index) => (
          <DoctorCard key={index} data={nurse} navigation={navigation} />
        ))
      )}
    </ScrollView>
  </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end", // Add this to align the location to the right
    // alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  loader:{
    width: 180,
    height: 180,
    alignSelf:'center',
    // borderRadius: 40,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#F5F7FA",
  },
  searchBar: {
    borderWidth: 2,
    borderColor: "#041585",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 18,
    textAlign: "right",
    
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 40,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'white'
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  ratingContainer: {
    position: "absolute",
    bottom: -5,
    right: -10,
    backgroundColor: "#fff", // Change to a different color
    borderRadius: 20,
    padding: 5,
    elevation: 5,
  },
  rating: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },
  info: {
    flex: 1,
    // marginRight: 60,
    width: 200
    
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  specialty: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 5,
    textAlign: "right",
  },
  location: {
    flexDirection: "row",
    marginBottom: 5,
  },
  locationText: {
    fontSize: 14,
    color: "#041585", // Change to a different color
    marginLeft: 10,
    textAlign: "right",
  },
  availability: {
    flexDirection: "row",
    alignItems: "center",
  },
  dots: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
    transform: [{ rotate: "180deg" }],
  },
  availabilityText: {
    fontSize: 14,
    color: "#555",
    textAlign: "right",
  },
  
});

export default HomeScreen;