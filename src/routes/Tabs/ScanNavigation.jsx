import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Scan from "@/screens/Scan/Scan";

const Stack = createNativeStackNavigator();

const ScanNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={`Scan`}>
      <Stack.Screen
        name="Scan"
        component={Scan}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ScanNavigation;
