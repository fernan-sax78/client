import * as Yup from "yup";


export function initialValue() {
    return {
        firstname : "",
    };
};

export function validateSchema(){
    return Yup.object({
        firstname : Yup.string().required(true),
    })
}