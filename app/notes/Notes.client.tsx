"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { NotesResponse, Tag } from "@/types/note";
import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import SortFilter from "@/components/SortFilter/SortFilter";
import Pagination from "@/components/Pagination/Pagination";
import NoteModal from "@/components/NoteModal/NoteModal";
import NoteList from "@/components/NoteList/NoteList";

type NotesClientProps = {
  initialData: NotesResponse;
  initialQuery: {
    debounceQuery: string;
    currentPage: number;
    filterByTag: Tag;
  };
};

export default function NotesClient({
  initialData,
  initialQuery,
}: NotesClientProps) {
  const [searchQuery, setQuery] = useState("");

  const [filterByTag, setSortQuery] = useState<Tag>("Personal");

  const [currentPage, setCurrentPage] = useState(1);

  const [modalOnClose, setModalOnClose] = useState(false);

  const onPageChange = ({ selected }: { selected: number }) =>
    setCurrentPage(selected + 1);

  const [debounceQuery] = useDebounce(searchQuery, 500);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", debounceQuery, currentPage, filterByTag],
    queryFn: () =>
      fetchNotes({
        debounceQuery,
        currentPage,
        filterByTag,
      }),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
    initialData:
      debounceQuery === initialQuery.debounceQuery &&
      currentPage === initialQuery.currentPage &&
      filterByTag === initialQuery.filterByTag
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
