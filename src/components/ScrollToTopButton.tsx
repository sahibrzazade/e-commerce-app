import { useEffect, useState } from 'react';
import { UpOutlined } from '@ant-design/icons';
import { themedBackground, themedText } from '../styles/themeClassNames';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const hoverStyle = "hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black"

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
      className={`${themedBackground} ${themedText} ${hoverStyle} fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg cursor-pointer transition-all border-2 border-black dark:border-white duration-300`}
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