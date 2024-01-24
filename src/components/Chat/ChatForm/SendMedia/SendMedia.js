import { useState } from 'react';
import { IconButton , AddIcon , Actionsheet } from 'native-base';
import { styles } from './SendMedia.styles';
import { GalleryOptions , CameraOption } from './Options';
import { useAuth } from '../../../../hooks';
import { Keyboard } from 'react-native';



export function SendMedia(props) {
    const { chatId  } = props;
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
     <Actionsheet
     isOpen ={show}
     onClose={onOpenClose}
     >

        <Actionsheet.Content style = {styles.itemsContainer}>
        <CameraOption onClose = {onOpenClose} chatId = {chatId} />
        <GalleryOptions chatId = {chatId} onClose = {onOpenClose} accessToken = {accessToken}/>

         <Actionsheet.Item
         style = {[styles.options , styles.cancel]}
         _text={styles.cancelText}
         onPress={onOpenClose}
         >

            Cancel

         </Actionsheet.Item>
        </Actionsheet.Content>

     </Actionsheet>
    </>
  )
}