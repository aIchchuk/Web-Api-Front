import { describe, it, expect, afterEach, vi } from 'vitest';
import { loginUserService, registerUserService } from '../../src/Expected Structure/services/authService.js';
import * as authApi from '../../src/Expected Structure/api/authApi.js';

// Mock the authApi module
vi.mock('../../src/Expected Structure/api/authApi.js');

describe('authService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('loginUserService calls loginApi and returns data', async () => {
    authApi.loginApi = vi.fn().mockResolvedValue({
      data: { message: 'Logged in', token: 'abc', user: { email: 'test@test.com' } }
    });

    const result = await loginUserService({ email: 'test@test.com', password: '123' });

    expect(authApi.loginApi).toHaveBeenCalledWith({ email: 'test@test.com', password: '123' });
    expect(result).toEqual({
      message: 'Logged in',
      token: 'abc',
      user: { email: 'test@test.com' }
    });
  });

  it('registerUserService calls registerApi and returns data', async () => {
    authApi.registerApi = vi.fn().mockResolvedValue({
      data: { message: 'Registered', user: { email: 'new@test.com' } }
    });

    const result = await registerUserService({ fullName: 'New User', email: 'new@test.com', password: '123' });

    expect(authApi.registerApi).toHaveBeenCalledWith({ fullName: 'New User', email: 'new@test.com', password: '123' });
    expect(result).toEqual({
      message: 'Registered',
      user: { email: 'new@test.com' }
    });
  });
});
