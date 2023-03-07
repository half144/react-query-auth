import { createContext, useContext, useEffect, useState } from "react";
import { authServices } from "../services/authServices";
import * as jose from "jose";
import { api } from "@/services/api";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

type AuthContextType = {
  userId: string | null;
  login: (user: any) => Promise<void>;
  logout: () => void;
  authenticated: boolean;
  loading: boolean;
};
const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

interface JwtPayload extends jose.JWTVerifyResult {
  userId: string;
}

const verifyToken = async (token: string): Promise<JwtPayload> => {
  const secret = new TextEncoder().encode("mySecretKey");
  const payload = (await jose.jwtVerify(token, secret)) as JwtPayload;
  return payload;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const Router = useRouter();

  const authenticated = !!userId;

  useEffect(() => {
    const token = localStorage.getItem("token");

    const verify = async () => {
      try {
        if (!token) return;
        const result = await verifyToken(token);
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setUserId(result.payload.userId as string);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  const login = async (user: any) => {
    try {
      const res = await authServices.login(user);
      console.log(res);
      localStorage.setItem("token", res.token);
      api.defaults.headers.Authorization = `Bearer ${res.token}`;
      setUserId(res._id);
      Router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    queryClient.removeQueries({
      queryKey: ["me", userId],
      exact: true,
    });
    localStorage.removeItem("token");
    delete api.defaults.headers.Authorization;
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{ userId, login, logout, authenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
