import { Controller, Post, Body, Res, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Res() res: Response) {
    const { email, password } = body;
    const user = await this.usersRepo.findOneBy({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = this.auth.signToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({ id: user.id, email: user.email });
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('token', { path: '/' });
    return res.json({ ok: true });
  }

  @Get('me')
  async me(@Req() req: Request) {
    const token = req.cookies?.token;
    if (!token) return null;
    try {
      const data = this.auth.verifyToken(token);
      const user = await this.usersRepo.findOneBy({ id: data.sub });
      return { id: user.id, email: user.email };
    } catch (e) {
      return null;
    }
  }
}
