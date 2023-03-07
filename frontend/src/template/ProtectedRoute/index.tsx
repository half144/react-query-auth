import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authenticated, loading, userId } = useAuth();
  const Router = useRouter();
  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    if (!isBrowser) return;
    if (!userId && !loading) {
      Router.push("/login");
    }
  }, [userId, loading]);

  return (
    <>
      {loading && null}
      {userId && children}
    </>
  );
};

export default ProtectedRoute;
