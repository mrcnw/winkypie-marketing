import { redirect } from "next/navigation";

/** The cast lives on /winkypie · Actors. This keeps the short link working. */
export default function ActorsPage() {
  redirect("/winkypie?tab=actors");
}
