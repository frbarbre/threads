import CommunityCard from "@/components/cards/CommunityCard";
import Pagination from "@/components/shared/Pagination";
import SearchBar from "@/components/shared/SearchBar";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchCommunities({
    searchString: searchParams.q || "",
    pageNumber: searchParams.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      <div className="mt-14 flex flex-col gap-9">
        <SearchBar placeholder={"Search communities"} route={"communities"} />
        {result.communities.length === 0 ? (
          <p className="text-left text-gray-1 pl-2">
            {searchParams.q === ""
              ? "No communites"
              : `No communites with the name of: ${searchParams.q}`}
          </p>
        ) : (
          <>
            {result.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                members={community.members}
                bio={community.bio}
              />
            ))}
          </>
        )}
      </div>
      <Pagination
        path="communities"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section>
  );
}
