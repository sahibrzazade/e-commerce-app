import { Layout } from 'antd';
import { WithChildren } from '../types';
import { Header } from './Header';
import { Footer } from './Footer';

const { Content } = Layout;

const AppLayout: React.FC<WithChildren> = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Layout>
        <Layout>
          <Content className="h-full px-4 bg-black shadow">{children}</Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
