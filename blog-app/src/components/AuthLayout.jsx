import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authenticate = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // Wait until authStatus is known (avoid redirecting on initial undefined)
    if (authStatus === null || authStatus === undefined) return;

    const isAuthenticated = authStatus === true;

    // If user must be authenticated but is not → go to login
    if (authenticate && !isAuthenticated) {
      navigate("/login");
    }

    // If user must NOT be authenticated but is → redirect home
    if (!authenticate && isAuthenticated) {
      navigate("/");
    }

    setLoader(false);
  }, [authStatus, authenticate, navigate]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
