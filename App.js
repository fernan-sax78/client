import { NavigationContainer } from '@react-navigation/native';
import { HandlerNavigation } from './src/navigations';
import { NativeBaseProvider } from 'native-base';
import { AuthProvider } from './src/context';



export default function App() {



  return (

  
      <NavigationContainer>
          
     <NativeBaseProvider>
      
      <AuthProvider>
         <HandlerNavigation />
      </AuthProvider>
        
     </NativeBaseProvider>            
          
      </NavigationContainer>


  );
}



