
import { Request, Response } from "express"

import { userService } from "./service";


 const CreateUser = async (req: Request, res: Response) => {
    try {
        const { name, email, age, phone, address } = req.body;
        const user = await userService.createUser(name, email, age, phone, address);
     
        res.status(201).json({ success: true, data: user.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error })

    }
}


const GetUsers = async (req:Request, res:Response)=>{
    try {
        const result = await userService.getUsers();
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'})
    }
}



 const GetUsersById = async (req:Request, res:Response)=>{
    try {
        const {id} = req.params;
        const result = await userService.GetUsersById(id);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'})
    }
}


 const UpdateUseById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const result = await userService.updateUserById(id, name, email);
        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

 const DeletedUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await userService.deleteUserById(id);
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}


export const userController = {
    CreateUser,
    GetUsers,
    GetUsersById,
    UpdateUseById,
    DeletedUserById
}
