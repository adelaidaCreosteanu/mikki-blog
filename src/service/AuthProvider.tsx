import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type authStatus = "authenticated" | "unauthenticated" | "loading";

type IAuthContext = {
  signIn: (accessToken: string, userId: string) => void;
  signOut: () => void;
  status: authStatus;
};

const initialValue = {
  signIn: (accessToken: string, userId: string) => {},
  signOut: () => {},
  status: "loading" as authStatus,
};

const AuthContext = createContext<IAuthContext>(initialValue);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [status, setStatus] = useState<authStatus>("loading");

  const signIn = async (accessToken: string, userId: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("currentUser", userId);
    setStatus("authenticated");
  };

  const signOut = async () => {
    localStorage.clear();
    setStatus("unauthenticated");
  };

  useEffect(() => {
    const tok = localStorage.getItem("accessToken");
    if (tok !== null) {
      setStatus("authenticated");
    } else {
      setStatus("unauthenticated");
    }
  }, [setStatus]);

  return (
    <AuthContext.Provider value={{ signIn, signOut, status }}>
      {children}
    </AuthContext.Provider>
  );
};
