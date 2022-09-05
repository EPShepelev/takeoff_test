import { Link } from "react-router-dom";

type Props = {
  isAuth: boolean;
};

export const Navbar = ({ isAuth }: Props) => {
  return (
    <nav className="navbar">
      {!isAuth && <Link to="/login">Login</Link>}
      <Link to="/">Home</Link>
      <Link to="/contacts">Contacts</Link>
    </nav>
  );
};
