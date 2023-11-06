import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../services/user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('addUser')
  addUser(@Body() user: User) {
    return this.userService.addUser(user);
  }

  @Get('allUsers')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Delete('removeUser')
  deleteUser(@Body() user: User) {
    return this.userService.deleteUser(user.email);
  }

  @Put('editGrade')
  editGrade(@Body() gradeUpdate: { email: string; newGrade: number }) {
    const { email, newGrade } = gradeUpdate;
    return this.userService.editGrade(email, newGrade);
  }

  @Put('editAbsences')
  editAbsences(@Body() absencesUpdate: { email: string; newAbsences: number }) {
    const { email, newAbsences } = absencesUpdate;
    return this.userService.editAbsences(email, newAbsences);
  }
}
