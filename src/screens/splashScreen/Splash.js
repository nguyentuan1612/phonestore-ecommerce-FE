import { View, Text, Image } from "react-native";
import React from "react";

const Splash = ({ navigation }) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setTimeout(() => {
        navigation.navigate("Login");
      }, 3000);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: "https://i.pinimg.com/originals/78/73/37/7873379c4a6dfc787b9ddfd19a7888b9.png",
        }}
        style={{ width: 250, height: 220 }}
        resizeMode="stretch"
      />
    </View>
  );
};

export default Splash;
