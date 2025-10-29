import { get, post, put, del } from '@/services/http';
import type { UserInfo } from '@/store/userStore';

/**
 * 用户 API 服务
 */
export const userApi = {
  /**
   * 获取用户信息
   * @returns 用户信息
   */
  getUserInfo: async (): Promise<UserInfo> => {
    return get<UserInfo>('/user/info');
  },

  /**
   * 更新用户信息
   * @param data - 用户信息
   * @returns 更新后的用户信息
   */
  updateUserInfo: async (data: Partial<UserInfo>): Promise<UserInfo> => {
    return put<UserInfo>('/user/info', data);
  },

  /**
   * 更新用户头像
   * @param file - 头像文件
   * @returns 头像 URL
   */
  updateAvatar: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('avatar', file);
    return post<{ url: string }>('/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * 修改密码
   * @param data - 密码数据
   */
  changePassword: async (data: { oldPassword: string; newPassword: string }) => {
    return post('/user/change-password', data);
  },

  /**
   * 获取用户列表（管理员）
   * @param params - 查询参数
   * @returns 用户列表
   */
  getUserList: async (params?: { page?: number; pageSize?: number; keyword?: string }) => {
    return get<{ list: UserInfo[]; total: number }>('/user/list', { params });
  },

  /**
   * 删除用户（管理员）
   * @param id - 用户 ID
   */
  deleteUser: async (id: string) => {
    return del(`/user/${id}`);
  },

  /**
   * 获取用户详情
   * @param id - 用户 ID
   * @returns 用户详情
   */
  getUserDetail: async (id: string): Promise<UserInfo> => {
    return get<UserInfo>(`/user/${id}`);
  },
};

