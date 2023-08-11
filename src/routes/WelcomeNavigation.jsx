import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "@/screens/Auth/Welcome";
import Login from "@/screens/Auth/Login";
import Header from "./Header/Header";

const Stack = createNativeStackNavigator();

const WelcomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={`Welcome`}>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          header: () => <Header mode="back-only" />,
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

export default WelcomeNavigation;
