import { View } from 'react-native';
import { styles } from './SearchUser.styles';
import { Input } from 'native-base';
import { createFilter } from 'react-search-input';

const KEY_TO_FILTER = [
    "email",
    "firstname",
    "lastname",
    "participant_one.email",
    "participant_one.firstname",
    "participant_one.lastname",
    "participant_two.email",
    "participant_two.firstname",
    "participant_two.lastname",    
];


export function SearchUser(props) {
    const { data , setData } = props;
    const onSearch = (text) => {
        const resultSearch = data.filter(createFilter(text , KEY_TO_FILTER ));
        setData(resultSearch);
    }
  return (
    <View style = {styles.content}>
      <Input placeholder='Search User' variant="unstyled" style = {styles.input} onChangeText={onSearch}/>
    </View>
  )
}