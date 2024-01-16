import { View, Text, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AutoHeightImage from 'react-native-auto-height-image';
import { styled } from './itemImage.styles';
import { useAuth } from '../../../../hooks';
//import { Avatar } from 'native-base';
import { DateTime } from 'luxon';
import { ENV , screens  } from '../../../../utils';




export function ItemImage(props) {
const { message } = props ; 
const { user } = useAuth();
const isMe = user._id === message.user._id;
const styles = styled(isMe);
const navigation = useNavigation();
const createMessage = new Date(message.createdAt);



const urlImage = `${ENV.BASE_PATH}/${message.message}`;

const onOpenImage = () => {
    navigation.navigate(screens.global.imageFullScreen , { uri : urlImage });
}

  return (
    <View style = {styles.content}>
      {/* {!isMe ? (
      <Avatar bg = "cyan.500" style = {styles.avatarMesg} source={{uri : message.user.avatar && `${ENV.BASE_PATH}/${message.user.avatar}`}}>
        {message.user.email.substring( 0 , 2 ).toUpperCase()}
      </Avatar>
      ): (
        <Avatar style = {styles.MeMesg} source={{uri : message.user.avatar && `${ENV.BASE_PATH}/${message.user.avatar}`}}>
            {message.user.email.substring( 0 , 2 ).toUpperCase()}
        </Avatar>
      ) } */}
      <View style = {styles.message}>

        <Pressable onPress={onOpenImage}>
        <AutoHeightImage width={300} maxHeight={400} source={{ uri : urlImage }}style = {styles.image}  />
        </Pressable>
        {!isMe ? (
            <Text style = {styles.identity} >
            {message.user.firstname || message.user.lastname ? `${message.user.firstname || ""}` 
            : message.user.email} 
            </Text>
        ):(
             <Text style = {styles.identity} >
                Me 
             </Text>
        )}        
        <Text style = {styles.date}>
          {DateTime.fromISO(createMessage.toISOString()).toFormat("HH:mm")}
        </Text>
      </View>
    </View>
  )
}