import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import Url from "../../services/API";

const Profile = ({ navigation }) => {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getUser();
  }, [data]);

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

  const getUser = async () => {
    try {
      const res = await fetch(
        `${Url}/person/get-information/${await getIdUserLogin()}`
      );
      if (res.status === 200) {
        const json = await res.json();
        setData(json.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={"large"} />
    </View>
  ) : (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 15 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: data.URLImage }}
            style={{ width: 120, height: 120, borderRadius: 100 }}
            resizeMode={"stretch"}
          />
          <View style={{ marginLeft: 70, flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {data.phone}
            </Text>
            <Text style={{ fontSize: 15, marginTop: 3 }}>{data.name}</Text>
            {/* <TouchableOpacity
             
            >
              <Text
                style={{
                  backgroundColor: "#FF6B00",
                  color: "white",
                  marginTop: 20,
                  width: "100%",
                  height: 35,
                  textAlign: "center",
                  lineHeight: 32,
                  borderRadius: 8,
                }}
              >
                EDIT PROFILE
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>

        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: "silver",
            marginTop: 30,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 1, 
              borderBottomColor:'silver'
            }}
            onPress={() => navigation.navigate("Edit-Profile")}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 20,
              }}
            >
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/2356/2356780.png",
                }}
                style={{ height: 25, width: 25, tintColor: "#FF6B00" }}
                resizeMode="stretch"
              />
              <Text style={{ marginLeft: 10 }}>Edit profile</Text>
            </View>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/709/709586.png",
              }}
              style={{ height: 18, width: 18 }}
              resizeMode="stretch"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 20,
              }}
            >
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/839/839860.png",
                }}
                style={{ height: 25, width: 25, tintColor: "#FF6B00" }}
                resizeMode="stretch"
              />
              <Text style={{ marginLeft: 10 }}>Order history</Text>
            </View>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/709/709586.png",
              }}
              style={{ height: 18, width: 18 }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: "silver",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={async () => {
              await AsyncStorage.removeItem("Data");
              navigation.navigate("Login");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 20,
              }}
            >
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/992/992680.png",
                }}
                style={{ height: 25, width: 25, tintColor: "red" }}
                resizeMode="stretch"
              />
              <Text style={{ marginLeft: 10 }}>Log out</Text>
            </View>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/709/709586.png",
              }}
              style={{ height: 18, width: 18 }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;
