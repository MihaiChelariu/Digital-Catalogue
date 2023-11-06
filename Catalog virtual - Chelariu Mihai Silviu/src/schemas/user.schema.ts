import * as mongoose from 'mongoose'; 
import { Grade } from 'src/interfaces/grade.interface';

export const UsersSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone_nr: {type: String, required: false},
    absences: {type: Number, required: false},
    grades: {type: Number, required: false}
});
