import { View } from 'react-native';
import { Input , Button } from 'native-base';
import { styles } from './LogInForm.styles';
import { useFormik } from 'formik';
import { initialValue , validationShema } from './LogInForm.form';
import { Auth } from '../../../api';
import { useAuth } from '../../../hooks';



const authCtrl =  new Auth();

export function LogInForm() {


const { login } = useAuth();

const formik = useFormik({
    initialValues : initialValue(),
    validationSchema : validationShema(),
    validateOnChange : false,
    onSubmit : async (formValue) => {
             try {
       const response =  await authCtrl.login(formValue.email , formValue.password);
       const {access , refresh} = response;

       await authCtrl.setAccessToken(access);
       await authCtrl.setRefreshToken(refresh);

        await login(access);
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
        variant='unstyled'
        autoCapitalize='none'
        value={formik.values.email}
        onChangeText={text => formik.setFieldValue("email" , text)}
        style = {[styles.input , formik.errors.email && styles.inputError]}
        />
      </View>
        <Input 
        placeholder='Password'
        variant='unstyled'
        value={formik.values.password}
        secureTextEntry
        onChangeText={text => formik.setFieldValue("password" , text)}          
        style = {[styles.input , formik.errors.password && styles.inputError]}
        />

        <Button 
        style = {styles.btn}
        onPress = {formik.handleSubmit}
        isLoading = {formik.isSubmitting}
        >
          LOG IN TO YOUR ACCOUNT  
        </Button>                
    </View>
  )
}