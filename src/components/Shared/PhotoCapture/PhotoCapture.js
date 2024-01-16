import { useState } from 'react';
import { View } from 'react-native';
import { IconButton , Image , CloseIcon , Icon , Spinner } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ChatMessage , GroupMessage } from '../../../api';
import { useAuth } from '../../../hooks';
import { imageExpoFormat } from '../../../utils';
import { styles } from './photoCapture.styles';


const chatMessageCtrl = new ChatMessage();
const groupMessageCtrl = new GroupMessage();

export function PhotoCapture(props) {

    const { photo , type , id } = props;
    const [loading, setLoading] = useState(false);
    const { accessToken } = useAuth();

    const navigation = useNavigation();
    const sendMedia = async () => {
        try {
            setLoading(true);
            
            const file = imageExpoFormat(photo.uri);

            if (type === "chat") {
                await chatMessageCtrl.sendImage(accessToken , id , file);
            }
            if(type === "group") {
                await groupMessageCtrl.sendImageGroup(accessToken , id , file);
            }
           
                setLoading(false);
                navigation.goBack();
          
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <View style = {styles.container}>
       <Image 
       source={{ uri : photo.uri}}
       alt='photo'
       style = { styles.photo}
       />
       <View style = { styles.topActions}>
         <IconButton icon={<Icon as={MaterialCommunityIcons} name='circle' color={null}/>} />
         <IconButton 
         style = {styles.iconBackgroundClose}
         onPress={navigation.goBack}
         icon={
         <CloseIcon 
         style = { styles.iconClose}
         size = {8}
         />}
         />
       </View>

       <View style = { styles.bottomActions}>
       <IconButton icon={<Icon as={MaterialCommunityIcons} name='circle' color={null}/>} />

        {loading ? (
            <Spinner size="large" color="primary.500"/>
        ) : (
            <IconButton 
            onPress={sendMedia}
            icon={<Icon as={MaterialCommunityIcons} size={20} name='check-circle-outline' style = {styles.icon} />}
            />
        )}
        <IconButton icon={<Icon as={MaterialCommunityIcons} name='circle' color={null}/>} />
       </View>
    </View>
  )
}