import Carousel from '../components/landing/Carousel';
import { HeroSection } from '../components/landing/HeroSection';
import { InfiniteSlider } from '../components/InfiniteSlider/InfiniteSlider';
import AppLayout from '../layouts/AppLayout';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { t } = useTranslation();

  const images: string[] = [
    'https://images.pexels.com/photos/994234/pexels-photo-994234.jpeg',
    'https://images.unsplash.com/photo-1519748771451-a94c596fad67?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];
  return (
    <AppLayout>
      <Carousel images={images} />
      <HeroSection
        image={
          'https://images.pexels.com/photos/1557843/pexels-photo-1557843.jpeg'
        }
        eyebrowText={t("home.exclusive")}
        titleText={t("home.limited-drops-only")}
        subtitleText={t("home.secure-your-style")}
        isReversed={false}
      />
      <HeroSection
        image={
          'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg'
        }
        eyebrowText={t("home.trending")}
        titleText={t("home.this-seasons-must-haves")}
        subtitleText={t("home.fashion-forward-sportswear")}
        isReversed={true}
      />
      <InfiniteSlider
        items={[
          t("home.ten-percent-off"),
          t("home.buy-now-pay-later"),
          t("home.free-return"),
        ]}
      />
      <HeroSection
        image={
          'https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg'
        }
        eyebrowText={t("home.just-dropped")}
        titleText={t("home.fresh-looks-every-season")}
        subtitleText={t("home.redefine-your-wardrobe")}
        isReversed={false}
      />
    </AppLayout>
  );
};
