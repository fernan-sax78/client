import * as Yup from "yup";

export function initialValue() {
    return {
        email : "",
        password : ""
    }
}

export function validationShema() {
    return Yup.object({
        email : Yup.string().email(true).required(true),
        password : Yup.string().required(true),
    })
}