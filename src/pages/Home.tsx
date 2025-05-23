import Carousel from '../components/Carousel';
import { HeroSection } from '../components/HeroSection';
import { InfiniteSlider } from '../components/InfiniteSlider/InfiniteSlider';
import AppLayout from '../layouts/AppLayout';

export const Home = () => {
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
        eyebrowText={'Exclusive'}
        titleText={'Limited Drops Only'}
        subtitleText={'Secure your style before it’s gone'}
        isReversed={false}
      />
      <HeroSection
        image={
          'https://dunker.qodeinteractive.com/wp-content/uploads/2023/01/home-7-img-61.jpg'
        }
        eyebrowText={'Trending'}
        titleText={'This Season’s Must-Haves'}
        subtitleText={'Stay ahead with fashion-forward sportswear'}
        isReversed={true}
      />
      <InfiniteSlider
        items={[
          '10 % OFF YOUR NEXT PURCHASE',
          'BUY NOW - PAY LATER',
          'FREE RETURN',
        ]}
      />
      <HeroSection
        image={
          'https://dunker.qodeinteractive.com/wp-content/uploads/2022/12/h9-img-01.jpg'
        }
        eyebrowText={'Just Dropped'}
        titleText={'Fresh Looks for Every Season'}
        subtitleText={'Redefine your wardrobe with the latest arrivals'}
        isReversed={false}
      />
    </AppLayout>
  );
};
