import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import Home from "../screens/Home/Home";
import Login from "../screens/login/Login";
import DetailOrder from "../screens/order/Detail";
import EditProfile from "../screens/profile/Edit-Profile/Index";
import Register from "../screens/register/Register";
import Splash from "../screens/splashScreen/Splash";
const Stack = createNativeStackNavigator();

export default _NavigationContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="DetailOrder" component={DetailOrder} />
        <Stack.Screen name="Edit-Profile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
