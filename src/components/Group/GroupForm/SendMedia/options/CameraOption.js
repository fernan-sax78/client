import { Actionsheet , Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../sendMedia.styles';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { screens } from '../../../../../utils';

export function CameraOption(props) {
    const { onClose , groupId } = props;
    const navigation = useNavigation();


    const openCamera = async() => {
       const { status } = await Camera.requestCameraPermissionsAsync();
       
       if (status !== "granted") {
         console.error('you need to agree the conection to camera first');
       }else{
        onClose();
        navigation.navigate(screens.global.cameraScreen, {
          type : "group",
          id : groupId ,
        })
       }
    }

  return (
    <Actionsheet.Item 
    style = {[styles.option , styles.optionStart]} 
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