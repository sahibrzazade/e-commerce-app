import { useEffect, useState } from 'react';
import { UpOutlined } from '@ant-design/icons';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 bg-black text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-white hover:text-black transition-all border-2 border-white duration-300`}
      aria-label="Scroll to top"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <UpOutlined style={{ fontSize: 24 }} />
    </button>
  );
};

export default ScrollToTopButton; 