"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes, NotesResponse } from "@/lib/api";
import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

type NotesClientProps = {
  tagQuery: string;
  initialData: NotesResponse;
  initialQuery: {
    debounceQuery: string;
    currentPage: number;
  };
};

export default function NotesClient({
  tagQuery,
  initialData,
  initialQuery,
}: NotesClientProps) {
  const [searchQuery, setQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [modalOnClose, setModalOnClose] = useState(false);

  const onPageChange = ({ selected }: { selected: number }) =>
    setCurrentPage(selected + 1);

  const [debounceQuery] = useDebounce(searchQuery, 500);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", debounceQuery, currentPage, tagQuery],
    queryFn: () =>
      fetchNotes({
        debounceQuery,
        currentPage,
        tagQuery,
      }),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
    initialData:
      debounceQuery === initialQuery.debounceQuery &&
      currentPage === initialQuery.currentPage
        ? initialData
        : undefined,
  });

  const totalPages = data?.totalPages ?? 0;

  const createNoteBtn = () => {
    setModalOnClose(true);
  };

  const closeModal = () => {
    setModalOnClose(false);
  };

  const heandleSerach = (debounceQuery: string) => {
    setQuery(debounceQuery);
    setCurrentPage(1);
  };
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={heandleSerach} />

        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        )}

        <button onClick={createNoteBtn} className={css.button}>
          Create note +
        </button>
      </div>

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {modalOnClose && <Modal onClose={closeModal} />}
    </div>
  );
}
