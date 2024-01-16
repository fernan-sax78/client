import React,  {useState , useEffect , createContext} from 'react';
import { User , Auth } from '../api';
import { hasExpiredToken } from '../utils';

const userCtrl = new User();
const authCtrl = new Auth();

export const AuthContext = createContext();

export function AuthProvider(props) {
   const { children } = props;

   const [user , setUser] = useState(null);
   const [token , setToken] = useState(null);
   const [loading , setLoading] = useState(true);
   
   useEffect(() => {
      (async () => {
        const accessToken = await authCtrl.getAccessToken();
        const refreshToken = await authCtrl.getRefreshToken();

        if (!accessToken || !refreshToken) {
          logout();
          setLoading(false);
          return;
        }

       if(hasExpiredToken(accessToken)){
         if (hasExpiredToken(refreshToken)) {
            logout();
         }else{
          reLogin(refreshToken);
         }
       }else{
        await login(accessToken);
       }
      
       setLoading(false);
      })();
   }, []);

   const reLogin = async (refreshToken) => {
     try {
      const { accessToken } = await authCtrl.refreshAccessToken(refreshToken);

      await authCtrl.setAccessToken(accessToken);
      await login(accessToken);

     } catch (error) {
      console.error(error);
     }  
   };


  const login = async (accessToken) => {
       try {
         setLoading(true);
         const response = await userCtrl.getMe(accessToken);
         setUser(response);
         setToken(accessToken);
         setLoading(false);
       } catch (error) {
         console.error(error);
         setLoading(false);
       }
      
   };


    const logout = () => {
     setUser(null);
     setToken(null);
     authCtrl.removeTokens();
   };


     const updateUser = (key , value) => {
       setUser(
        {
          ...user,
          [key] : value,
        }
       )
   };


   
   const data = {
      accessToken : token ,
      user,
      login,
      logout,
      updateUser,
   };

    
    if( loading ) return null;
  return <AuthContext.Provider value = { data }>
        { children }
        </AuthContext.Provider>
  
}

export default AuthContext ; 
