import { View, Text, Image } from "react-native";
import React from "react";

const ProductItem = (props) => {
  return (
    <View
      style={{
        width: 175,
        height: 230,
        margin: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "silver",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: props.image[0].URLImage }}
        style={{ width: 140, height: 190 }}
        resizeMode="contain"
      />
      <View style={{ width: "80%", paddingLeft: 8, alignItems: "center" }}>
        <Text
          style={{ fontWeight: "bold", width: "100%", textAlign: "center" }}
          numberOfLines={1}
        >
          {props.name}
        </Text>
      </View>
    </View>
  );
};
export default ProductItem;
