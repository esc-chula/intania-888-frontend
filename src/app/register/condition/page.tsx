import { redirect } from "next/navigation";

// Keep the existing registration link pointing to the current public terms.
export default function ConditionPage() {
  redirect("/terms");
}
