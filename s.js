import bcrypt from "bcryptjs";

const getNewPassword =   () => {
    return  bcrypt.hash('123456', 10)

}

console.log(getNewPassword())
