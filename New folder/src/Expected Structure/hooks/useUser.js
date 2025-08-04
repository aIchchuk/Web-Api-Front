import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import {
  getAllUsers,
  getUserById,
  updateUserById as apiUpdateUserById,
  deleteUserById as apiDeleteUserById,
} from "../services/userService"; // Make sure this file exists and is correct

import { axiosInstance } from "../api/api";

export const useUser = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      toast.error("Failed to fetch users");
      setError(err.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserById = useCallback(async (userId) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getUserById(userId);
      setCurrentUser(data);
    } catch (err) {
      toast.error("Failed to fetch user");
      setError(err.message || "Unknown error");
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const findUserById = (userId) =>
    users.find((userItem) => userItem._id === userId) || null;

  const createUser = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      await axiosInstance.post("/user/createUser", formData);
      toast.success("User created successfully");
      await fetchAllUsers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create user");
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserById = async (userId, updateData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedUser = await apiUpdateUserById(userId, updateData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? updatedUser : user))
      );
      toast.success("User updated successfully");
      return updatedUser;
    } catch (err) {
      toast.error("Failed to update user");
      setError(err.message || "Unknown error");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    setIsLoading(true);
    setError(null);
    try {
      await apiDeleteUserById(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error("Failed to delete user");
      setError(err.message || "Unknown error");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    users,
    currentUser,
    isLoading,
    error,
    fetchAllUsers,
    fetchUserById,
    findUserById,
    createUser,
    updateUserById,
    deleteUser,
  };
};
