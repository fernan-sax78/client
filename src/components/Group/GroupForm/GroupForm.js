import { useState , useEffect } from 'react';
import { View, Keyboard , TextInput} from 'react-native';
import { Input , IconButton , Icon } from 'native-base';
import { styles } from './groupForm.styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFormik } from 'formik';
import { initialValues , validationSchema } from './GroupForm.form';
import { GroupMessage } from '../../../api';
import { useAuth } from '../../../hooks';
import { SendMedia } from './SendMedia';

const groupMessageCtrl = new GroupMessage();



export function GroupForm(props) {

const { groupId } = props;

const [keyboardHeight, setKeyBoardHeight] = useState(0);
const { accessToken } = useAuth();    


    useEffect(() => {
       const showKeyBoardSub = Keyboard.addListener("keyboardDidShow" , (e) => {
       const { startCoordinates } = e ; 

        if (Platform.OS === "ios") {

        if (startCoordinates.height === 243) setKeyBoardHeight( startCoordinates.height + 65 ); 
        if (startCoordinates.height === 395 ) setKeyBoardHeight( startCoordinates.height - 85 ); 
        if (startCoordinates.height === 346 ) setKeyBoardHeight( startCoordinates.height + 15 );
        if ( startCoordinates.height === 394 ) setKeyBoardHeight( startCoordinates.height - 35 );

        }
       });

       const hideKeyBoardSub = Keyboard.addListener("keyboardDidHide" , () => {
         setKeyBoardHeight(0);
       })

       return () => {
        showKeyBoardSub.remove();
        hideKeyBoardSub.remove();
       }
    }, []);

    
    

    const formik = useFormik({
        initialValues : initialValues(),
        validationSchema : validationSchema(),
        validateOnChange : false ,
        onSubmit : async (formValue) => {
            try {
              await groupMessageCtrl.sendTextGroup( accessToken , groupId , formValue.message );
              setKeyBoardHeight(0);
              Keyboard.dismiss();


              formik.handleReset();
            } catch (error) {
                console.error(error);
            }
        }
    });
  return (
    <View style = {[styles.content , {bottom : keyboardHeight}]}>

       <SendMedia groupId = {groupId}/>  

       <View style = {styles.inputContainer}>
        <TextInput 
        placeholder='Send Message'
        style = {styles.input}
        value= {formik.values.message}
        variant= "unstyled"
        onChangeText={(text) => formik.setFieldValue("message" , text)}
        onEndEditing={() => !formik.isSubmitting && formik.handleSubmit}
        />
        <IconButton 
         icon={<Icon as={MaterialCommunityIcons} name = "send"/>}
         padding={0}
         style = {styles.iconSend}
         onPress= {!formik.isSubmitting && formik.handleSubmit}
        />
       </View>
    </View>
  )
}