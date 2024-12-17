import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Optional: Use Material Icons for extra visual appeal
import { useClerk, useUser } from "@clerk/clerk-expo";

export default function PastOrders() {
    const { user } = useUser(); // Access user from context
    const [orders, setOrders] = useState([]); // State to hold fetched orders

    useEffect(() => {
        // if (!user || !user.username) {
        //     console.warn("User information is missing.");
        //     return; // Exit if user information is not available
        // }

        // Replace this URL with your actual backend endpoint
        const API_URL = `http://${process.env.IP_USED}:${process.env.KIOSK_COMM_SERVICE_PORT}/kiosk-comm/api/orders/pastOrders`;

        const fetchOrders = async () => {
            try {
                console.log(user.fullName)
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: null,
                        userName: user.fullName
                    }),
                });

                const data = await response.json();
                console.log(data)
                setOrders(data.data);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            }
        };

        void fetchOrders();
    }, [user]);

    const renderItem = ({ item }) => (
        <View style={styles.orderItem}>
            <View style={styles.orderInfo}>
                <Text style={styles.itemText}>
                    Order ID: <Text style={styles.boldText}>{item.id}</Text>
                </Text>
                <Text style={styles.itemText}>
                    Total Amount: <Text style={styles.boldText}>${item.totalAmount.toFixed(2)}</Text>
                </Text>
                <Text style={styles.itemText}>
                    Restaurant Name: <Text style={styles.boldText}>{item.restaurantName}</Text>
                </Text>
                {item.orderDetails && item.orderDetails.itemName && (
                    <Text style={styles.itemText}>
                        Item: <Text style={styles.boldText}>{item.orderDetails.itemName}</Text>
                    </Text>
                )}
                {item.orderDetails && item.orderDetails.date && (
                    <Text style={styles.itemText}>
                        Date: <Text style={styles.boldText}>{item.orderDetails.date}</Text>
                    </Text>
                )}
            </View>
            <TouchableOpacity style={styles.button} onPress={() => handleInfoPress(item)}>
                <MaterialIcons name="info" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );

    const handleInfoPress = (order) => {
        // Handle the info button press, e.g., navigate to order details
        console.log("Order Details:", order);
        // You can integrate navigation or other actions here
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Past Orders</Text>
            <FlatList
                data={orders} // Use fetched orders instead of mockOrders
                keyExtractor={(item) => item.id.toString()} // Ensure the key is a string
                renderItem={renderItem}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>You have no past orders.</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f7f8fa",
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    orderItem: {
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
        backgroundColor: "#fff",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        alignItems: "center",
    },
    orderInfo: {
        flex: 1,
        paddingRight: 10,
    },
    itemText: {
        fontSize: 16,
        color: "#555",
        marginBottom: 5,
    },
    boldText: {
        fontWeight: "600",
        color: "#333",
    },
    button: {
        width: 40,
        height: 40,
        backgroundColor: "#6200ea",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    emptyText: {
        fontSize: 18,
        color: "#555",
    },
});
