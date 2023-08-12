import { View, Text } from "react-native";
import React from "react";

const ScanTicketList = ({status = false, cancel = false}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
      }}
    >
      <Text
        style={{
          fontFamily: "light",
          textAlign: "center",
          fontSize: 12,
          width: 60

        }}
      >
        99999999
      </Text>
      <Text
        style={{
          fontFamily: "light",
          textAlign: "center",
          fontSize: 12,
          width: 160
        }}
      >
        1234566789020230720-01
      </Text>
      <Text
        style={{
          fontFamily: "regular",
          textAlign: "center",
          fontSize: 12,
          color: cancel ? 'red' : status ? 'green' : 'grey',
          width: 90
        }}
      >
        {cancel ? 'CANCELADO' : status ? 'ABORDO' : 'SIN ABORDAR'}
      </Text>
    </View>
  );
};

export default ScanTicketList;
