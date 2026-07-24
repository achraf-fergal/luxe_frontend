import { createContext, useContext, useEffect, useReducer } from "react";
import { useGetMe, getGetMeQueryKey } from "@/lib/api-client";
import { useQueryClient } from "@tanstack/react-query";
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true
};
function authReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false, isLoading: false };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
const AuthContext = createContext(void 0);
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const queryClient = useQueryClient();
  const { data: user, isLoading, isError } = useGetMe({
    query: {
      retry: false,
      staleTime: 1e3 * 60 * 5
      // 5 minutes
    }
  });
  useEffect(() => {
    if (isLoading) {
      dispatch({ type: "SET_LOADING", payload: true });
    } else if (user && !isError) {
      dispatch({ type: "SET_USER", payload: user });
    } else {
      dispatch({ type: "LOGOUT" });
    }
  }, [user, isLoading, isError]);
  const login = (userData) => {
    dispatch({ type: "SET_USER", payload: userData });
    queryClient.setQueryData(getGetMeQueryKey(), userData);
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    queryClient.setQueryData(getGetMeQueryKey(), null);
    queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
  };
  return <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export {
  AuthProvider,
  useAuth
};
