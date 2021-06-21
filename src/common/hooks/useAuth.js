import { useState, useCallback, useEffect } from "react";

const userData = "userData";

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((token, userId) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem(
      userData,
      JSON.stringify({
        userId,
        token,
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(userData);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(userData));

    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId };
};

export default useAuth;
