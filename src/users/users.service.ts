import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/LoginDto.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async createUser(user: CreateUserDto) {
    const userfound = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });
    if (userfound) {
      throw new HttpException('No se pudo crear el usuario', HttpStatus.CONFLICT);
    }
  
    const newUser = this.userRepository.create(user);
    const createdUser = await this.userRepository.save(newUser);

    const token = this.generateJwtToken(createdUser);
    
    return { user: createdUser, token };
  }
  

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {
        username,
        password, 
      },
    });

    return user || null;
  }

  getUser(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  private generateJwtToken(user: User): string {
    
    const payload = { username: user.username, sub: user.id };
    const secretKey = 'tu_secreto_secreto';
    const expiresIn = '1h'; 

    return jwt.sign(payload, secretKey, { expiresIn });
  }

  async login(loginData: LoginDto) {
    const { username, password } = loginData;
  
    const user = await this.validateUser(username, password);
  
    if (user) {
      const token = this.generateJwtToken(user); 
      return { message: 'Inicio de sesión exitoso', token };
    } else {
      throw new HttpException('', HttpStatus.UNAUTHORIZED);
    }
  }
  
}

