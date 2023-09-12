// import express from 'express';

export const successResponse = (message:string, data:any) => {
    return {
        message:message,
        data: data
    }
}