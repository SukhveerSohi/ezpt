import { responsiveFontSizes } from '@material-ui/core';
import axios from 'axios';
import {config} from './constants.js';

var baseURL= config.url.API_URL;
export async function addAccount(accountType,Data){
    try{
        await axios.post(baseURL+'/accounts/add/'+accountType,Data)
        return 'success';

    }catch(err){
        console.log(err.message);
        return err.message
        
    }
}

export async function getUserProfile(accountType, Data){
    try{
        let userProfile=await axios.get(baseURL+'/user/profile/'+accountType,Data)
        return userProfile;
    }catch(err){
        console.log(err.message);
        return err.message
    }
}