import { useState } from 'react';
import { IconButton , AddIcon , Actionsheet } from 'native-base';
import { styles } from './sendMedia.styles';
import { GalleryOptions , CameraOption } from './options';
import { useAuth } from '../../../../hooks';
import { Keyboard } from 'react-native';


export function SendMedia(props) {

    const { groupId } = props ;
    const [show, setShow] = useState(false);
    const { accessToken } = useAuth();

    const onOpenClose = () => {
      setShow((prevState) => !prevState)
      Keyboard.dismiss();
    };


  return (
    <>
     <IconButton 
     icon={<AddIcon />}
     padding={0}
     onPress={onOpenClose}
     />
     <Actionsheet isOpen = {show} onClose={onOpenClose}>
        <Actionsheet.Content style = {styles.itemsContainer}>
        <GalleryOptions 
        onClose = {onOpenClose} 
        groupId = {groupId}
        accessToken = {accessToken}
        />

        <CameraOption onClose = {onOpenClose} groupId = {groupId}/>


          <Actionsheet.Item 
          style = {[styles.option , styles.cancel]}
          _text = {styles.cancelText}
          onPress={onOpenClose}
          >
            Cancel
          </Actionsheet.Item>
        </Actionsheet.Content>
     </Actionsheet>
    </>
  )
}