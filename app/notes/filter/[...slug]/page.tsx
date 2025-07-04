import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type NotesProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function Notes({ params }: NotesProps) {
  const { slug } = await params;

  const tagQuery = slug[0] === "all" ? "" : slug[0];

  const notesData = await fetchNotes("", 1, tagQuery);

  return (
    <div>
      <NotesClient tagQuery={tagQuery} initialData={notesData} />
    </div>
  );
}
