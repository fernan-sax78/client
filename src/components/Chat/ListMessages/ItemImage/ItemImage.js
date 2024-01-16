import { View, Text , Pressable } from 'react-native';
import { styled } from './ItemImage.styles';
import { useNavigation } from '@react-navigation/native';
import AutoHeightImage from 'react-native-auto-height-image';
import { DateTime } from 'luxon';
import { useAuth } from '../../../../hooks';
import { ENV , screens } from '../../../../utils';


export function ItemImage(props) {
    const { messages } = props;
    const { user } = useAuth();
    
    const isMe = user._id === messages.user._id;
    const styles = styled(isMe);
    const createMessage = new Date(messages.createdAt);
    const navigation = useNavigation();

    const imgUrl = `${ENV.BASE_PATH}/${messages.message}`
    
    const onOpenImage = () => {
        navigation.navigate(screens.global.imageFullScreen , {uri : imgUrl});
    }

  return (
    <View style = {styles.content}>
      <View style = {styles.message}>
        <Pressable onPress={onOpenImage}>        
        <AutoHeightImage 
        width = {300} 
        maxHeight={400} 
        source={{ uri :imgUrl }} 
        style = {styles.image}
        />
        </Pressable>

        {!isMe ? (
            <Text style = {styles.identity} >
            {messages.user.firstname || messages.user.lastname ? `${messages.user.firstname || ""}` 
            : messages.user.email} 
            </Text>
        ):(
             <Text style = {styles.identity} >
                Me 
             </Text>
        )}  
        <Text style = {styles.date}>{DateTime.fromISO(createMessage.toISOString()).toFormat("HH:mm")}</Text>
      </View>
    </View>
  )
}