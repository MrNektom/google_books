import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { BookList } from "./components/BookList/BookList";
import { Header } from "./components/Header/Header";
import { LoadingIncdicator } from "./components/LoadingIndicator/LoadingIndicator";
import { useLazyGetBookListBySearchQuery } from "./store/bookApi";
import { Book } from "./store/types";

export default function App() {
  const [search, setSearch] = useState<string>("");
  const { isFetching, list, loadMore, load } = useVolumeList(search);
  // eslint-disable-next-line prefer-const

  const loader = useRef(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const intersectionHandler = useCallback<IntersectionObserverCallback>(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && list.length > 0) {
        loadMore();
      }
    },
    [list]
  );

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
      observer.current = null;
    }
    if (loader.current && !observer.current) {
      observer.current = new IntersectionObserver(intersectionHandler);

      observer.current.observe(loader.current);
    }
  }, [intersectionHandler]);

  function onSearchChanged(search: string) {
    setSearch(search);
  }

  return (
    <div className="App">
      <Header
        search={search}
        onSearchChanged={onSearchChanged}
        onSearch={load}
      />
      {isFetching && <LoadingIncdicator />}
      {list.length > 0 ? <BookList list={list} /> : <></>}
      <div ref={loader}></div>
      {list.length > 0 && <LoadingIncdicator />}
    </div>
  );
}

///
function useVolumeList(search: string) {
  const [startIndex, setStartIndex] = useState(0);
  const [list, setList] = useState<Book[]>([]);
  const [trigger, { data, isFetching }] = useLazyGetBookListBySearchQuery();

  useEffect(() => {
    if (search.length > 0)
      trigger({
        q: search,
        startIndex,
      });
  }, []);

  useEffect(() => {
    if (startIndex === 0) {
      setList(data?.items || []);
    } else {
      const newList = [...list, ...(data?.items || [])];
      const ids: string[] = [];
      setList(
        newList.reduce<Book[]>((acc, book) => {
          if (!ids.includes(book.id)) {
            ids.push(book.id);
            acc.push(book);
          }
          return acc;
        }, [])
      );
    }
  }, [data]);

  function loadMore() {
    console.log("load more");

    if (!isFetching && (data?.totalItems || 0) > list.length) {
      if (search.length > 0) {
        console.log("startload");
        setStartIndex(list.length);
        trigger({
          q: search,
          startIndex: list.length,
        });
      }
    }
  }

  function load() {
    setStartIndex(0);
    setList([]);
    if (search.length > 0) {
      trigger({
        q: search,
        startIndex,
      });
    }
  }
  return { loadMore, isFetching, list, load };
}
