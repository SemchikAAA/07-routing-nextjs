import { fetchNoteById } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const res = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["taskById", res.id],
    queryFn: () => fetchNoteById(res.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
