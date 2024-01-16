import * as Yup from "yup";


export function initialValue() {
    return {
        lastname : "",
    };
};

export function validateSchema(){
    return Yup.object({
        lastname : Yup.string().required(true),
    })
}