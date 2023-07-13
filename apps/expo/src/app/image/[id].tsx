import { SafeAreaView, Text, View } from "react-native";
import { SplashScreen, Stack, useSearchParams } from "expo-router";

import { api } from "~/utils/api";

function Post() {
  const { id } = useSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data } = api.images.byId.useQuery({ id: 3 });

  if (!data) return <SplashScreen />;

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: data[0]?.title }} />
      <View>
        <Text>{data[0]?.title}</Text>
        <Text>{data[0]?.id}</Text>
      </View>
    </SafeAreaView>
  );
}

export default Post;
