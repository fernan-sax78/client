import { useState , useEffect } from 'react';
import { SafeAreaView, Text , Pressable  } from 'react-native';
import { IconButton , /* ChevronLeftIcon , */  ArrowBackIcon , Avatar, View } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { styles } from './headerGroup.styles';
import { useNavigation } from '@react-navigation/native';
import { ENV , screens } from '../../../utils';
import { Group } from '../../../api';
import { useAuth } from '../../../hooks';


const groupCtrl = new Group();


export function HeaderGroup(props) {
    const { groupId } = props;
    const { accessToken } = useAuth();
    const navigation = useNavigation();
    const [group, setGroup] = useState(null);


    useEffect(() => {
      try {
        (async () => {
         const response = await groupCtrl.obtain(accessToken , groupId) ;
         setGroup(response);
        })();
      } catch (error) {
        console.error(error);
      }
    }, [groupId])
    

    const goToGroupProfile = () => {
        navigation.navigate(screens.global.groupProfileScreen , {
            groupId,
        })
    }

  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.content}>
        <View style = {styles.info}>
          <IconButton 
          icon={<ArrowBackIcon />}
          padding={0}
          onPress={navigation.goBack}
          />
         {group && (
            <Pressable onPress={goToGroupProfile} style = {styles.info}>
               <Avatar bg="cyan.500"
               marginRight={3}
               size="sm"
               style = {styles.avatar}
               source={{uri : `${ENV.BASE_PATH}/${group.image}`}}
               />
               <Text style= {styles.name}>
                  {group.name}
               </Text>
               <FontAwesomeIcon icon={faUserGroup} size={20} color='#0275d8'/>
            </Pressable>
         )}
        </View>
      </View>
    </SafeAreaView>
  )
}