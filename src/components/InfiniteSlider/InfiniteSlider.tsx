import './infinite-slider.css';
export const InfiniteSlider = ({ items }: { items: string[] }) => {
  return (
    <div className="whitespace-nowrap py-12 border-t border-b overflow-hidden">
      <div className="infinite-text inline-block animate-slide">
        {items.map((item, index) => (
          <span key={index} className="text-4xl font-bold px-5">
            {item}
          </span>
        ))}
      </div>
      <div className="infinite-text inline-block animate-slide">
        {items.map((item, index) => (
          <span key={index} className="text-4xl font-bold px-5">
            {item}
          </span>
        ))}
      </div>
      <div className="infinite-text inline-block animate-slide">
        {items.map((item, index) => (
          <span key={index} className="text-4xl font-bold px-5">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
