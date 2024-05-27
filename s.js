import bcrypt from "bcryptjs";

const getNewPassword=async ()=> {
    const hashedPassword =  await bcrypt.compare('123456', '$2a$10$TF0qPzmqMwj1ZES8zXRzF.f.ZWzdcPlah4R40BeV9wVhHJ/BSeMjO')
    console.log(hashedPassword)
return 's'
}
getNewPassword()
