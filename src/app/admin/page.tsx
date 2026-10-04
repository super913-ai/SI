import type { Metadata } from "next";
import { isAuthed } from "@/lib/auth";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default function AdminPage() {
  return isAuthed() ? <AdminDashboard /> : <AdminLogin />;
}
