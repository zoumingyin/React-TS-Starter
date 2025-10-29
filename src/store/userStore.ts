import { makeAutoObservable } from "mobx";
import { userApi } from "@/api/userApi";
import type { AxiosError } from "axios";

// 用户信息接口
export interface UserInfo {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  role?: string;
  [key: string]: any;
}

export class UserStore {
  userInfo: UserInfo | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 获取用户信息
   * @param forceRefresh - 是否强制刷新
   */
  getUser = async (forceRefresh = false) => {
    // 如果有缓存且不强制刷新，直接返回
    if (this.userInfo && !forceRefresh) {
      return this.userInfo;
    }

    this.loading = true;
    this.error = null;

    try {
      const data = await userApi.getUserInfo();
      this.userInfo = data;
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      this.error = axiosError.message || "获取用户信息失败";
      throw error;
    } finally {
      this.loading = false;
    }
  };

  /**
   * 更新用户信息
   * @param data - 用户信息
   */
  updateUserInfo = async (data: Partial<UserInfo>) => {
    this.loading = true;
    this.error = null;

    try {
      const updatedData = await userApi.updateUserInfo(data);
      this.userInfo = updatedData;
      return updatedData;
    } catch (error) {
      const axiosError = error as AxiosError;
      this.error = axiosError.message || "更新用户信息失败";
      throw error;
    } finally {
      this.loading = false;
    }
  };

  /**
   * 更新用户头像
   * @param file - 头像文件
   */
  updateAvatar = async (file: File) => {
    this.loading = true;
    this.error = null;

    try {
      const { url } = await userApi.updateAvatar(file);
      if (this.userInfo) {
        this.userInfo.avatar = url;
      }
      return url;
    } catch (error) {
      const axiosError = error as AxiosError;
      this.error = axiosError.message || "更新头像失败";
      throw error;
    } finally {
      this.loading = false;
    }
  };

  /**
   * 清空用户信息
   */
  clearUser = () => {
    this.userInfo = null;
    this.error = null;
  };

  /**
   * 更新用户信息
   * @param userInfo - 用户信息
   */
  updateUser = (userInfo: Partial<UserInfo>) => {
    if (this.userInfo) {
      this.userInfo = { ...this.userInfo, ...userInfo };
    }
  };

  /**
   * 清除错误信息
   */
  clearError = () => {
    this.error = null;
  };
}

export const userStore = new UserStore();

