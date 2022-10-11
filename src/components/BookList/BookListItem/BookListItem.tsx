import React from "react";
import { Book } from "../../../store/types";
import s from "./BookListItem.module.css";
import { DescriptionAccorion } from "./DescriptionAccordion/DescriptionAccordion";

interface BookListItemProps {
  book: Book;
}

const BookListItem: React.FC<BookListItemProps> = ({
  book,
}: BookListItemProps) => {
  return (
    <li className={s.book_list__item}>
      {book.volumeInfo.imageLinks ? (
        <div>
          <img
            className={s.book_list__item__thumbnail}
            src={book.volumeInfo?.imageLinks.thumbnail}
            alt=""
            loading="lazy"
          />
        </div>
      ) : (
        <div className={s.book_list__item__thumbnail_placeholber}>
          <span>No thumbnail</span>
        </div>
      )}
      <div>
        <h3 className={s.book_list__item__title}>
          <a
            href={book.volumeInfo.previewLink}
            target="_blank"
            rel="noreferrer"
          >
            {book.volumeInfo.title}
            {book.volumeInfo.subtitle && `: ${book.volumeInfo.subtitle}`}
          </a>
        </h3>
        <span className={s.book_list__item__authors}>
          {[
            book.volumeInfo.authors?.join(", "),
            book.volumeInfo.publishedDate,
          ].join(" ・ ")}
        </span>
        <span className={s.book_list__item__description}>
          <DescriptionAccorion description={book.volumeInfo.description} />
        </span>
      </div>
    </li>
  );
};

export default BookListItem;
