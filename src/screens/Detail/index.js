import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState } from "react";
import Style from "../../configs/style";
import { Alert } from "react-native";
import Url from "../../services/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Detail = ({ navigation, route }, props) => {
  const data = route.params.data;

  const [image, setImage] = useState(data.image[0].URLImage);
  const [color, setColor] = useState(data.color[0]);
  const [quantity, setQuantity] = useState(1);

  const [idUser, setIdUser] = useState(null);

  const [ram, setRam] = useState("128 G");
  const [price, setPrice] = useState(600);

  const [version, setVersion] = useState("128G");

  const getIdUserLogin = async () => {
    try {
      const dataUser = await JSON.parse(await AsyncStorage.getItem("Data"));
      return dataUser.id;
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = () => {
    Alert.alert("Notification", "Add to cart ?", [
      {
        text: "OK",
        onPress: async () => {
          const Data = {
            productImage: image,
            productName: data.name,
            userId: await getIdUserLogin(),
            productQuantity: quantity,
            productColor: color,
            productRam: ram,
            productPrice: price,
          };
          
          fetch(`${Url}/product/addToCart`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Data),
          })
            .then((res) => {
              if(res.status === 201){
                alert("Add successfully")
              }
              if(res.status === 500){
                alert("Add fail")
              }
            })
            .catch((error) => alert(error));
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <ImageBackground
        source={{ uri: image }}
        style={{ width: "100%", flex: 1, marginTop: 50, marginBottom: 20 }}
        resizeMode="contain"
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2722/2722991.png",
            }}
            style={{ width: 30, height: 30, marginLeft: 10 }}
          />
        </TouchableOpacity>
      </ImageBackground>
      <View
        style={{
          flex: 2,
          borderTopWidth: 1,
          borderColor: "silver",
          marginTop: 20,
          width: "90%",
        }}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <TouchableOpacity
            onPress={() => {
              setImage(data.image[0].URLImage);
              setColor(data.color[0]);
            }}
          >
            <Image
              source={{ uri: data.image[0].URLImage }}
              style={{ width: 55, height: 55, marginHorizontal: 3 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setImage(data.image[1].URLImage);
              setColor(data.color[1]);
            }}
          >
            <Image
              source={{ uri: data.image[1].URLImage }}
              style={{ width: 55, height: 55, marginHorizontal: 3 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setImage(data.image[2].URLImage);
              setColor(data.color[2]);
            }}
          >
            <Image
              source={{ uri: data.image[2].URLImage }}
              style={{ width: 55, height: 55, marginHorizontal: 3 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          {version === "128G" ? (
            <TouchableOpacity
              onPress={() => {
                setRam("128 G");
                setPrice(data.price - 300);
                setVersion("128G");
              }}
            >
              <View
                style={{
                  width: 90,
                  height: 50,
                  borderWidth: 1,
                  borderColor: "red",
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "#555555", fontWeight: "bold", marginTop: 4 }}
                >
                  128 G
                </Text>
                <Text style={{ fontWeight: "bold" }}>{data.price - 300}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setRam("128 G");
                setPrice(data.price - 300);
                setVersion("128G");
              }}
            >
              <View
                style={{
                  width: 90,
                  height: 50,
                  borderWidth: 1,
                  borderColor: "silver",
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "#555555", fontWeight: "bold", marginTop: 4 }}
                >
                  128 G
                </Text>
                <Text style={{ fontWeight: "bold" }}>{data.price - 300}</Text>
              </View>
            </TouchableOpacity>
          )}

          {version === "256G" ? (
            <TouchableOpacity
              onPress={() => {
                setRam("256 G");
                setPrice(data.price - 100);
                setVersion("256G");
              }}
            >
              <View
                style={{
                  width: 90,
                  height: 50,
                  borderWidth: 1,
                  borderColor: "red",
                  borderRadius: 10,
                  alignItems: "center",
                  marginRight: 5,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{ color: "#555555", fontWeight: "bold", marginTop: 4 }}
                >
                  256 G
                </Text>
                <Text style={{ fontWeight: "bold" }}>{data.price - 100}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setRam("256 G");
                setPrice(data.price - 100);
                setVersion("256G");
              }}
            >
              <View
                style={{
                  width: 90,
                  height: 50,
                  borderWidth: 1,
                  borderColor: "silver",
                  borderRadius: 10,
                  alignItems: "center",
                  marginRight: 5,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{ color: "#555555", fontWeight: "bold", marginTop: 4 }}
                >
                  256 G
                </Text>
                <Text style={{ fontWeight: "bold" }}>{data.price - 100}</Text>
              </View>
            </TouchableOpacity>
          )}

          {version === "512G" ? (
            <TouchableOpacity
              onPress={() => {
                setRam("512 G");
                setPrice(data.price);
                setVersion("512G");
              }}
            >
              <View
                style={{
                  width: 90,
                  height: 50,
                  borderWidth: 1,
                  borderColor: "red",
                  borderRadius: 10,
                  alignItems: "center",
                  marginHorizontal: 5,
                }}
              >
                <Text
                  style={{ color: "#555555", fontWeight: "bold", marginTop: 4 }}
                >
                  512 G
                </Text>
                <Text style={{ fontWeight: "bold" }}>{data.price}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setRam("512 G");
                setPrice(data.price);
                setVersion("512G");
              }}
            >
              <View
                style={{
                  width: 90,
                  height: 50,
                  borderWidth: 1,
                  borderColor: "silver",
                  borderRadius: 10,
                  alignItems: "center",
                  marginHorizontal: 5,
                }}
              >
                <Text
                  style={{ color: "#555555", fontWeight: "bold", marginTop: 4 }}
                >
                  512 G
                </Text>
                <Text style={{ fontWeight: "bold" }}>{data.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={Style.title}>{data.name}</Text>
          <View style={{ height: 200, marginTop: 10 }}>
            <Text style={{ fontSize: 13 }}>{data.description}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              width: 30,
              height: 30,
              backgroundColor: "#FF6600",
              textAlign: "center",
              color: "white",
              lineHeight: 27,
              borderRadius: 8,
              marginRight: 10,
            }}
            onPress={() => {
              setQuantity(quantity + 1);
            }}
          >
            +
          </Text>
          <Text>{quantity}</Text>
          <Text
            style={{
              width: 30,
              height: 30,
              backgroundColor: "#FF6600",
              textAlign: "center",
              color: "white",
              lineHeight: 27,
              borderRadius: 8,
              marginLeft: 10,
            }}
            onPress={() => {
              quantity <= 1 ? setQuantity(1) : setQuantity(quantity - 1);
            }}
          >
            -
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{ width: "90%" }}
        onPress={() => {
          addToCart();
        }}
      >
        <Text
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "#FF6600",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
            lineHeight: 48,
          }}
        >
          ADD TO CART
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Detail;
