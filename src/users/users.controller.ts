import { Controller, Post, Body, Get, Param, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { LoginDto } from './dto/LoginDto.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    console.log(`Received a GET request to fetch user with ID: ${id}`);
    return this.usersService.getUser(id);
  }

  @Post()
  async crearUsuario(@Body() newUser: CreateUserDto) {
    try {
      const user = await this.usersService.createUser(newUser);
      return { message: 'Usuario creado con éxito', user };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    console.log(`Received a POST request to log in user: ${loginData.username}`);
    return this.usersService.login(loginData);
  }

}
