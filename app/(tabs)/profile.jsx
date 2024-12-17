import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
    Alert,
} from "react-native";
import { useUser, useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function Profile() {
    const { user } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut();
            router.replace("/login");
        } catch (err) {
            console.error("Error signing out:", err);
            Alert.alert(
                "Logout Error",
                "An error occurred while logging out. Please try again."
            );
        }
    };

    if (!user) {
        return (
            <View style={styles.loaderContainer}>
                <Text style={styles.loaderText}>Loading Profile...</Text>
            </View>
        );
    }

    const {
        firstName,
        lastName,
        emailAddresses,
        profileImageUrl,
        username,
    } = user;

    // Use the primary email address
    const emailAddress =
        emailAddresses?.[0]?.emailAddress || "No email available";

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileCard}>
                <Image
                    source={
                        profileImageUrl
                            ? { uri: profileImageUrl }
                            : require("./../../assets/images/user.jpg")
                    }
                    style={styles.profileImage}
                />
                <Text style={styles.nameText}>
                    {firstName} {lastName}
                </Text>
                {username && <Text style={styles.usernameText}>@{username}</Text>}
                <Text style={styles.emailText}>{emailAddress}</Text>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Profile Information</Text>
                <Text style={styles.infoItem}>
                    <Text style={styles.label}>First Name:</Text> {firstName}
                </Text>
                <Text style={styles.infoItem}>
                    <Text style={styles.label}>Last Name:</Text> {lastName}
                </Text>
                <Text style={styles.infoItem}>
                    <Text style={styles.label}>Email:</Text> {emailAddress}
                </Text>
                {username && (
                    <Text style={styles.infoItem}>
                        <Text style={styles.label}>Username:</Text> {username}
                    </Text>
                )}
            </View>

            <Pressable style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#f8f9fa",
        alignItems: "center",
        justifyContent: "center", // Center content vertically
        padding: 20,
    },
    profileCard: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        marginBottom: 20,
        width: "100%",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
        backgroundColor: "#e0e0e0",
    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333333",
        textAlign: "center",
    },
    usernameText: {
        fontSize: 16,
        color: "#555555",
        marginTop: 5,
        textAlign: "center",
    },
    emailText: {
        fontSize: 14,
        color: "#777777",
        marginTop: 5,
        textAlign: "center",
    },
    infoSection: {
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333333",
        marginBottom: 15,
        textAlign: "center",
    },
    infoItem: {
        fontSize: 16,
        marginBottom: 10,
        color: "#555555",
        textAlign: "center",
    },
    label: {
        fontWeight: "bold",
        color: "#333333",
    },
    logoutButton: {
        marginTop: 30,
        backgroundColor: "#FF3B30",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        width: "100%",
    },
    logoutText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loaderText: {
        fontSize: 16,
        color: "#777777",
    },
});
