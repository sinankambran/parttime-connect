import { setCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetRecruiterCompanies = () => {
  console.log("useGetRec");
  const dispatch = useDispatch();
  // const companies = useSelector(state => state.company.companies);
  // const [loading, setLoading] = useState(!companies.length);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchRecruiterCompany = async () => {
      // setLoading(true);

      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/getrecruitercompany`,
          { withCredentials: true, signal: controller.signal }
        );
        console.log({ data: res.data });
        if (res.data.success) {
          dispatch(setCompany(res.data.company));
        } else {
          throw new Error(
            res.data.message || "Failed to fetch recruiter companies"
          );
        }
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("Error fetching recruiter companies:", err);

        setError(err.message || "Something went wrong");
      } finally {
        // setLoading(false);
      }
    };

    fetchRecruiterCompany();
    return () => controller.abort();
  }, [dispatch]);

  return { error };
};

export default useGetRecruiterCompanies;
