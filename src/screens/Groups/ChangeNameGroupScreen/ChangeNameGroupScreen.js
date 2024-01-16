import { View } from 'react-native';
import { styles } from './changeNameGroupScreen.styles';
import { Button , Input } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { validationSchema , initialValues } from './ChangeNameGroupScreen.form';
import { useFormik } from 'formik';
import { Group } from '../../../api';
import { useAuth } from '../../../hooks';


const groupCtrl = new Group();

export function ChangeNameGroupScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { accessToken } = useAuth();


  const formik = useFormik({
    initialValues : initialValues(params.groupName),
    validationSchema : validationSchema(),
    validateOnChange : false,
    onSubmit : async (formValue) => {
      try {
        await groupCtrl.update(accessToken , params.groupId , {
          name : formValue.name,
        });
        navigation.goBack();
        navigation.goBack();
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    }
  })
  return (
    <View style = { styles.content}>
      <Input 
      placeholder='Group Name'
      variant= "unstyled"
      value={formik.values.name}
      onChangeText={(text) => formik.setFieldValue("name" , text)}
      style = {[styles.input , formik.errors.name && styles.inputError]}
      />
      <Button onPress={formik.handleSubmit} style = {styles.btn} isLoading = { formik.isSubmitting }>
        CHANGE GROUP NAME
      </Button>
    </View>
  )
}