import express from 'express';
import { successResponse } from '../utils/response';

export const getStudentList = async (req: any, res: express.Response) => {
    try {
        // console.log(req?.identity)
        // const { class_id } = req.params;

        let studentList = [
            {
                id: '1',
                student_id: '2022134',
                name: 'student 1'
            },
            {
                id: '2',
                student_id: '2022154',
                name: 'student 2'
            },
            {
                id: '3',
                student_id: '2022352',
                name: 'student 3'
            }
        ]

        const resp = successResponse('Successfully retreive student list', studentList)
        return res.status(200).json(resp);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};


export const getStudent = async (req: any, res: express.Response) => {
    try {
        // console.log(req?.identity)
        // const { username, password } = req.body;
        const { student_id } = req.params;
        let classList = {
            id: student_id,
            name: 'student example'
        }

        const resp = successResponse('Successfully retreive a student', classList)
        return res.status(200).json(resp);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};