import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'


export const validateSignup = (username: string, email: string, password: string) => {
    if(!username){
        return {message : "Username is required."};
    }
    if(username.length < 3){
        return {message : "Username must be at least 3 characters long."};
    }
    if(username.length > 20){
        return {message : "Username cannot exceed 20 characters."};
    }
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if(!usernameRegex.test(username)){
        return {message : "Username can only contain letters, numbers, and underscores."};
    }
    if(!email){
        return {message : "Email is required."};
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return {message : "Please enter a valid email address."};
    }
    if(!password){
        return {message : "Password is required."};
    }
    if(password.length < 6){
        return {message : "Password must be at least 6 characters long."};
    }
    return {message : ''};
}

export const validateLogin = (email: string, password : string) => {
    if(!email){
        return {message : "Email is required."};
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return {message : "Please enter a valid email address."};
    }
    if(!password){
        return {message : "Password is required."};
    }
    if(password.length < 6){
        return {message : "Password must be at least 6 characters long."};
    }
    return {message : ''};
}

export const validateEmail = (email : string) => {
    if(!email){
        return {message : "Email is required."};
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return {message : "Please enter a valid email address."};
    }
    return {message : ''};
}