import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";
const OrderItem = (props) => {
  const refRBSheet = React.useRef();
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

  const Delete = () => {
    refRBSheet.current.close();
    const arr = props.cartId.map((item) => item.cartId);
      props.onDelete(props.id,arr)
  }
  return (
    <View
      style={{
        width: "100%",
        height: 100,
        borderWidth: 1,
        borderColor: "silver",
        borderRadius: 5,
        marginVertical: 8,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ height: "100%", width: "100%" }}>
        <View style={{ flex: 1, alignItems: "center", flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 10 }}>
            There are {props.quantity} products
          </Text>
          {props.status === "unconfimred" ? (
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "center",
                marginRight: 10,
              }}
              onPress={() => refRBSheet.current.open()}
            >
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/512/512222.png",
                }}
                style={{ width: 15, height: 25 }}
                resizeMode="center"
              />
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
            width: "100%",
            alignItems: "flex-end",
            // borderWidth: 1
          }}
        >
          <Text
            style={{
              marginLeft: 10,
              color: "silver",
              fontWeight: "bold",
              fontSize: 12,
              marginBottom: 10,
            }}
          >
            {convertDate()}
          </Text>
          {props.status === "unconfimred" ? (
            <Text
              style={{
                backgroundColor: "red",
                width: 140,
                height: 30,
                marginRight: 10,
                marginBottom: 5,
                borderRadius: 5,
                textAlign: "center",
                color: "white",
                lineHeight: 28,
              }}
            >
              {props.status}
            </Text>
          ) : (
            <Text
              style={{
                backgroundColor: "green",
                width: 140,
                height: 30,
                marginRight: 10,
                marginBottom: 5,
                borderRadius: 5,
                textAlign: "center",
                color: "white",
                lineHeight: 28,
              }}
            >
              {props.status}
            </Text>
          )}
        </View>
      </View>
      <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={100}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "#FF9933",
            },
            container: {
              backgroundColor: "#EEEEEE",
            },
          }}
        >
          <TouchableOpacity onPress={Delete}>
            <Text>DELETE</Text>
          </TouchableOpacity>
        </RBSheet>
    </View>
  );
};

export default OrderItem;
