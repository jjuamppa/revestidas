import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = req.cookies?.token;
    if (!token) throw new UnauthorizedException();
    try {
      const data = this.authService.verifyToken(token);
      req.user = data;
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
