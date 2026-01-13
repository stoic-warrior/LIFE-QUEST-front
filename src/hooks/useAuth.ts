import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { LoginRequest, SignupRequest } from '../types';

export function useLogin() {
  const setTokens = useAuthStore((s) => s.setTokens);

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (res) => {
      if (res.data.success && res.data.data) {
        setTokens(res.data.data.accessToken, res.data.data.refreshToken);
      }
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: (data: SignupRequest) => authApi.signup(data),
  });
}
