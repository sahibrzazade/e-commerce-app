import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import { useAuthUser } from "../hooks/useAuthUser";

interface ThemeContextType {
  theme: "dark" | "light";
  toggleTheme: () => void;
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const user = useAuthUser();
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchTheme = async () => {
      setLoading(true);
      try {
        const userDoc = await getDoc(doc(db, "users", user?.uid));
        const userData = userDoc.data();
        if (userData && userData.theme) {
          setTheme(userData.theme);
        } else {
          setTheme("light");
        }
      } catch (e) {
        setTheme("light");
      } finally {
        setLoading(false);
      }
    };
    fetchTheme();
  }, [user]);

  const toggleTheme = async () => {
    if (!user) return;
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setLoading(true);
    try {
      await setDoc(doc(db, "users", user?.uid), { theme: newTheme }, { merge: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}; 