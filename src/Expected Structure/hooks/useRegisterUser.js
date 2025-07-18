// src/hooks/useRegisterUser.js

import { useMutation } from "@tanstack/react-query";
import { registerUserService } from "../services/authService";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

export const useRegisterUser = () => {
  const { login } = useContext(AuthContext); // Optional: Auto-login after register

  return useMutation({
    mutationFn: registerUserService,
    mutationKey: ["register_user"],
    onSuccess: (data) => {
      toast.success(data.message || "Registration successful");

      // Optionally log user in immediately after registration if token is returned
      // Uncomment below only if backend returns token (currently it doesn't)
      if (data.token && data.user) {
        login(data.user, data.token);
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || error?.message || "Registration failed";
      toast.error(message);
    },
  });
};
