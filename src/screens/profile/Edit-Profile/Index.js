import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Style from "../../../configs/style";
import * as ImagePicker from "expo-image-picker";
import { ActivityIndicator } from "react-native-paper";
import Url from "../../../services/API";
import urid from "urid";

const EditProfile = ({ navigation }) => {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [image, setImage] = React.useState(null);
  const [phone, setphone] = React.useState("");
  const [name, setname] = React.useState("");
  const [address, setaddress] = React.useState("");

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUser();
    });

    return unsubscribe;
  }, [navigation]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getUser = async () => {
    try {
      const res = await fetch(
        `${Url}/person/get-information/${await getIdUserLogin()}`
      );
      if (res.status === 200) {
        const json = await res.json();
        setData(json);
        // console.log(json);
        setImage(json.data.URLImage);
        setphone(json.data.phone);
        setname(json.data.name);
        setaddress(json.data.address);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getIdUserLogin = async () => {
    try {
      const info = await AsyncStorage.getItem("Data");
      const data = await JSON.parse(info);
      if (data) {
        return data.id;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editProfile = async () => {
    setLoading(true);
    const body = new FormData();
    body.append("image", {
      uri: image,
      name: `photo${urid()}.jpg`,
      type: "image/jpg",
    });
    body.append("name", name);
    body.append("address", address);
    const setting = {
      method: "PUT",
      //   headers: {
      //     "Content-Type": "multipart/form-data;",
      //   },
      body: body,
    };
    try {
      const fetchResponse = await fetch(
        `${Url}/person/update-profile/${await getIdUserLogin()}`,
        setting
      );
      if (fetchResponse.status === 200) {
        Alert.alert("notification", "update successfully", [
          { text: "OK", onPress: () => getUser() },
        ]);
      } else if (fetchResponse.status === 404) {
        Alert.alert("notification", "Account does not exist", [
          { text: "OK", style: "cancel" },
        ]);
      } else {
        Alert.alert("notification", "Update fail", [
          { text: "OK", style: "cancel" },
        ]);
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  const EditProfile = () => {
    Alert.alert("notification", "are you sure ?", [
      { text: "OK", onPress: () => editProfile() },
      { text: "Cancel", style: "cancel" },
    ]);
  };
  return loading ? (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size={"large"} />
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 15,
        width: "100%",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, marginTop: 40, width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/130/130882.png",
              }}
              style={{ width: 20, height: 20 }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <Text style={{ fontWeight: "bold" }}>EDIT PROFILE</Text>
          <TouchableOpacity onPress={() => EditProfile()}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/62/62025.png",
              }}
              style={{ width: 20, height: 20, tintColor: "green" }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 10, alignItems: "center", width: "85%" }}>
        <ImageBackground
          source={{ uri: image }}
          style={{
            width: 140,
            height: 140,
            alignItems: "flex-end",
            justifyContent: "flex-end",
            marginBottom: 5,
          }}
          borderRadius={100}
        >
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/45/45010.png",
              }}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </ImageBackground>

        <View style={{ width: "100%", marginVertical: 8 }}>
          <Text style={{ fontWeight: "bold" }}>YOUR INFORMATION</Text>
        </View>
        <TextInput
          placeholder="phone"
          style={[Style.textInput, { color: "black" }]}
          value={phone}
          onChangeText={(text) => setphone(text)}
          editable={false}
        />
        <TextInput
          placeholder="name"
          style={Style.textInput}
          value={name}
          onChangeText={(text) => setname(text)}
        />
        <TextInput
          placeholder="address"
          style={Style.textInput}
          value={address}
          onChangeText={(text) => setaddress(text)}
        />
      </View>
    </View>
  );
};

export default EditProfile;
