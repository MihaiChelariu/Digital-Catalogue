import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async addUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async deleteUser(email: string): Promise<User> {
    const deletedUser = await this.userModel.findOneAndRemove({ email }).exec();
    return deletedUser;
  }

  async editGrade(email: string, newGrade: number): Promise<User> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { email },
      { grades: newGrade },
      { new: true },
    ).exec();
    return updatedUser;
  }

  async editAbsences(email: string, newAbsences: number): Promise<User> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { email },
      { absences: newAbsences },
      { new: true },
    ).exec();
    return updatedUser;
  }
}
