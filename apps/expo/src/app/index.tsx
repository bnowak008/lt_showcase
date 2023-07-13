import React, { useEffect } from "react";
import { Button, Text, TextInput, TouchableOpacity, View, StyleSheet, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { Image } from 'expo-image';

import { data } from "~/consts/data";

import { api, type RouterOutputs } from "~/utils/api";

function ImageCard(props: {
  image: RouterOutputs["images"]["byId"][number];
  onTap: () => void;
}) {
  const router = useRouter();

  return (
    <View style={styles.imageCardContainer}>
      <View>
        <TouchableOpacity style={styles.imageWrap} onPress={() => router.push(`/image/${props.image.id}`)}>
          <Image
            style={styles.image}
            source={props.image.thumbnailUrl}
            // placeholder={blurhash}
            contentFit="contain"
            transition={1000}
          />
          <Text>({props.image.id})</Text>
          <Text>
            {props.image.title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Index = () => {
  const utils = api.useContext();

  const imagesQuery = api.images.byId.useQuery({ id: 3 });

  useEffect(() => {
    if (imagesQuery.isFetching) {
      console.log('fetching');
    }
    
    if (imagesQuery.data) {
      console.log(imagesQuery);
    }
  }, [imagesQuery.isFetching])
  return (
    <SafeAreaView style={styles.wrap}>
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ headerShown: false }} />
        <Image
          style={styles.logo}
          source={require('../../assets/ltLogo.png')}
          // placeholder={blurhash}
          contentFit="contain"
          transition={1000}
        />
        <Text style={styles.text}>
          Lean Techniques Photo Album
        </Text>

        <FlatList
          data={data}
          // estimatedItemSize={20}
          ItemSeparatorComponent={() => <View />} 
          renderItem={(image) => (
            <ImageCard
              image={image.item}
              onTap={() => null}
            />
          )}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 20,
    fontWeight: "500"
  },
  imageCardContainer: {
    height: 300,
    width: Dimensions.get('screen').width
  },
  logo: {
    height: 80,
    width: Dimensions.get('screen').width - 20,
  },
  image: {
    height: 150,
    width: 150
  },
  imageWrap: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center'
  }
});

export default Index;
