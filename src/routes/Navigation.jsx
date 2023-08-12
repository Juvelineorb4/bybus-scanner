import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// amplify
import { Auth, Hub } from "aws-amplify";

// recoil
import { userAuthenticated, tokenNotification } from "@/atoms/Modals";
import { useRecoilState } from "recoil";

// graphql
import { API } from "aws-amplify";
import * as mutations from "@/graphql/mutations";
// Hooks Custom
import usePushNotification from "@/hooks/usePushNotification";
import WelcomeNavigation from "./WelcomeNavigation";
import Tabs from "./Tabs/Tabs";

const Navigation = () => {
  const expoPushToken = usePushNotification();
  const [userAuth, setUserAuth] = useRecoilState(userAuthenticated);
  const [token, setToken] = useRecoilState(tokenNotification);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    setToken(expoPushToken);
  }, [expoPushToken]);

  //para esuchar que esta succdiendo con auth
  useEffect(() => {
    // crear subscripcion
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      console.log("HUB: ", event);
      switch (event) {
        case "signIn":
          checkUser();
          break;
        case "signOut":
          setUserAuth(undefined);
          break;
        case "confirmSignUp":
          console.log(data);
          break;
        case "autoSignIn":
          createWallet(data);
          break;
        case "updateUserAttributes":
          checkUser();
          break;
      }
    });
    // Preguntar si el usuario existe
    checkUser();
    return unsubscribe;
  }, []);

  const checkUser = async () => {
    try {
      const result = await Auth.currentAuthenticatedUser();
      setUserAuth(result);
    } catch (error) {
      console.error("Not signed in");
      setUserAuth(undefined);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Welcome_Navigation"}>
        {/* {!userAuth ? ( */}
          <Stack.Screen
            name={`Welcome_Navigation`}
            component={WelcomeNavigation}
            options={{
              headerShown: false,
            }}
          />
        {/* ) : ( */}
          <Stack.Screen
            name={`Tabs`}
            component={Tabs}
            options={{
              headerShown: false,
            }}
          />
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
