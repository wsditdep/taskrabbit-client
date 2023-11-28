import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { loadUser } from "./states/actions/userAction";
import WelcomePage from "./mobile/userAuth/WelcomePage";
import UserLogin from "./mobile/userAuth/UserLogin";
import UserSignup from "./mobile/userAuth/UserSignup";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  
  return (
    <>
      <Routes>

        <Route path="/" element={<WelcomePage />} exact />
        <Route path="/signin" element={<UserLogin />} exact />
        <Route path="/signup" element={<UserSignup />} exact />

      </Routes>
    </>
  )
}

export default App;