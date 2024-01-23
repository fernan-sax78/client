import { View, Text } from 'react-native';
import { Avatar } from 'native-base';
import { DateTime } from 'luxon';
import { useAuth } from '../../../../hooks';
import { styled } from './ItemText.styles';
import { ENV } from '../../../../utils';





export function ItemText(props) {
    const { message } = props;
    const { user } = useAuth();
    const isMe = user._id === message.user._id;
    const styles = styled(isMe);
    const createMessage = new Date(message.createdAt);

  return (
    <View style = {styles.content}>
      <View style = {styles.triangle}></View>

     
      {!isMe ? (
      <Avatar  bg = "cyan.500" style = {styles.avatarMesg} source={{uri : message.user.avatar && `${ENV.BASE_PATH}/${message.user.avatar}`}}>
        {message.user.email.substring( 0 , 2 ).toUpperCase()}
      </Avatar>
      ): (
/*         <Avatar  style = {Platform.OS === "ios" ? styles.MeMesg : styles.avatarMesgAndroid} source={{uri : message.user.avatar && `${ENV.BASE_PATH}/${message.user.avatar}`}}>
            {message.user.email.substring( 0 , 2 ).toUpperCase()}
        </Avatar> */null
      ) }
     

      <View style = {styles.message} >
        {!isMe ? (
            <Text style = {styles.identity} >
            {message.user.firstname || message.user.lastname ? `${message.user.firstname || ""}` 
            : message.user.email}  : 
            </Text>
        ):(
             <Text style = {styles.identity} >
                Me : 
             </Text>
        )}

        <Text style = {styles.text}>
          {message.message}
        </Text>

        <Text style = {styles.date}>
          {DateTime.fromISO(createMessage.toISOString()).toFormat("HH:mm")}
        </Text>
       
      </View>
    </View>
  )
}