import { View, Image } from "react-native";
import React from "react";

const Logo = () => {
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Image
        source={{
          uri: "https://i.pinimg.com/originals/78/73/37/7873379c4a6dfc787b9ddfd19a7888b9.png",
        }}
        style={{ width: 180, height: 150 }}
        resizeMode="stretch"
      />
    </View>
  );
};

export default Logo;
