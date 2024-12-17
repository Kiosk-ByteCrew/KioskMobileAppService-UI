import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator, Vibration } from "react-native";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import { useUser } from "@clerk/clerk-expo"; // Import useUser hook.

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanningEnabled, setScanningEnabled] = useState(true);
    const [scannedData, setScannedData] = useState(null);
    const [loading, setLoading] = useState(false);

    const { user } = useUser(); // Use useUser to access user info directly.

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

    const sendScanDataToBackend = async (sessionId) => {
        try {
            if (!user) {
                Alert.alert("Error", "User not logged in.");
                return;
            }
            const emailAddress = user.emailAddresses[0].emailAddress;

            setLoading(true);

            const payload = {
                sessionId,
                username: user.fullName || user.username,
                emailAddress,
            };

            const response = await fetch(`http://${process.env.IP_USED}:${process.env.KIOSK_SERVICE_PORT}/kiosk/api/scan`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.text();
                Alert.alert("Success", `Server response: ${data}`);
            } else {
                const errorText = await response.text();
                Alert.alert("Error", `Failed to send data: ${errorText}`);
            }
        } catch (error) {
            console.error("Error sending scan data:", error);
            Alert.alert("Error", "An error occurred while sending data to the server.");
        } finally {
            setLoading(false);
            setScanningEnabled(true); // Re-enable scanning for subsequent QR codes.
        }
    };

    const onBarcodeScanned = ({ data }) => {
        if (!scanningEnabled) return;
        try {
            Vibration.vibrate();
            setScanningEnabled(false);
            setScannedData(data);

            // Extract session ID from scanned data.
            const sessionId = data; // Assuming the QR code directly contains the session ID.
            sendScanDataToBackend(sessionId);
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
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={styles.loadingText}>Processing...</Text>
                </View>
            )}
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
    loadingOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        color: "#ffffff",
        fontSize: 18,
        marginTop: 10,
    },
});
