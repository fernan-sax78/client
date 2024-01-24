import { useState , useEffect } from 'react';
import { ChatMessage } from '../../../api';
import { View, Keyboard , Platform , TextInput} from 'react-native';
import { Input, IconButton , Icon } from 'native-base';
import {  MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './ChatForm.styles';
import { useAuth } from '../../../hooks';
import { initialValues , validationSchema } from './ChatForm.form';
import { useFormik } from 'formik';
import { SendMedia } from './SendMedia';


const chatMessageCtrl = new ChatMessage();


export function ChatForm(props) {
 const { chatId } = props;
 const { accessToken } = useAuth();
 const [keyBoardHeight, setKeyBoardHeight] = useState(0);
 



 
 

 useEffect(() => {
     const showKeyBoard = Keyboard.addListener("keyboardDidShow" , (e) => {
        
        const { startCoordinates  } = e ;

        //console.log(startCoordinates);

        if (Platform.OS === "ios") {

        if (startCoordinates.height === 243) setKeyBoardHeight( startCoordinates.height + 65 ); 
        if (startCoordinates.height === 395 ) setKeyBoardHeight( startCoordinates.height - 85 ); 
        if (startCoordinates.height === 346 ) setKeyBoardHeight( startCoordinates.height + 15 );
        if ( startCoordinates.height === 394 ) setKeyBoardHeight( startCoordinates.height - 35 );

        }

      });

      const hideKeyBoard = Keyboard.addListener("keyboardDidHide" , () => {
        setKeyBoardHeight(0);
      })

      return () => {
        showKeyBoard.remove();
        hideKeyBoard.remove();
      }
    }, []);

    const formik = useFormik({
        initialValues : initialValues(),
        validationSchema : validationSchema(),
        validateOnChange : false,
        onSubmit : async(formValue) => {
          try {

            await chatMessageCtrl.sendText(accessToken , chatId , formValue.message)
            setKeyBoardHeight(0);
            Keyboard.dismiss();

            formik.handleReset();
          } catch (error) {
            console.error(error);
          }
        }
    });
    
  return (
    <View style = {[styles.content , {bottom : keyBoardHeight}]}>

      
      <SendMedia chatId = { chatId } />

       

      <View style = {styles.inputContainer}>
        <TextInput 
        placeholder='Send Message'
        style = {styles.input}
        value={formik.values.message}
        variant="unstyled"
        onChangeText={(text) => formik.setFieldValue("message" , text)}
        onEndEditing={() => !formik.isSubmitting && formik.handleSubmit}
        />
        <IconButton 
        icon={<Icon as={MaterialCommunityIcons} name = "send"/>}
        padding = {0}
        style = {styles.iconSend}
        onPress={!formik.isSubmitting && formik.handleSubmit}
        />

      </View>
    </View>
  )
}