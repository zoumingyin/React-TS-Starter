import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { userStore } from '@/store';
import { Card, Spin, Alert, Button, Descriptions } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

/**
 * 用户资料页面
 */
const UserProfile = observer(() => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await userStore.getUser();
        setInitialized(true);
      } catch (error) {
        setInitialized(true);
      }
    };

    fetchUser();
  }, []);

  const handleRefresh = async () => {
    try {
      await userStore.getUser(true);
    } catch (error) {
      console.error('刷新失败', error);
    }
  };

  // 加载中状态
  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  // 错误状态
  if (userStore.error) {
    return (
      <Alert
        message="获取用户信息失败"
        description={userStore.error}
        type="error"
        showIcon
        action={
          <Button size="small" onClick={handleRefresh}>
            重试
          </Button>
        }
      />
    );
  }

  // 未登录状态
  if (!userStore.userInfo) {
    return <Alert message="未登录" description="请先登录" type="info" />;
  }

  const { userInfo } = userStore;

  return (
    <div className="p-6">
      <Card
        title="用户信息"
        extra={
          <Button
            icon={<ReloadOutlined />}
            loading={userStore.loading}
            onClick={handleRefresh}
          >
            刷新
          </Button>
        }
      >
        <Descriptions column={1}>
          <Descriptions.Item label="用户名">
            {userInfo.username}
          </Descriptions.Item>
          {userInfo.email && (
            <Descriptions.Item label="邮箱">{userInfo.email}</Descriptions.Item>
          )}
          {userInfo.role && (
            <Descriptions.Item label="角色">{userInfo.role}</Descriptions.Item>
          )}
        </Descriptions>
      </Card>
    </div>
  );
});

export default UserProfile;

