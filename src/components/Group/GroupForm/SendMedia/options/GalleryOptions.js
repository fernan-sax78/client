import { Actionsheet , Icon } from 'native-base';
import { styles } from '../sendMedia.styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { GroupMessage } from '../../../../../api';
import { imageExpoFormat } from '../../../../../utils';


const groupMessageCtrl = new GroupMessage();

export function GalleryOptions(props) {
  const { onClose , groupId , accessToken } = props ;

  const openGallery = async() => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes : ImagePicker.MediaTypeOptions.Images,
        allowsEditing : false ,
        quality : 1 ,
    });

    if(!result.canceled){
      sendImage(result.assets[0].uri);
    }
  }

  const sendImage = async (uri) => {
     try {
     const file = imageExpoFormat(uri);
     await groupMessageCtrl.sendImageGroup(accessToken , groupId , file);
     onClose();       
     } catch (error) {
        console.error(error);
     }
  }
  return (
    <Actionsheet.Item 
    onPress={openGallery}
    _text = {styles.optionText}
    style = {[styles.option , styles.optionEnd]}
    startIcon={<Icon 
    as={MaterialCommunityIcons} 
    size={6} 
    name='image'
    color="primary.500"
    />}>
      Gallery
    </Actionsheet.Item>
  )
}