import { View} from 'react-native';
import { Input } from 'native-base';
import { createFilter } from 'react-search-input';
import { styles } from './Search.styles';

const KEYS_FILTERS = ["email", "firstname" , "lastname" , "name"];

export function Search(props) {
    const { data , setData } = props;

    const onSearch = (text) => {
       const resultSearch = data.filter(createFilter(text , KEYS_FILTERS));
       setData(resultSearch);
    }
  return (
    <View style = {styles.content}>
       <Input 
       placeholder='Search' 
       onChangeText={onSearch} 
       style = {styles.input} 
       variant="unstyled"
       />
    </View>
  )
}