import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AllProduct from "./smartPhone/allProduct/AllProduct";
import Iphone from "./smartPhone/iPhone/Iphone";
import Oppo from "./smartPhone/oppo/Oppo";
import SamSung from "./smartPhone/samSung/SamSung,";

const Tab = createMaterialTopTabNavigator();
const Product = () => {
  return (
    <Tab.Navigator
      style={{ backgroundColor: "white" }}
      initialRouteName="AllProducts"
      screenOptions={{
        tabBarActiveTintColor: "#F59E0B",
        tabBarInactiveTintColor: "black",
        swipeEnabled: false,
        tabBarLabelStyle: { fontSize: 12.5 },
        tabBarIndicatorStyle: {
          backgroundColor: "#F59E0B",
          width: 80,
          marginLeft: 10,
          marginBottom: 5,
        },
        tabBarStyle: {
          borderRadius: 8,
          marginHorizontal: 10,
          marginTop: 10,
        },
      }}
    >
      <Tab.Screen name="All" component={AllProduct} />
      <Tab.Screen name="Iphone" component={Iphone} />
      <Tab.Screen name="SamSung" component={SamSung} />
      <Tab.Screen name="Oppo" component={Oppo} />
    </Tab.Navigator>
  );
};

export default Product;
