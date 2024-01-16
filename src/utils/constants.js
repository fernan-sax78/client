import { SERVER_IP_URL } from '@env'
 
 const SERVER_IP = SERVER_IP_URL; 


 export const ENV = {
    SERVER_IP : SERVER_IP,
    BASE_PATH : `https://${SERVER_IP}`,
    API_URL : `https://${SERVER_IP}/api`,
    SOCKET_URL : `https://${SERVER_IP}`,
    ENDPOINTS : {
        AUTH : {
            REGISTER : "auth/register",
            LOGIN : "auth/login",
            REFRESH_ACCESS_TOKEN : "auth/refresh_access_token",
        },
        ME : "user/me",
        USER : "user",
        USER_EXCEPT_PARTICIPANTS_GROUP : "users_except_participants_group",
        CHAT : "chat",
        CHAT_MESSAGE : "chat/message",
        CHAT_LAST_MESSAGE : "chat/message/last",
        CHAT_TOTAL_MESSAGE : "chat/message/total",
        CHAT_MESSAGE_IMAGE : "chat/message/image",
        GROUP : "group",
        GROUP_EXIT : "group/exit",
        GROUP_BAN : "group/ban",
        GROUP_ADD_PARTICIPANTS : "group/add_participants",
        GROUP_MESSAGE : "group/message",
        GROUP_MESSAGE_IMAGE : "group/message/image",
        GROUP_MESSAGE_TOTAL : "group/message/total",
        GROUP_LAST_MESSAGE : "group/message/last",
    },
    JWT : {
        ACCESS : "access",
        REFRESH : "refresh",
    },
    ACTIVE_CHAT_ID : "active_chat_id",
    ACTIVE_GROUP_ID : "active_group_id",
 }