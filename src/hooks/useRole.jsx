import { useEffect, useState } from "react";

import axios from "axios";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setRole(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    axios.get(`http://localhost:5000/users/role/${user.email}`)
      .then(res => {
        setRole(res.data.role);
      })
      .catch(err => {
        console.error("Failed to fetch role", err);
        setRole(null);
      })
      .finally(() => setLoading(false));
  }, [user]);

  return [role, loading];
};

export default useRole;
