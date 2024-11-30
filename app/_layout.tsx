// import { Stack } from "expo-router";
//
// export default function RootLayout() {
//   return <Stack />;
// }
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="past-orders" options={{ title: "Past Orders" }} />
      </Stack>
  );
}
