import { useState , useRef } from 'react';
import { Camera , FlashMode , CameraType } from 'expo-camera';
import { View } from 'react-native';
import { IconButton , CloseIcon , Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './cameraScreen.styles';
import { useNavigation , useRoute } from '@react-navigation/native';
import { PhotoCapture } from '../../../components/Shared';

export function CameraScreen() {

  const navigation = useNavigation();
  const { params } = useRoute();
  const [photo, setPhoto] = useState(null);
  const [flashOn, setFlashOn] = useState(false);
  const [cameraback, setCameraBack] = useState(true);
  const cameraRef = useRef();

  
  const onClose = () => navigation.goBack();

  const onOffFlash = () => setFlashOn((prevState) => !prevState); 
  const changeTypeCamera = () => setCameraBack((prevState) => !prevState);
  const capturePhoto = async () => {
    const options = {quality : 1};
    const newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  }

  if (photo) {
    return <PhotoCapture photo = {photo} type = {params.type} id = {params.id}/>  
  }



  return (
    <Camera 
    style = {styles.container} 
    flashMode={flashOn ? FlashMode.torch : FlashMode.off}
    type = { cameraback ? CameraType.back : CameraType.front}
    ref={cameraRef}
    >
      <View style = {styles.topActions}>
        <IconButton icon={<CloseIcon style = {styles.icon}/>} onPress={onClose}/>
        <IconButton 
        onPress = {onOffFlash} 
        icon={<Icon 
        style = {styles.icon} 
        as={MaterialCommunityIcons} 
        size={6} 
        name={ flashOn  ? "flash" :  "flash-off"}
        />} 
        />
      </View>

      <View style = {styles.bottomActions} >
          <IconButton icon={<Icon as={MaterialCommunityIcons} name='circle' color={null}/>} />
          
          <IconButton 
          onPress={capturePhoto}
          icon={<Icon 
          as={MaterialCommunityIcons} 
          size={20} 
          name='circle-outline'
          color= "#d9534f" 
          style = {styles.iconCapture}
          />}
          />
          <IconButton 
          onPress={changeTypeCamera}
          style = {styles.iconBackground} 
          icon={
          <Icon 
          as={MaterialCommunityIcons} 
          size={6} name='camera-flip' 
          style = {styles.icon}/>
        }/>
      </View>
    </Camera>
  )
}