import { Actionsheet , Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../SendMedia.styles';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { screens } from '../../../../../utils';


export function CameraOption(props) {
    const { onClose , chatId } = props;
    const navigation = useNavigation();


    const openCamera = async() => {
       const { status } = await Camera.requestCameraPermissionsAsync();
       
       if (status !== "granted") {
         console.log('you need to agree the conection to camera first');
       }else{
        onClose();
        navigation.navigate(screens.global.cameraScreen, {
          type : "chat",
          id : chatId ,
        })
       }
    }
  return (
    <Actionsheet.Item 
    style = {[styles.options , styles.optionsStart]} 
    _text={styles.optionText}
    onPress={openCamera}
    startIcon={<Icon as={MaterialCommunityIcons}
    size="6" 
    name = "camera"
    color="primary.500"
    />} 
    >
       Camera
    </Actionsheet.Item>
  )
}