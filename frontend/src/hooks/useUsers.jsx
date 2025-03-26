import { useEffect, useState, useCallback } from "react";
import { ADMIN_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const useUsers = (fetchAll = false) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null); 

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let res;
      if (fetchAll) {
    
        res = await axios.get(`${ADMIN_API_END_POINT}/get-all-users`, {
          withCredentials: true,
        });
        
        if (res.data.success) {
          setUsers(res.data.users);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user(s)");
      console.error("Error fetching user(s):", err);
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { loading, error, users, refetch: fetchUsers };
};

export default useUsers;
