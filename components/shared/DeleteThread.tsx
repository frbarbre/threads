"use client";

import { deleteThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  threadId: string;
  parentId: string | null;
  isComment?: boolean;
}

export default async function DeleteThread({
  threadId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/") return null;
  return (
    <Image
      src="/delete.svg"
      alt="delte"
      width={18}
      height={18}
      className="cursor-pointer object-contain"
      onClick={async () => {
        await deleteThread(JSON.parse(threadId), pathname);
        if (!parentId || !isComment && pathname.includes("/profile")) {
          router.push(pathname);
        } else {
          router.push("/")
        }
      }}
    />
  );
}
