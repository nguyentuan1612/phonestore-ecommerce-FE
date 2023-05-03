import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import Logo from "../../components/Logo/Logo";
import Style from "../../configs/style";
import Url from "../../services/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Login = ({ navigation }) => {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    if (phone.trim() === "" || password.trim() === "") {
      alert("khong duoc de trong thong tin !");
      return;
    }

    const data = { phone: phone, password: password };
    fetch(`${Url}person/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (res.status === 404) {
          alert("phone not found");
          return;
        }
        if (res.status === 401) {
          alert("password error");
          return;
        }
        if (res.status === 500) {
          alert("server error");
          return;
        }

        if (res.status === 200) {
          const data = await res.json();
          const Object = {
            name: data.data.name,
            phone: data.data.phone,
            id: data.data.id,
            image: data.data.image,
          };
          try {
            await AsyncStorage.setItem("Data", JSON.stringify(Object));
            return navigation.navigate("Home");
          } catch (error) {
            alert("save inf user fail");
          }
          return navigation.navigate("Home");
        }
      })
      .catch((error) => alert("dang nhap that bai" + error));
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 16,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Logo />
      </View>
      <View style={{ flex: 2 }}>
        <TextInput
          style={Style.textInput}
          placeholder="phone"
          keyboardType="phone-pad"
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          style={Style.textInput}
          placeholder="password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={() => handleLogin()}>
          <Text style={Style.button}>LOGIN</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            marginTop: 9,
            justifyContent: "center",
          }}
        >
          <Text>you don't have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={{ color: "#F59E0B", fontWeight: "bold", marginLeft: 9 }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
