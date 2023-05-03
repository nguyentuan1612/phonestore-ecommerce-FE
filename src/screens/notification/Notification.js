import { View, Text, FlatList } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Url from "../../services/API";
import { ActivityIndicator } from "react-native-paper";
import NotificationItem from "../../components/Item/NotificationItem";

const Notification = ({ navigation }) => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getNotification();
    });
    return unsubscribe;
  }, [navigation]);

  const getIdUserLogin = async () => {
    try {
      const dataUser = await JSON.parse(await AsyncStorage.getItem("Data"));
      return dataUser.id;
    } catch (error) {
      console.log(error);
    }
  };

  //get data notification in database
  const getNotification = async () => {
    try {
      const res = await fetch(
        `${Url}/notification/get-notifications/${await getIdUserLogin()}`
      );
      const json = await res.json();
      setData(json.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 10, justifyContent:'center', alignItems:'center' }}>
      <ActivityIndicator size={"large"} />
    </View>
  ) : (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 10 }}>
      <FlatList
        keyExtractor={(item) => item._id}
        data={data}
        renderItem={({ item }) => (
          <NotificationItem content={item.content} date={item.createdAt} />
        )}
      />
    </View>
  );
};

export default Notification;
