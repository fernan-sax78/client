import { View } from 'react-native';
import { Input , Button } from 'native-base';
import { styles } from './ChangeLastName.styles';
import { initialValue , validateSchema } from './ChangeLastNameScreen.form';
import { useFormik } from 'formik';
import { User } from '../../../api';
import { useAuth } from '../../../hooks';
import { useNavigation } from '@react-navigation/native';


const userCtrl = new User();

export function ChangeLastNameScreen() {

  const navigation = useNavigation();
  const { accessToken , updateUser } = useAuth();

    const formik = useFormik({
        initialValues : initialValue(),
        validationSchema : validateSchema(),
        validateOnChange : false,
        onSubmit : async (formValue) => {
         try {
          const dataUser = {lastname : formValue.lastname};
          await userCtrl.updateUser(accessToken , dataUser);
          updateUser("lastname" , formValue.lastname);
          navigation.goBack();
         } catch (error) {
          console.error(error)
         }
        }
    })
  return (
    <View style = {styles.content}>
      <Input 
      placeholder='Your Lastname'
      style = {[styles.input , formik.errors.lastname && styles.inputError]}
      variant="unstyled"
      autoFocus
      value= {formik.values.lastname}
      onChangeText={text => {formik.setFieldValue("lastname" , text)}}
      />
      <Button 
      style = {styles.btn}
      onPress={formik.handleSubmit}
      isLoading= {formik.isLoading}
      >
        CHANGE YOUR LASTNAME
      </Button>
    </View>
  )
}