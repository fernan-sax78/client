import { View } from 'react-native';
import { Input , Button } from 'native-base';
import { styles } from './ChangeFirstNameScreen.styles';
import { initialValue , validateSchema } from './ChangeFirstNameScreen.form';
import { useFormik } from 'formik';
import { User } from '../../../api';
import { useAuth } from '../../../hooks';
import { useNavigation } from '@react-navigation/native';


const userCtrl = new User();

export function ChangeFirstNameScreen() {

  const navigation = useNavigation();
  const { accessToken , updateUser } = useAuth();

    const formik = useFormik({
        initialValues : initialValue(),
        validationSchema : validateSchema(),
        validateOnChange : false,
        onSubmit : async (formValue) => {
         try {
          const dataUser = {firstname : formValue.firstname};
          await userCtrl.updateUser(accessToken , dataUser);
          updateUser("firstname" , formValue.firstname);
          navigation.goBack();
         } catch (error) {
          console.error(error)
         }
        }
    })
  return (
    <View style = {styles.content}>
      <Input 
      placeholder='Your Name'
      style = {[styles.input , formik.errors.firstname && styles.inputError]}
      variant="unstyled"
      autoFocus
      value= {formik.values.firstname}
      onChangeText={text => {formik.setFieldValue("firstname" , text)}}
      />
      <Button 
      style = {styles.btn}
      onPress={formik.handleSubmit}
      isLoading= {formik.isLoading}
      >
        CHANGE YOUR NAME
      </Button>
    </View>
  )
}