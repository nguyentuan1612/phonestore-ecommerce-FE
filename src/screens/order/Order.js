import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Url from "../../services/API";
import OrderItem from "../../components/Item/OrderItem";

const Order = ({ navigation }) => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getOrder();
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

  //get data order in database
  const getOrder = async () => {
    try {
      const res = await fetch(
        `${Url}/product/getOrders/${await getIdUserLogin()}`
      );
      const json = await res.json();
      setData(json.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const countProducts = (item) => {
    const value = item.reduce((total, item) => {
      return (total += parseFloat(item.quantity));
    }, 0);
    return value;
  };

  const onDelete = (id, cartId) => {
    Alert.alert("notification", "Are you sure you want to delete ?", [
      {
        text: "Yes",
        onPress: () => {
          fetch(`${Url}/product/delete-order/${id}`, {
            method: "delete",
          })
            .then((res) => {
              if (res.status === 204) {
                cartId.map((item, index) => {
                  fetch(`${Url}/product/sort-delete/${item}`, {
                    //update a instant in table cart
                    method: "PUT",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ deleteAt: "" }),
                  })
                    .then((res) => {
                      if (res.status === 200) {
                        if (index === cartId.length - 1) {
                          Alert.alert("notification", "Delete Done !", [
                            {
                              text: "OK",
                              onPress: () => getOrder(),
                            },
                          ]);
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

  return isLoading ? (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
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
        ORDER EMPTY
      </Text>
    </View>
  ) : (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 10 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("DetailOrder", {
                data: item.item,
                shipping: item.shipping,
                code: item._id,
              })
            }
          >
            <OrderItem
              quantity={countProducts(item.item)}
              status={item.status}
              date={item.createdAt}
              onDelete={onDelete}
              cartId={item.item}
              id={item._id}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Order;
