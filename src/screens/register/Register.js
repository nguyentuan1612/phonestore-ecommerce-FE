import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import Logo from "../../components/Logo/Logo";
import Style from "../../configs/style";
import Url from "../../services/API";
const Register = ({ navigation }) => {
  const [phone, setPhone] = React.useState(null);
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rePass, setRePass] = React.useState("");

  const handleRegister = () => {
    if (
      phone.trim() === "" ||
      name.trim() === "" ||
      password.trim() === "" ||
      rePass.trim() === ""
    ) {
      alert("khong duoc de trong");
      return;
    }

    if (password !== rePass) {
      alert("mat khau nhap lai khong chinh xac");
      return;
    }

    const body = { name: name, password: password, phone: phone };
    fetch(`${Url}person/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status === 201) {
          alert("dang ki thanh cong");
          return navigation.goBack();
        }
        if (res.status === 500) {
          alert("dang ki that bai");
        }
      })
      .catch((error) => alert("dang ki that bai"+ error));
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
          placeholder="name"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={Style.textInput}
          placeholder="password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={Style.textInput}
          placeholder="rePassword"
          secureTextEntry
          onChangeText={(text) => setRePass(text)}
        />
        <TouchableOpacity onPress={() => handleRegister()}>
          <Text style={Style.button}>REGISTER</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            marginTop: 9,
            justifyContent: "center",
          }}
        >
          <Text>you have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={{ color: "#F59E0B", fontWeight: "bold", marginLeft: 9 }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;
