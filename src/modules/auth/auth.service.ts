import { pool } from "../../config/db"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from "../../config";

const LoginUser = async (email: string, password: string)=> {
    console.log(email,password)
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
    if(result.rows.length === 0){
        return null
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if(!match){
        return null
    }

    const token = jwt.sign({name:user.name, email: user.email}, config.jwt_secret,{
        expiresIn:"1d",

    });

    console.log("token", token, user)

    return {user, token}

}

export const authServices = {
    LoginUser
}