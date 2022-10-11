import React from "react";
import { Book } from "../../store/types";
import BookListItem from "./BookListItem/BookListItem";
import s from "./BookList.module.css";

interface BookListProps {
  list: Book[];
}

export const BookList: React.FC<BookListProps> = ({ list }: BookListProps) => {
  return (
    <ul className={s.book_list}>
      {list.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </ul>
  );
};
