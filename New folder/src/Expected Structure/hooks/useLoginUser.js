import { useMutation } from "@tanstack/react-query";
import { loginUserService } from "../services/authService";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

export const useLoginUser = () => {
  const { login } = useContext(AuthContext);

  return useMutation({
    mutationFn: loginUserService,
    mutationKey: ["login_user"],
    onSuccess: (data) => {
      login(data.user, data.token);
      toast.success(data.message || "Login successful");
    },
    onError: (err) => {
      const message =
        err?.response?.data?.message || err?.message || "Login failed";
      toast.error(message);
    },
  });
};
