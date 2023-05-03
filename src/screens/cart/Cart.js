import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Url from "../../services/API";
import CartItem from "../../components/Item/CartItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RadioButton } from "react-native-paper";
let totalPrice = 0;

const Cart = ({ navigation }) => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [price, setPrice] = React.useState(0);

  const [arr, setArr] = React.useState([]);

  const [value, setValue] = React.useState(10);
  //load data when .... i don't know it :((
  React.useEffect(() => {
    getCart();
  }, [data]);

  //get id userLogin
  const getIdUserLogin = async () => {
    try {
      const dataUser = await JSON.parse(await AsyncStorage.getItem("Data"));
      return dataUser.id;
    } catch (error) {
      console.log(error);
    }
  };

  //add to array when checked
  const addToArray = async (
    cartId,
    priceProduct,
    quantity,
    productName,
    productImage,
    ram,
    color
  ) => {
    data.map(async (item) => {
      if (item._id === cartId) {
        setArr([
          ...arr,
          {
            cartId: cartId,
            productPrice: priceProduct,
            productName: productName,
            productImage: productImage,
            color: color,
            quantity: quantity,
            address: "test",
            productRam: ram,
            intoMoney: quantity * priceProduct,
          },
        ]);
        totalPrice += priceProduct * quantity;
        setPrice(totalPrice);
      }
    });
  };

  //remove to array when unchecked
  const removeFromArray = (cartId, price, quantity) => {
    // console.log("UN TICK");
    totalPrice -= price * quantity;
    setPrice(totalPrice);
    const array = arr.filter((item) => item.cartId !== cartId);
    setArr(array);
  };

  //handle check out
  const checkOut = async () => {
    if (arr.length === 0) {
      Alert.alert("Notification !!!", "Please select a product");
      return;
    }
    addAndRemoveData();
    // arr.map(async (item) => {
    //   return addAndRemoveData(item);
    // });
    // shipping: value / arr.length
  };

  const addAndRemoveData = async () => {
    // console.log(count);
    fetch(`${Url}/products/order`, {
      body: JSON.stringify({
        item: arr,
        shipping: value,
        userId: await getIdUserLogin(),
      }),
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          arr.map((item, index) => {
            fetch(`${Url}/product/sort-delete/${item.cartId}`, {
              //update a instant in table cart
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ deleteAt: new Date().getTime() }),
            })
              .then((res) => {
                if (res.status === 200) {
                  if (index === arr.length - 1) {
                    alert("DONE");
                    getCart();
                    arr.length = 0; // you should set the array length to 0 so that it becomes null because when adding to the ordinal table it still keeps the old data
                    setPrice(0);
                    totalPrice = 0;
                  }
                } else {
                  console.log("delete fail !!");
                }
              })
              .catch((error) => {
                console.log("delete fail !!");
                console.log(error);
              });
          });
          // alert("DONE");
        } else {
          alert("Order fail !!");
        }
      })
      .catch((error) => {
        alert("Order fail !!");
        console.log(error);
      });
  };

  //get data cart in database
  const getCart = async () => {
    try {
      const res = await fetch(
        `${Url}/product/getCart/${await getIdUserLogin()}`
      );
      const json = await res.json();
      setData(json.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const totalPrice = (data) => {
  //   console.log("data " + data);
  //   const value = data.reduce((total, item) => {
  //     return (total += item.productPrice * item.productQuantity);
  //   }, 0);
  //   setPrice(value);
  // };

  //delete product in cart
  const deleteProduct = (idCart) => {
    Alert.alert("Delete product", "Are you sure ?", [
      {
        text: "Yes",
        onPress: () => {
          fetch(`${Url}/product/deleteProduct/${idCart}`, {
            method: "delete",
          })
            .then((res) => {
              if (res.status === 204) {
                getCart();
              } else {
                alert("Delete fail");
              }
            })
            .catch((error) => alert(error));
        },
      },
      { text: "No", style: "cancel" },
    ]);
  };

  return (
    isLoading ? (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    ) : data.length === 0 ? (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 25, color: "#555555" }}>
          CART EMPTY
        </Text>
      </View>
    ) : (
      <View
        style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 10 }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1.3, marginBottom: 10 }}>
            <ScrollView
            // showsVerticalScrollIndicator={false}
            >
              <FlatList
                data={data}
                keyExtractor={(item) => item._id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <CartItem
                    id={item._id}
                    name={item.productName}
                    image={item.productImage}
                    ram={item.productRam}
                    color={item.productColor}
                    quantity={item.productQuantity}
                    price={item.productPrice}
                    deleteProduct={deleteProduct}
                    addToArray={addToArray}
                    removeFromArray={removeFromArray}
                  />
                )}
              />
            </ScrollView>
          </View>
          <View
            style={{ borderTopColor: "silver", borderTopWidth: 1, flex: 1 }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 10 }}>
              Shipping Address
            </Text>
            <Text style={{ marginVertical: 10 }}>california american</Text>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Shipping options
            </Text>
            <View style={{ width: "100%", alignItems: "flex-start" }}>
              <RadioButton.Group
                onValueChange={(newValue) => {
                  setValue(newValue);
                }}
                value={value}
              >
                <View style={{ width: "100%", marginVertical: 10 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton value={10} />
                    <Text>Standard 5 to 7 days ($10)</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton value={30} />
                    <Text>Express 2 to 3 days ($30)</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Total Price
              </Text>
              <Text style={{ marginVertical: 10, fontWeight: "bold" }}>
                $ {price + value}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={{ width: "100%" }} onPress={checkOut}>
            <Text
              style={{
                width: "100%",
                height: 50,
                backgroundColor: "#FF6600",
                borderRadius: 8,
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 18,
                lineHeight: 48,
                marginBottom: 5,
              }}
            >
              CHECK OUT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};

export default Cart;
