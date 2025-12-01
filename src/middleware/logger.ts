import { NextFunction, Request, Response } from "express";

export const Logger = ((req:Request, res:Response, next:NextFunction)=>{
    console.log(`[${new Date().toString()}]  Method :${req.method} Path: ${req.path}\n`)
    next()
})