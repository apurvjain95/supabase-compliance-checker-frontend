"use client";

import userAPI from "@/api/UserAPI";
import ProviderProps from "@/models/Generic";
import { UserData } from "@/models/User";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface UserContextProviderProps {
  children: ReactNode;
}

interface UserContextProps {
  currentUser: UserData;
  logout: () => Promise<void>;
  fetchUserData: () => Promise<void>;
}

const UserContext = createContext<ProviderProps<UserContextProps>>({
  currentUser: {} as UserData,
  logout: () => Promise.resolve(),
  fetchUserData: () => Promise.resolve(),
  loading: false,
});

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserData>({} as UserData);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const userData = await userAPI.getUserDetails();
      setCurrentUser(userData.user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.response.status);
      if (err.response.status === 401 || err.response.status === 403) {
        setCurrentUser({} as UserData);
        // redirect to login page
        if (window.location.pathname !== "/login") {
          router.replace("/login?redirectTo=" + window.location.pathname);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const response = await userAPI.logout();
      if (response.success) {
        setCurrentUser({} as UserData);
        router.push("/login");
      }
    } catch {
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        logout,
        fetchUserData,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
