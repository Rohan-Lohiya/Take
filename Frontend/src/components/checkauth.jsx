import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useCheckAuth = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  //dotenv.config();

  useEffect(() => {
    const getuser = async () => {
      try {
        const response = await axios.get(`http://${url}/:3000/auth/login/success`, { withCredentials: true });
        console.log("response", response);
      } catch (error) {
        navigate("/login");
        console.log(url);
      } finally {
        setLoading(false);
        
      }
    };

    getuser();
  }, [navigate]);

  return loading;
};

export default useCheckAuth;
