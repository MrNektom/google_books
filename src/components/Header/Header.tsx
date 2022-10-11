import React, { FormEvent } from "react";
import s from "./Header.module.css";

interface HeaderProps {
  search: string;
  onSearchChanged?: (search: string) => void;
  onSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  search,
  onSearchChanged,
  onSearch,
}: HeaderProps) => {
  return (
    <div className={s.header}>
      <form
        className={s.header__form}
        onSubmit={(e) => {
          e.preventDefault();
          onSearch && onSearch();
        }}
      >
        <div className={s.header__form__wrapper}>
          <input
            className={s.header__form__search}
            value={search}
            placeholder="Enter your query"
            onInput={(e: FormEvent<HTMLInputElement>) =>
              onSearchChanged && onSearchChanged(e.currentTarget.value)
            }
          />
          <input
            className={s.header__form__submit}
            type="submit"
            value="Search"
          />
        </div>
      </form>
    </div>
  );
};
