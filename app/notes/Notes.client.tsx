"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Tag } from "@/types/note";
import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import SortFilter from "@/components/SortFilter/SortFilter";
import Pagination from "@/components/Pagination/Pagination";
import NoteModal from "@/components/NoteModal/NoteModal";
import NoteList from "@/components/NoteList/NoteList";

export default function NotesClient() {
  const [searchQuery, setQuery] = useState("");

  const [sortQuery, setSortQuery] = useState<Tag>("Personal");

  const [currentPage, setCurrentPage] = useState(1);

  const [modalOnClose, setModalOnClose] = useState(false);

  const onPageChange = ({ selected }: { selected: number }) =>
    setCurrentPage(selected + 1);

  const [debounceQuery] = useDebounce(searchQuery, 500);

  const { data, isSuccess } = useQuery({
    queryKey: ["tasks", debounceQuery, currentPage, sortQuery],
    queryFn: () => fetchNotes({ searchQuery, currentPage, sortQuery }),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const createNoteBtn = () => {
    setModalOnClose(true);
  };

  const closeModal = () => {
    setModalOnClose(false);
  };
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={setQuery} />

        <SortFilter changeTag={setSortQuery} />

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

      {modalOnClose && (
        <NoteModal onClose={closeModal} onSuccess={closeModal} />
      )}
    </div>
  );
}
