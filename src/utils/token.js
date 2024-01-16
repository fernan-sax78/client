import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

export function hasExpiredToken(token) {
    const { exp } = jwtDecode(token);
    const currentDate = new Date().getDate();

    if (exp <= currentDate) {
        return true;
    }

    return false;
}