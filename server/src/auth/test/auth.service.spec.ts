import { Test } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { prismaMock, mailerMock, redisMock, jwtMock, configMock } from "../mock/authService.mock"
// auth.service.spec.ts


describe('AuthService', () => {
  let service: AuthService;

  const prismaMock = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    account: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  };

  const redisMock = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  const mailerMock = {
    sendMail: jest.fn(),
  };

  const jwtMock = {
    signAsync: jest.fn(),
  };

  const configMock = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: MailerService, useValue: mailerMock },
        { provide: 'REDIS_CLIENT', useValue: redisMock },
        { provide: JwtService, useValue: jwtMock },
        { provide: ConfigService, useValue: configMock },
      ],
    }).compile();

    service = moduleRef.get(AuthService);

    jest.clearAllMocks();
  });


  it('should hash password', async () => {
    const hash = await service.genHashpassword('123456');
    expect(typeof hash).toBe('string');
  });

  it('should create user and send verification code', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    prismaMock.user.create.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      user_name: 'test',
    });

    mailerMock.sendMail.mockResolvedValue(true);
    redisMock.set.mockResolvedValue(true);

    const result = await service.signUp({
      email: 'test@test.com',
      user_name: 'test',
      password: '123456',
    });

    expect(prismaMock.user.create).toHaveBeenCalled();
    expect(mailerMock.sendMail).toHaveBeenCalled();
    expect(result.email).toBe('test@test.com');
  });

  it('should login user and return payload', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      user_name: 'test',
      password: 'hashed',
      is_verify: true,
      accounts: [{ provider: 'Local' }],
    });

    jest.spyOn(service, 'verifyPassword').mockResolvedValue(true);

    const result = await service.logIn({
      email: 'test@test.com',
      password: '123456',
    });

    expect(result).toHaveProperty('id');
    expect(result.email).toBe('test@test.com');
  });

  it('should throw on invalid password', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      password: 'hashed',
      is_verify: true,
      accounts: [{ provider: 'Local' }],
    });

    jest.spyOn(service, 'verifyPassword').mockResolvedValue(false);

    await expect(
      service.logIn({
        email: 'test@test.com',
        password: 'wrong',
      }),
    ).rejects.toThrow('Invalid credentials');
  });

  it('should verify email code', async () => {
    redisMock.get.mockResolvedValue('123456');
    redisMock.del.mockResolvedValue(true);

    prismaMock.user.update.mockResolvedValue({});
    prismaMock.user.findUnique.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      user_name: 'test',
    });

    const result = await service.VerificationEmail({
      email: 'test@test.com',
      code: '123456',
    });

    expect(redisMock.del).toHaveBeenCalled();
    expect(result?.email).toBe('test@test.com');
  });

  it('should reject invalid verification code', async () => {
    redisMock.get.mockResolvedValue(null);

    await expect(
      service.VerificationEmail({
        email: 'test@test.com',
        code: '000000',
      }),
    ).rejects.toThrow('code is invalid or is expire.');
  });

  it('should return user if google account exists', async () => {
    prismaMock.account.findFirst.mockResolvedValue({
      user: {
        id: '1',
        email: 'test@test.com',
        user_name: 'test',
      },
    });

    const result = await service.loginByGoogle({
      email: 'test@test.com',
      googleId: 'google-123',
    });

    expect(result.id).toBe('1');
  });
})