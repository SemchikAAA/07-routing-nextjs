import { fetchNotes } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

export default async function Notes() {
  const queryClient = new QueryClient();

  const searchQuery = "";
  const currentPage = 1;
  const sortQuery = "Personal";

  await queryClient.prefetchQuery({
    queryKey: ["tasks", searchQuery, currentPage, sortQuery],
    queryFn: () =>
      fetchNotes({
        searchQuery,
        currentPage,
        sortQuery,
      }),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient />
      </HydrationBoundary>
    </div>
  );
}
