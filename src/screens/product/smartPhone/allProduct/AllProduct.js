import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Image,
} from "react-native";
import React from "react";
import ItemProduct from "../../../../components/Item/ProductItem";
import Url from "../../../../services/API";
import { TouchableOpacity } from "react-native";

const AllProduct = ({ navigation }) => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [display, setDisplay] = React.useState("none");

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await fetch(`${Url}products`);
      const json = await res.json();
      setData(json.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 8,
        paddingTop: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <TextInput
          placeholder="name..."
          style={{
            height: 45,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: "silver",
            paddingLeft: 10,
            display: display,
            flex: 1,
            marginRight: 10
          }}
        />
        {display === "none" ? (
          <TouchableOpacity onPress={() => setDisplay("flex")}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/2811/2811806.png",
              }}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setDisplay("none")}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/6107/6107764.png",
              }}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        )}
      </View>
      {isLoading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <FlatList
            keyExtractor={(item) => item._id}
            data={data}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Detail", {
                      data: {
                        id: item._id,
                        name: item.name,
                        image: item.URLImages,
                        purchase: item.purchase,
                        price: item.price,
                        color: item.color,
                        description: item.description,
                      },
                    });
                  }}
                >
                  <ItemProduct name={item.name} image={item.URLImages} />
                </TouchableOpacity>
              );
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      )}
    </View>
  );
};

export default AllProduct;
