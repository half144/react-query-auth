import { useAuth } from "@/contexts/AuthContext";
import { authServices } from "@/services/authServices";
import { useQuery } from "@tanstack/react-query";

const useMe = () => {
  const { userId } = useAuth();
  const query = useQuery({
    queryKey: ["me", userId],
    queryFn: () => authServices.me(),
    enabled: !!userId,
  });

  console.log("useMe", query);

  return query;
};

export default useMe;
