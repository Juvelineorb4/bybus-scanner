import CustomButton from "@/components/CustomButton";
import { welcome } from "@/utils/constants/welcome";
import styles from "@/utils/styles/Welcome.module.css";
import React from "react";
import { Image, Text, View } from "react-native";

const Welcome = ({ navigation, route }) => {
  const global = require('@/utils/styles/global.js');
  const { content, signin } = welcome;

  return (
    <View style={[styles.container, global.mainBgColorSecond]}>
      <Image
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          resizeMode: "contain",
        }}
        source={require("@/utils/images/map.png")}
      />
      <View style={styles.content}>
        <View style={styles.text}>
          <View style={styles.name}>
            <Image
              style={{
                width: 36,
                height: 36,
                resizeMode: "contain",
              }}
              source={require("@/utils/images/icon.png")}
            />
            <Text style={[styles.textName, global.black]}>{content.name}</Text>
          </View>
          <Text style={[styles.textTitle, global.black]}>{content.title}</Text>
          <Text style={[styles.textSubtitle, global.black]}>{content.subtitle}</Text>
        </View>
        <View style={styles.buttons}>
          <CustomButton
            text={signin.button}
            handlePress={() => navigation.navigate(`Login`)}
            textStyles={[styles.textSignIn, global.white]}
            buttonStyles={[styles.signin, global.bgBlack]}
          />
        </View>
      </View>
    </View>
  );
};

export default Welcome;
