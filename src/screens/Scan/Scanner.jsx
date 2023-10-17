import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
// amplify
import { API } from "aws-amplify";
import { checkScan } from "@/graphql/mutations";
// recoil
import { useRecoilValue } from "recoil";
import { travelSelect } from "@/atoms/Modals";
const Scanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const selectTravel = useRecoilValue(travelSelect);
  const [error, setError] = useState("");
  const [msgSuccess, setMsgSuccess] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (!selectTravel?.id) navigation.goBack();
  }, [selectTravel]);

  const onHandlerCheckTicket = async (data) => {
    setError("");
    setMsgSuccess("");
    const params = {
      input: {
        ticketID: data,
        bookingID: selectTravel?.id,
      },
    };
    try {
      const result = await API.graphql({
        query: checkScan,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: params,
      });
      console.log(JSON.parse(result?.data?.checkScan));
      switch (JSON.parse(result?.data?.checkScan)?.statusCode) {
        case 200:
          setMsgSuccess(JSON.parse(result?.data?.checkScan)?.body?.message);
          break;
        default:
          setError(JSON.parse(result?.data?.checkScan)?.body?.message);
          break;
      }
    } catch (error) {
      console.log("Error al chequiar Ticket: ", error.message);
    }
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    Alert.alert("Escaner", `Escaneaste el ticket ${data} ¿quieres aceptarlo?`, [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancelado"),
        style: "cancel",
      },
      {
        text: "Aceptar",
        onPress: () => onHandlerCheckTicket(data),
      },
    ]);

    // alert(`Escaneaste el ticket ${data} ¿quieres aceptarlo?`);
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empieza a escanear tus tickets</Text>
      {msgSuccess && <Text style={{ color: "green" }}>{msgSuccess}</Text>}
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      {renderCamera()}
      <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
        <Text style={styles.buttonText}>Escanea un ticket de nuevo</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: '#ffce48',
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontFamily: 'thin',
    marginBottom: 30,
    textAlign: 'center'
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: "100%",
    aspectRatio: 1,
    overflow: "hidden",
    marginBottom: 40,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: "#1f1f1f",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "light",
  },
});
