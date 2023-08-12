import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import BottomSheetModal from "@/components/BottomSheetModal";
import styles from "@/utils/styles/Scan.module.css";
import CustomButton from "@/components/CustomButton";
import ScanTicketList from "@/components/ScanTicketList";
import CustomTravels from "@/components/CustomTravels";

const Scan = () => {
  const global = require("@/utils/styles/global.js");
  const data = [
    {
      id: 1,
      name: "Caracas - Barquisimeto",
      date: "01/09/2023",
      time: "12:00PM",
    },
    {
      id: 2,
      name: "Caracas - Valencia",
      date: "01/09/2023",
      time: "12:00PM",
    },
    {
      id: 3,
      name: "Caracas - Maracaibo",
      date: "01/09/2023",
      time: "12:00PM",
    },
  ];
  return (
    <View
      style={[
        global.mainBgColorSecond,
        { flex: 1, padding: 20, flexDirection: "column" },
      ]}
    >
      <View style={{paddingTop: 80, paddingBottom: 10}}>
        <CustomTravels data={data} />
      </View>
      <View>
        <CustomButton
          text={`Escanea un ticket`}
          // handlePress={handleSubmit(onHandleLogin)}
          textStyles={[styles.textScan, global.white]}
          buttonStyles={[styles.scan, global.bgBlack]}
        />
      </View>

      <BottomSheetModal bottomSheetStyle={{flex: 1}}>
        <View style={{marginHorizontal: 10, alignItems: 'center'}}>
          <Text style={{
            fontFamily: 'regular',
            fontSize: 16,
            marginBottom: 5
          }}>
            Destino: Barquisimeto
          </Text>
          <Text style={{
            fontFamily: 'regular',
            fontSize: 16
          }}>
            Hora de salida: 12:00PM
          </Text>
        </View>
      <View
            style={{
              flex: 1,
              alignItems: "center",
              marginTop: 20,
              flexDirection: 'row',
              borderColor: '#1f1f1f',
              borderWidth: 0.4,
              marginHorizontal: 10,
              borderRadius: 2,
              justifyContent: 'space-between',
              padding: 10
            }}
          >
            <Text
              style={{
                fontFamily: "light",
                textAlign: "center",
                width: 50
              }}
            >
              Cedula
            </Text>
            <Text
              style={{
                fontFamily: "light",
                textAlign: "center",
                width: 150
              }}
            >
              N de ticket
            </Text>
            <Text
              style={{
                fontFamily: "light",
                textAlign: "center",
                width: 80
              }}
            >
              Estado
            </Text>
          </View>
          <ScanTicketList status={true} />
          <ScanTicketList status={false} />
          <ScanTicketList status={false} />
          <ScanTicketList cancel={true} />
          <ScanTicketList status={true} />
          <ScanTicketList status={true} />
          <ScanTicketList status={true} />

      </BottomSheetModal>
    </View>
  );
};

export default Scan;
