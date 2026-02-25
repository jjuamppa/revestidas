import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersRepo.findOneBy({ email });
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return null;
    return user;
  }

  signToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    const secret = process.env.JWT_SECRET || 'changeme_dev_secret';
    const token = jwt.sign(payload, secret, { expiresIn: '7d' });
    return token;
  }

  verifyToken(token: string) {
    try {
      const secret = process.env.JWT_SECRET || 'changeme_dev_secret';
      return jwt.verify(token, secret) as any;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
