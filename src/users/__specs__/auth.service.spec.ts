import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { User } from '../user.entity';
import { UsersService } from '../users.service';
import { v4 as uuid } from 'uuid';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      create: (email: string, password: string): Promise<User> => {
        let id = Math.floor(Math.random() * 9999999999);
        let user = { id, email, password } as User;
        users.push(user);
        return Promise.resolve(user);
      },
      find: (email: string): Promise<User[]> => {
        const filteredUsers = users.filter(user => user.email === email);
        return Promise.resolve(filteredUsers);
      },
    }

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
      {
        provide: UsersService,
        useValue: fakeUsersService,
      }
    ]
    }).compile();

    service = module.get(AuthService);
  });
  it ('can create an instance of auth service', async () => {

    expect(service).toBeTruthy();
  });

  it('creates a new user with a salted and hashed password', async () => {
    let expectedEmail = 'test@example.com';

    const user = await service.signup('test@example.com', 'password');
    const [salt, hash] = user.password.split('.');

    expect(user.email).toEqual(expectedEmail);
    expect(user.password).not.toBe('password');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an erro when user signs with used email', async () => {
    let expectedErrorMessage = 'Email already exists';

    await service.signup('test@example.com', 'password');
    try {
      await service.signup('test@example.com', 'password');
    } catch (error) {
      expect(error.message).toEqual(expectedErrorMessage);
    }
  });

  it('should throw if sign in is called with an un used email', async () => {
    let expectedErrorMessage = 'User Not Found';
    await service.signup('test@example.com', 'password');

    try {
      await service.signin('test@example.com', 'password');
    } catch (error) {
      expect(error.message).toEqual(expectedErrorMessage);
    }
  });

  it('should throw with invalid password', async () => {
    let expectedErrorMessage = 'Bad Password';
    await service.signup('test@example.com', 'password');

    try {
      await service.signin('test@example.com', 'passwsord');
    } catch (error) {
      expect(error.message).toEqual(expectedErrorMessage);
    }
  });

  it('should throw with invalid password', async () => {
    await service.signup('test@example.com', 'password');

    const user = await service.signin('test@example.com', 'password');

    expect(user).toBeDefined();
  });
});


