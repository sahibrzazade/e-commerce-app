import Carousel from '../components/landing/Carousel';
import { HeroSection } from '../components/landing/HeroSection';
import { InfiniteSlider } from '../components/InfiniteSlider/InfiniteSlider';
import AppLayout from '../layouts/AppLayout';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { t } = useTranslation();

  const images: string[] = [
    'https://wallpaperswide.com/download/nike_basketball_sneakers-wallpaper-1600x900.jpg',
    'https://media.architecturaldigest.com/photos/56f1b12edc71add34a9643d5/16:9/w_2560%2Cc_limit/nike-debuts-first-ever-self-lacing-shoe-01.jpg',
    'https://wallpapercave.com/wp/wp12457413.jpg',
  ];
  return (
    <AppLayout>
      <Carousel images={images} />
      <HeroSection
        image={
          'https://dunker.qodeinteractive.com/wp-content/uploads/2022/12/h9-img-02.jpg'
        }
        eyebrowText={t("home.exclusive")}
        titleText={t("home.limited-drops-only")}
        subtitleText={t("home.secure-your-style")}
        isReversed={false}
      />
      <HeroSection
        image={
          'https://dunker.qodeinteractive.com/wp-content/uploads/2023/01/home-7-img-61.jpg'
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
          'https://dunker.qodeinteractive.com/wp-content/uploads/2022/12/h9-img-01.jpg'
        }
        eyebrowText={t("home.just-dropped")}
        titleText={t("home.fresh-looks-every-season")}
        subtitleText={t("home.redefine-your-wardrobe")}
        isReversed={false}
      />
    </AppLayout>
  );
};
