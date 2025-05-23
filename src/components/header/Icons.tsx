import {
  ShoppingCartOutlined,
  HeartOutlined,
  GlobalOutlined,
  UserOutlined,
} from '@ant-design/icons';

const Icons: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 text-xl">
      <HeartOutlined className="text-gray-600 cursor-pointer" />
      <ShoppingCartOutlined className="text-gray-600 cursor-pointer" />
      <GlobalOutlined className="text-gray-600 cursor-pointer" />
      <UserOutlined className="text-gray-600 cursor-pointer" />
    </div>
  );
};

export default Icons;
