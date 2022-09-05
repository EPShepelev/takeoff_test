import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { authUser } from "../store/reducers/ActionCreators";
import { Button } from "./Button";

type Props = {
  setIsAuth: (isAuth: boolean) => void;
};

export const Login = ({ setIsAuth }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (loginInput && passwordInput) {
      console.log("you are successful log in");
      setIsAuth(true);
      navigate("/");
      dispatch(authUser(loginInput, passwordInput));
      setLoginInput("");
      setPasswordInput("");
    }
  };

  useEffect(() => {
    if (loginInput && passwordInput) {
      setIsSubmitDisabled(false);
    }
  }, [loginInput, passwordInput]);

  return (
    <div>
      <h2 className="subtitle">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="text"
          placeholder="login"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
        ></input>
        <input
          className="login-input"
          type="password"
          placeholder="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        ></input>
        <Button clb={handleSubmit} text="Login" disabled={isSubmitDisabled} />
      </form>
    </div>
  );
};
