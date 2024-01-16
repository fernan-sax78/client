import { ENV } from '../utils';

export class Chat {
    async create( token , participantOne  , participantTwo ){
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT}`;
            const params = {
                method : "POST",
                headers : {
                   "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                },
                body : JSON.stringify({
                    participant_id_one : participantOne,
                    participant_id_two : participantTwo,
                }),
            };

             const response = await fetch(url , params);
             const result = await response.json();

             if(response.status !== 200 && response.status !== 201){
                throw result;
             }

             return result;
        } catch (error) {
            throw error;
        }
    }

    async getAll(token){
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT}`;
            const params = {
                headers : {
                    Authorization : `Bearer ${token}`,
                }
            };
            const response = await fetch(url , params);
            const result =  await response.json();
            
            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

        async remove(token , chatId){
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT}/${chatId}`;
            const params = {
                method : "DELETE",
                headers : {
                    Authorization : `Bearer ${token}`,
                }
            };
            const response = await fetch(url , params);
            const result =  await response.json();
            
            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

        async obtain(token , chatId){
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT}/${chatId}`;
            const params = {
                headers : {
                    Authorization : `Bearer ${token}`,
                }
            };
            const response = await fetch(url , params);
            const result =  await response.json();
            
            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

}