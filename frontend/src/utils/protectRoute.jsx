// src/utils/protectRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export default function ProtectRoute({ allowedRoles, children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/auth/me`, { withCredentials: true })
      .then(res => {
        const role = res.data.role;
        setIsAuthorized(allowedRoles.includes(role));
      })
      .catch(() => {
        setIsAuthorized(false);
      });
  }, [allowedRoles]);

  if (isAuthorized === null) return null;

  if (!isAuthorized) return <Navigate to="/" replace />;

  return children;
}
