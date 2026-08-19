import AdminApp from "@/components/admin/AdminApp";
import { isAuthed, isDefaultPassword } from "@/lib/auth";
import { DEFAULT_CONTENT, getContent } from "@/lib/content";

export default async function AdminPage() {
  const authed = await isAuthed();
  return (
    <AdminApp
      authed={authed}
      initial={getContent()}
      defaults={DEFAULT_CONTENT}
      isDefaultPassword={isDefaultPassword()}
    />
  );
}
