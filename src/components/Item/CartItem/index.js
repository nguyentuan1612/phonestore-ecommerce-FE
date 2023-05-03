import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { Checkbox } from "react-native-paper";
const CartItem = (props) => {
  const refRBSheet = React.useRef();
  const [checked, setChecked] = React.useState(false);

  const Delete = () => {
    if (checked) {
      alert("uncheck item");
      refRBSheet.current.close();
    } else {
      props.deleteProduct(props.id);
      refRBSheet.current.close();
    }
  };

  const check = async (checked) => {
    if (!checked) {
      // console.log("TICK : " + props.id);
      await props.addToArray(props.id,props.price, props.quantity, props.name, props.image, props.ram,props.color );
    } else {
      // console.log("UN TICK : " + props.id);
      await props.removeFromArray(props.id,props.price, props.quantity);
    }
  };
  return (
    <View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
      <Checkbox
        status={checked ? "checked" : "unchecked"}
        onPress={async () => {
          await check(checked);
          setChecked(!checked);
        }}
      />
      <View
        style={{
          flex: 1,
          height: 80,
          borderWidth: 1,
          borderColor: "silver",
          borderRadius: 8,
          justifyContent: "center",
          marginVertical: 8,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: props.image }}
            style={{ width: 60, height: 60 }}
            resizeMode="stretch"
          />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 15, width: 135 }} numberOfLines={1}>
              {props.name}
            </Text>
            <Text style={{ marginTop: 15, fontWeight: "bold" }}>
              {" "}
              ${props.price}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginVertical: 5,
                backgroundColor: "#FF6600",
                color: "white",
                width: 25,
                height: 25,
                borderRadius: 100,
                textAlign: "center",
                lineHeight: 23,
              }}
            >
              {props.quantity}
            </Text>
            <Text style={{ marginTop: 2 }}>{props.ram}</Text>
          </View>
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
              style={{ width: 20, height: 30 }}
              resizeMode="center"
            />
          </TouchableOpacity>
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
    </View>
  );
};

export default CartItem;
