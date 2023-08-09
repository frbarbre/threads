"use client";

import { deleteThread } from "@/lib/actions/thread.actions";
import { usePathname, useRouter } from "next/navigation";

export default async function DeleteThread({ id }: { id: string }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      onClick={async () => {
        deleteThread(id, pathname);
        if (pathname !== "/") {
          router.push("/");
        }
      }}
    >
      DeleteThread
    </div>
  );
}
