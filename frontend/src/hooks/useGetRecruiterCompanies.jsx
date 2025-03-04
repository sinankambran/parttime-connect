import { setCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetRecruiterCompany = () => {

  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.companies || []);

  const [loading, setLoading] = useState(!company.length);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchRecruiterCompany = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/getrecruitercompany`,
          { withCredentials: true, signal: controller.signal }
        );
       
        if (res.data.success) {
          dispatch(setCompany(res.data.company));
        } else {
          throw new Error(
            res.data.message || "Failed to fetch recruiter company"
          );
        }
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("Error fetching recruiter company:", err);

        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiterCompany();
    return () => controller.abort();
  }, [dispatch]);

  return { error, loading, company };
};

export default useGetRecruiterCompany;
