import { View, Text, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Product from "../product/Product";
import Profile from "../profile/Profile";
import Cart from "../cart/Cart";
import Order from "../order/Order";
const Tab = createBottomTabNavigator();
import * as Icon from "../../configs/Icon";
import Notification from "../notification/Notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import Url from "../../services/API";
import Logo from "../../components/Logo/Logo";

const Home = ({ navigation }) => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     getCart();
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  // const getIdUserLogin = async () => {
  //   try {
  //     const dataUser = await JSON.parse(await AsyncStorage.getItem("Data"));
  //     return dataUser.id;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // //get quantity item in cart
  // const getCart = async () => {
  //   try {
  //     const res = await fetch(
  //       `${Url}/product/getCart/${await getIdUserLogin()}`
  //     );
  //     const json = await res.json();
  //     setData(json.data);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* {isLoading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <View style={{ flex: 1 }}> */}
      <View
        style={{
          marginTop: 25,
          marginBottom: 10,
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 8,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "bold", color: "#555555" }}>
          MOBILE SHOP
        </Text>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/78/73/37/7873379c4a6dfc787b9ddfd19a7888b9.png',
          }}
          style={{ width: 40, height: 40, borderRadius: 50 }}
          resizeMode="center"
        />
      </View>
      <Tab.Navigator
        initialRouteName="Product"
        screenOptions={{
          tabBarActiveTintColor: "#F59E0B",
          tabBarInactiveTintColor: "#555555",
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          name="Product"
          component={Product}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Icon.IconHome name="home" color={color} size={size} />
            ),
            // tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: "Cart",
            tabBarIcon: ({ color, size }) => (
              <Icon.IconCart name="cart" color={color} size={size} />
            ),
            tabBarBadge: 0,
          }}
        />
        <Tab.Screen
          name="order status"
          component={Order}
          options={{
            tabBarLabel: "Order",
            tabBarIcon: ({ color, size }) => (
              <Icon.IconOrder name="list-circle" color={color} size={size} />
            ),
              tabBarBadge: 8,
          }}
        />
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            tabBarLabel: "Notification",
            tabBarIcon: ({ color, size }) => (
              <Icon.IconNotification
                name="notifications"
                color={color}
                size={size}
              />
            ),
            tabBarBadge: 1,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Me",
            tabBarIcon: ({ color, size }) => (
              <Icon.IconProfile name="user" color={color} size={size} />
            ),
            //   tabBarBadge: 3,
          }}
        />
      </Tab.Navigator>
      {/* </View> */}
      {/* )} */}
    </View>
  );
};

export default Home;
