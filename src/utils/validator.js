import { isValidUsername } from "6pp"

export const usernameVlidator = (username) => {
    if(!isValidUsername(username))
    return{isValid:false, message:"This is an invalid username"}
}