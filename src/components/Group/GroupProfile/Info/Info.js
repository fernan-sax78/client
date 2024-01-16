import { View, Text , Pressable} from 'react-native';
import { Avatar , InfoIcon } from 'native-base';
import { ENV , imageExpoFormat , screens } from '../../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { styles } from './info.styles';
import { Group } from '../../../../api';
import * as ImagePicker from "expo-image-picker";
import { useAuth } from '../../../../hooks';
import { useNavigation } from '@react-navigation/native';


const groupCtrl = new Group();

export function Info(props) {
   const { group , setGroup } = props;
   const { accessToken } = useAuth();
   const navigation = useNavigation();

   const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes : ImagePicker.MediaTypeOptions.Images ,
        allowsEditing : false ,
        quality : 1 ,
    });
    if( !result.canceled ) {
        updateImage(result.assets[0].uri);
    }
   }


   const updateImage = async ( uri ) => {
        try {
            const file = imageExpoFormat( uri );
            

            const response = await groupCtrl.update( accessToken , group._id , { file } );

            setGroup({ ...group , image : response.image }); 

        } catch (error) {
            console.error(error);
        }

   }



        const openChangeNameGroup = () => {
            navigation.navigate(screens.global.changeNameGroupScreen , {
                groupId : group._id,
                groupName : group.name,
            })
        }
        
  return (
    <View style = { styles.content }>
        <Pressable onPress={ openGallery }>
            <Avatar 
            bg= "cyan.500"
            size= "xl"
            source={{uri : `${ENV.BASE_PATH}/${group.image}`}}
            />
        </Pressable>

        <Text style = { styles.name } onPress={openChangeNameGroup}>
            {group.name} <FontAwesomeIcon icon={faUserGroup} size={25} color='#aaaaaa'/>
        </Text>
          
         

      <Text style = { styles.type }>Group <InfoIcon color = "#aaaaaa" style = {styles.infoIcon} /></Text>
      
          
    </View>
  )
}