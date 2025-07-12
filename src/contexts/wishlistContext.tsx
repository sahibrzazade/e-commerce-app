import { createContext, useContext, useState, useEffect } from 'react';
import { useAuthUser } from '../hooks/useAuthUser';
import { wishlistService } from '../services/wishlistService';
import { WishlistContextType, WithChildren } from '../types';

const WishlistContext = createContext<WishlistContextType>({ count: 0, refresh: async () => { } });

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }: WithChildren) => {
  const user = useAuthUser();
  
  const [count, setCount] = useState(0);

  const refresh = async () => {
    if (user) {
      const wishlists = await wishlistService.getWishlist(user.uid);
      setCount(wishlists.length);
    } else {
      setCount(0);
    }
  };

  useEffect(() => {
    refresh();
  }, [user]);

  return (
    <WishlistContext.Provider value={{ count, refresh }}>
      {children}
    </WishlistContext.Provider>
  );
}; 