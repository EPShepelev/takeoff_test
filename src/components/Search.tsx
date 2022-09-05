import { useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import {
  fetchUsers,
  searchTextInContacts,
} from "../store/reducers/ActionCreators";
import { Button } from "./Button";

type Props = {
  disabled: boolean;
  addDisabled: (disabled: boolean) => void;
};

export const Search = ({ disabled, addDisabled }: Props) => {
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [searchDisabled, setSearchDisabled] = useState(true);
  const [searchBtnUnTouched, setSearchBtnUnTouched] = useState(true);

  const searchHandle = (e: React.MouseEvent<HTMLElement>) => {
    if (searchValue.trim()) {
      e.preventDefault();
      setSearchBtnUnTouched(false);
      dispatch(searchTextInContacts(searchValue));
    }
  };

  const backHandle = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSearchValue("");
    setSearchDisabled(true);
    setSearchBtnUnTouched(true);
    addDisabled(false);
    dispatch(fetchUsers());
  };

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value) {
      setSearchDisabled(false);
    } else {
      setSearchDisabled(true);
    }
  };

  const focusHandle = () => {
    addDisabled(true);
  };

  const blurHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      addDisabled(false);
    }
  };

  return (
    <div>
      <h2 className="subtitle">Find contact</h2>
      <div className="search-box">
        <input
          className="search-input"
          type="text"
          placeholder="search"
          value={searchValue}
          onFocus={focusHandle}
          onBlur={blurHandle}
          onChange={(e) => inputHandle(e)}
        ></input>
        <Button clb={searchHandle} text="Find" disabled={searchDisabled} />
        <Button clb={backHandle} text="Back" disabled={searchBtnUnTouched} />
      </div>
    </div>
  );
};
