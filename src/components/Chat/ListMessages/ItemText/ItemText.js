import { Text, View } from 'react-native';
import { Avatar } from 'native-base';
import { styled } from './ItemText.styles';
import { useAuth } from '../../../../hooks';
import { DateTime } from 'luxon';
import { ENV } from '../../../../utils';


export function ItemText(props) {
    const { messages } = props;
    const { user } = useAuth();
    const isMe = user._id === messages.user._id;
    const styles = styled(isMe);
    const createMessage = new Date(messages.createdAt);
    
  return (
    <View style = {styles.content}>
      <View style = {styles.triangle}></View>

     
      {!isMe ? (
      <Avatar bg = "cyan.500" style = {styles.avatarMesg} source={{uri : messages.user.avatar && `${ENV.BASE_PATH}/${messages.user.avatar}`}}>
        {messages.user.email.substring( 0 , 2 ).toUpperCase()}
      </Avatar>
      ) : (
/*         <Avatar style = {Platform.OS === "ios" ? styles.MeMesg : styles.avatarMesgAndroid} source={{uri : messages.user.avatar && `${ENV.BASE_PATH}/${messages.user.avatar}`}}>
            {messages.user.email.substring( 0 , 2 ).toUpperCase()}
        </Avatar> */null
      ) }

     <View style = {styles.message}>


      <Text style = {styles.text}>
        {messages.message}
      </Text>

      <Text style = {styles.date}>
        {DateTime.fromISO(createMessage.toISOString()).toFormat("HH:mm")}
      </Text>

     </View>
    </View>
  )
}