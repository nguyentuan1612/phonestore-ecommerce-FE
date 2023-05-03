import { View, Text, Image } from "react-native";
import React from "react";

const NotificationItem = (props) => {
  const convertDate = () => {
    var date = new Date(props.date);
    return (
      date.getDate() +
      " " +
      date.toLocaleString("default", { month: "long" }) +
      " " +
      date.getFullYear() +
      " - " +
      date.getHours() +
      "h : " +
      date.getMinutes() +
      "m " +
      ": " +
      date.getSeconds() +
      "s"
    );
  };

  return (
    <View
      style={{
        width: "100%",
        height: 80,
        borderWidth: 1,
        borderColor: "silver",
        borderRadius: 5,
        marginVertical: 8
      }}
    >
      <View style={{ flex: 1.5, marginLeft: 10 }}>
        <View style={{ flexDirection: "row", alignItems:'center', justifyContent:"space-between" }}>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}>
            {props.content}
          </Text>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2058/2058148.png",
            }}
            style={{ width: 25, height: 20, marginRight: 10, marginTop: 8 }}
            resizeMode="stretch"
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
          marginRight: 10,
          marginTop: 30,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 13, color: "silver" }}>
          {convertDate()}
        </Text>
      </View>
    </View>
  );
};

export default NotificationItem;
