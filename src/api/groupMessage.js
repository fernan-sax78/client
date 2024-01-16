import { ENV } from '../utils';

export class GroupMessage {
      
    async getTotal(accesToken , groupId){
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GROUP_MESSAGE_TOTAL}/${groupId}`;
            const params = {
                headers : { 
                    Authorization : `Bearer ${accesToken}`,
                },
            }

            const response = await fetch(url , params);
            const result = await response.json();

            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw(error);
        }
    }
    async getLastMessage(accesToken , groupId){
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GROUP_LAST_MESSAGE}/${groupId}`;
            const params = {
                headers : { 
                    Authorization : `Bearer ${accesToken}`,
                },
            }

            const response = await fetch(url , params);
            const result = await response.json();

            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw(error);
        }
    }

    async getAll(accesToken , groupId){
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GROUP_MESSAGE}/${groupId}`;
            const params = {
                headers : { 
                    Authorization : `Bearer ${accesToken}`,
                },
            }

            const response = await fetch(url , params);
            const result = await response.json();

            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw(error);
        }
    }   

    async sendTextGroup(accesToken , groupId,  message){
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GROUP_MESSAGE}`;
            const params = {
                method : "POST",
                headers : { 
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${accesToken}`,
                },
                body : JSON.stringify({
                    group_id : groupId ,
                    message ,
                }),
            }

            const response = await fetch(url , params);
            const result = await response.json();

            if(response.status !== 201) throw result;
            return result;
        } catch (error) {
            throw(error);
        }
    }

    async sendImageGroup(accessToken , groupId , file){
        try {
            const formData = new FormData();
            formData.append("group_id" , groupId);
            formData.append("image" , file);
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GROUP_MESSAGE_IMAGE}`;
            const params = {
                method : "POST",
                headers : { 
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${accessToken}`,
                },
                body : formData,
            }

            const response = await fetch(url , params);
            const result = await response.json();

            if(response.status !== 201) throw result;
            return result;

        } catch (error) {
            throw error
        }
    }



}