export interface IAuthService {
  register(): Promise<void>;
  login(): Promise<any>;
  getMe(): Promise<any>;
}
