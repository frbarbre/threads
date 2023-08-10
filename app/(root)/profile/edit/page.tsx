import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page() {

  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);
  if (userInfo.id !== user.id) redirect("/")
  if (!userInfo?.onboarded) redirect("/onboarding");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start">
      <h1 className="head-text">Edit Profile</h1>
      <p className="mt-3 text-base-regular text-gray-1">
        To make any changes
      </p>
      <section className="mt-9 rounded-md">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}
