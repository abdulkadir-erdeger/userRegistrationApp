import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import LoginScreen from "./pages/LoginScreen";
import UserRegistrationScreen from "./pages/UserRegistrationScreen";
import DashboardScreen from "./pages/DashboardScreen";
import ProfileScreen from "./pages/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator(props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;

          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home";
            iconColor = focused ? "#007AFF" : "black";
            return <Ionicons name={iconName} size={size} color={iconColor} />;
          } else if (route.name === "Profile") {
            iconName = focused ? "user" : "user";
            iconColor = focused ? "#007AFF" : "black";
            return (
              <FontAwesome name={iconName} size={size} color={iconColor} />
            );
          }
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Profile" options={{ headerShown: false }}>
        {() => <ProfileScreen userId={props.userId} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Çıkış Yap"
        onPress={() => props.navigation.navigate("LoginScreen")}
      />
    </DrawerContentScrollView>
  );
}

function DrawerNavigator({ route }) {
  const { userId } = route.params;

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="DashboardMain" options={{ title: "Dashboard" }}>
        {() => <TabNavigator userId={userId} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserRegistrationScreen"
          component={UserRegistrationScreen}
          options={({ navigation }) => ({
            headerTitleAlign: "center",

            headerBackVisible: false,
            headerTitle: "Kullanıcı Kayıt Ekranı",
            headerLeft: () => (
              <Ionicons
                name="arrow-back-circle"
                size={40}
                color="#007AFF"
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name="DashboardScreen"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
