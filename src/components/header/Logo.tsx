import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <Link to="/" >
        <span
          className="text-4xl" style={{ fontFamily: 'Gochi Hand, cursive' }}>
          Cartly
        </span>
      </Link >
    </div>
  )
};

export default Logo;
