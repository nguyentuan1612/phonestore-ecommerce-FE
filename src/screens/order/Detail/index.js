import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React from "react";
import OrderDetail from "../../../components/Item/orderItemDetail";

const DetailOrder =  ({ navigation, route }) => {
  const { data, shipping ,code } =  route.params;


  const totalPrice  = () => {
    const value = data.reduce((total,item) => {
        return total += item.intoMoney;
    },0)
    return value + shipping;
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ width: "100%", alignItems: "flex-start", marginTop: 50 }}
      >
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2722/2722991.png",
          }}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>

      <Text style={{ width: "100%", marginTop: 10 }}>Code : {code}</Text>
      <View style={{ flex: 2, width: "100%" }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.cartId}
          renderItem={({ item }) => (
            <OrderDetail
              name={item.productName}
              quantity={item.quantity}
              price={item.productPrice}
              image={item.productImage}
              color={item.color}
            />
          )}
        />
      </View>

      <View
        style={{
          flex: 1.5,
          width: "100%",
          borderTopWidth: 1,
          borderTopColor: "silver",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 10 }}>
          Shipping Address
        </Text>
        <Text style={{ marginVertical: 10 }}>california american</Text>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          Shipping options
        </Text>
        {shipping === 30 ? (
          <Text style={{ marginVertical: 10 }}>
            Express 2 to 3 days (${shipping})
          </Text>
        ) : (
          <Text style={{ marginVertical: 10 }}>
            Standard 5 to 7 days (${shipping})
          </Text>
        )}
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Total Price</Text>
        <Text style={{ marginVertical: 10 }}>
            ${totalPrice()}
          </Text>
      </View>
    </View>
  );
};

export default DetailOrder;
