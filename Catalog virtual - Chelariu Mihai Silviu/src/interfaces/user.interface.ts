import {Document, Schema} from 'mongoose';
import { Grade } from './grade.interface';

export interface User extends Document {
    email: string;
    username: string;
    password: string;
    phone_nr: string;
    absences: number;
    grades: number;
}
