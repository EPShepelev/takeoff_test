import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchUsers } from "../store/reducers/ActionCreators";
import { Add } from "./Add";
import { Card } from "./Card";
import { Search } from "./Search";
import { useNavigate } from "react-router-dom";

type Props = {
  isAuth: boolean;
};

export const Contacts = ({ isAuth }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, isLoading } = useAppSelector((state) => state.userReducer);
  const [isAddDisabledWhileSearch, setIsAddDisabledWhileSearch] =
    useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuth) {
      return navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div>
      <h1 className="title">Contacts</h1>
      {isLoading && <h2>Loading...</h2>}
      <div className="contacts">
        <div className="contacts-control">
          <Add disabled={isAddDisabledWhileSearch} />
        </div>
        <div className="contacts-box">
          <div className="contacts-search">
            <Search
              addDisabled={setIsAddDisabledWhileSearch}
              disabled={isAddDisabledWhileSearch}
            />
          </div>
          <div className="contacts-list">
            {users.length ? (
              users.map((user) => <Card key={user.id} user={user} />)
            ) : (
              <div className="contacts-empty">Contacts nor found!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
