import { HeroSectionInterface } from '../../types';
import { OutlinedButton } from '../OutlinedButton';

export const HeroSection = ({
  image,
  eyebrowText,
  subtitleText,
  titleText,
  isReversed,
}: HeroSectionInterface) => {
  return (
    <div
      className={`flex ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col w-full`}>
      <div className="w-full md:w-1/2">
        <img src={image} alt="" />
      </div>
      <div className="w-full flex flex-col justify-center p-16 md:w-1/2">
        <div>
          <span className="text-white-50 text-base mb-0 block uppercase font-bold">
            {eyebrowText}
          </span>
          <span className="text-white mb-0 block text-3xl uppercase font-bold">
            {titleText}
          </span>
          <span className="text-white-50 text-base mb-2 block font-bold">
            {subtitleText}
          </span>
          <OutlinedButton content={'Shop Now!'} height={60} width={200} fontWeight='bold' />
        </div>
      </div>
    </div>
  );
};
