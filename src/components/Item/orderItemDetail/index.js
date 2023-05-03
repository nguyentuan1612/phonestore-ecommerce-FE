import { View, Text, Image } from "react-native";
import React from "react";

const OrderDetail = (props) => {
  return (
    <View
      style={{
        width: "100%",
        height: 120,
        borderBottomColor: "silver",
        borderBottomWidth: 1,
        marginVertical: 8,
        flexDirection:"row",
        alignItems:'center'
      }}
    >
      <Image
        source={{ uri: props.image }}
        style={{ width: 80, height: 80 }}
        resizeMode="stretch"
      />
      <View style={{marginLeft: 10}}>
        <Text style={{fontWeight:"bold"}}><Text style={{fontWeight:'bold'}}>name:</Text> {props.name}</Text>
        <Text><Text style={{fontWeight:'bold'}}>color:</Text> {props.color}</Text>
        <Text><Text style={{fontWeight:'bold'}}>price:</Text> ${props.price}</Text>
        <Text><Text style={{fontWeight:'bold'}}>quantity:</Text> {props.quantity}</Text>
      </View>
    </View>
  );
};

export default OrderDetail;
