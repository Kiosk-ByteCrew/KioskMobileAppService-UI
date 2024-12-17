import React, { useCallback } from 'react';
import { View, Text, ImageBackground, Pressable, StyleSheet } from 'react-native';
import Colors from "../../constants/Colors";
import * as WebBrowser from "expo-web-browser";
import * as Linking from 'expo-linking';
import { useOAuth } from "@clerk/clerk-expo";
import {router, useNavigation} from "expo-router";

export const useWarmUpBrowser = () => {
    React.useEffect(() => {
        // Warm up the android browser to improve UX
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

        const navigation = useNavigation();

        const onPress = useCallback(async () => {
            try {
                const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
                    redirectUrl: Linking.createURL('/home', { scheme: 'myapp' }),
                });

                if (createdSessionId) {
                    // Set the active session
                    await setActive({ session: createdSessionId });
                    router.push('/home');
                } else {
                    // Handle signIn or signUp for next steps such as MFA
                }
            } catch (err) {
                console.error('OAuth error', err);
            }
        }, [navigation]);



    return (
        <ImageBackground
            source={require('./../../assets/images/background_mobile.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
            imageStyle={{ opacity: 0.2 }}
        >
            {/* Content */}
            <View style={styles.contentContainer}>
                <Text style={styles.titleText}>
                    Ready to order your favorite food ?
                </Text>
                <Text style={styles.subtitleText}>
                    Sign in to order your favorite food!!
                </Text>
                <Pressable onPress={onPress} style={styles.button}>
                    <Text style={styles.buttonText}>
                        Get Started
                    </Text>
                </Pressable>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontFamily: 'outfit-bold',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
        color: Colors.WHITE,
    },
    subtitleText: {
        fontFamily: 'outfit',
        fontSize: 18,
        textAlign: 'center',
        color: Colors.GRAY,
        marginBottom: 40,
    },
    button: {
        padding: 14,
        backgroundColor: Colors.PRIMARY,
        width: '100%',
        borderRadius: 14,
    },
    buttonText: {
        fontFamily: 'outfit-medium',
        fontSize: 20,
        textAlign: 'center',
        color: Colors.WHITE,
    },
});
