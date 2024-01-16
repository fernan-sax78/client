import { View } from 'react-native';
import { Spinner , Heading } from 'native-base';


export function LoadingScreen() {
  return (
    <View style = {{flex : 1,justifyContent : "center" , alignItems : "center"}}>
      <Spinner size= "large"/>
      <Heading color="primary.500" fontSize="md" marginTop={2}>
       Loading Chats
      </Heading>
    </View>
  )
}