import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import styles from "@/utils/styles/Profiles.module.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EnterCode from "@/components/EnterCode";
import CustomButton from "@/components/CustomButton";

const Profiles = ({navigation}) => {
  const global = require("@/utils/styles/global.js");
  const [modalVisible, setModalVisible] = useState(false);
  const { control } = useForm({
    defaultValues: {
      // email: email,
      code: ["", "", "", "", "", ""],
    },
  });
  const profiles = [
    {
      id: 1,
      name: "Admin",
    },
    {
      id: 2,
      name: "Empleado Chris",
    },
    {
      id: 3,
      name: "Empleado Luis",
    },
  ];
  return (
    <View style={[{flex: 1}, global.bgWhite]}>
      <Text style={{fontFamily: 'light', fontSize: 18, paddingLeft: 20}}>Perfiles disponibles</Text>
      <View style={[styles.container, global.bgWhite]}>
      {profiles.map((profile) => (
        <TouchableOpacity
          key={profile.id}
          style={styles.column}
          onPress={() => {
            setModalVisible(!modalVisible);
            console.log("hey")
          }}
        >
          <Image
            style={{
              width: 60,
              height: 60,
              resizeMode: "cover",
              borderRadius: 2,
            }}
            source={require('@/utils/images/email.png')}
          />
          <Text style={{fontFamily: 'light', fontSize: 14, textAlign: 'center', marginTop: 5}}>{profile.name}</Text>

          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.modalTop}>
                  <Pressable
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Image
                      style={{
                        width: 35,
                        height: 35,
                        resizeMode: "contain",
                      }}
                      source={require("@/utils/images/arrow_back.png")}
                    />
                  </Pressable>
                    <Text style={{fontFamily: 'thin', fontSize: 14}}>Coloca tu PIN para iniciar sesion</Text>

                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                  <EnterCode control={control} />
                  <CustomButton
                    text={`Iniciar sesion`}
                    handlePress={() => navigation.navigate("Tabs")}
                    textStyles={[styles.textLogin, global.white]}
                    buttonStyles={[styles.login, global.mainBgColorSecond]}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
      ))}
    </View>
    </View>
    
  );
};

export default Profiles;
