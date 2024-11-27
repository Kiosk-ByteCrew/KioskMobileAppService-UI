import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator, Vibration } from "react-native";
import {Camera, CameraView, useCameraPermissions} from "expo-camera";

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanningEnabled, setScanningEnabled] = useState(true);
    const [scannedData, setScannedData] = useState(null);

    if (!permission) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>
                    Camera access is required to scan QR codes.
                </Text>
                <Button title="Allow Camera Access" onPress={requestPermission} />
            </View>
        );
    }

    const onBarcodeScanned = ({ data }) => {
        if (!scanningEnabled) return;

        try {
            Vibration.vibrate();
            setScanningEnabled(false);
            setScannedData(data);

            // Perform any action with the scanned data
            Alert.alert("QR Code Scanned", `Data: ${data}`, [
                { text: "OK", onPress: () => setScanningEnabled(true) },
            ]);
        } catch (error) {
            Alert.alert("Error", "Failed to scan QR code. Please try again.");
            setScanningEnabled(true);
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={{ flex: 1 }}
                facing="back"
                onBarcodeScanned={onBarcodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
            />
            {scannedData && (
                <View style={styles.dataContainer}>
                    <Text style={styles.dataText}>Scanned Data:</Text>
                    <Text style={styles.dataText}>{scannedData}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    permissionText: {
        fontSize: 18,
        textAlign: "center",
        margin: 20,
    },
    dataContainer: {
        position: "absolute",
        bottom: 50,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: 20,
        borderRadius: 10,
        width: "90%",
        alignSelf: "center",
    },
    dataText: {
        color: "#fff",
        fontSize: 16,
    },
});
