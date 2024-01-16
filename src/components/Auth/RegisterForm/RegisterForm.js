import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './RegisterForm.styles';
import { Button , Input } from 'native-base';
import { Auth } from '../../../api';
import { useFormik } from 'formik';
import { initialValue , validationShema } from './RegisterForm.form';


const authCtrl =  new Auth();

export function RegisterForm() {
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues : initialValue(),
    validationSchema : validationShema(),
    validateOnChange : false,
    onSubmit : async (formValue) => {
      try {
        await authCtrl.register(formValue.email , formValue.password);
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    }
  })
  return (
    <View>
      <View style = {styles.viewInput}>
        <Input 
        placeholder='Email'
        variant="unstyled"
        value={formik.values.email}
        autoCapitalize='none'
        onChangeText={text => formik.setFieldValue("email" , text)}
        style = {[styles.input , formik.errors.email && styles.inputError]}
        />
      </View>

         <Input 
        placeholder='Password'
        variant="unstyled"
        value={formik.values.password}
        onChangeText={text => formik.setFieldValue("password" , text)}       
        secureTextEntry
        style = {[styles.input , formik.errors.password && styles.inputError]}
        />  

        <Button 
        style = {styles.btn}
        onPress = {formik.handleSubmit}
        isLoading = {formik.isSubmitting}
        >
            CREATE YOUR ACCOUNT
        </Button>  

    </View>
  )
}