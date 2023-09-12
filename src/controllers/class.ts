import express from 'express';
import { successResponse } from '../utils/response';
export const getClassList = async (req: any, res: express.Response) => {
    try {
        // console.log(req?.identity)
        // const { class_id } = req.params;
        let classList = [
            {
                id: '1',
                name: 'class 1'
            },
            {
                id: '2',
                name: 'class 2'
            },
            {
                id: '3',
                name: 'class 3'
            }
        ]

        const resp = successResponse('Successfully retreive class list', classList)
        return res.status(200).json(resp);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};


export const getClass = async (req: any, res: express.Response) => {
    try {
        // console.log(req?.identity)
        // const { username, password } = req.body;
        const { class_id } = req.params;
        let classList = {
            id: class_id,
            name: 'class 1'
        }

        const resp = successResponse('Successfully retreive a class', classList)
        return res.status(200).json(resp);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};