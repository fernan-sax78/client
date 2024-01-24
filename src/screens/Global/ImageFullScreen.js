import { View , Image } from 'native-base';
import { useRoute } from '@react-navigation/native';

export function ImageFullScreen() {
  const { params } = useRoute();

  //console.log(params);
  return (
    <View>
      <Image
      source={{uri : params.uri}}
      style = {{width : "100%" , height : "100%"}}
      alt='image'
      resizeMode='contain'
      />
    </View>
  )
}