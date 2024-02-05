"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const imageUrl =
    session?.user?.image ||
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fprofile&psig=AOvVaw0fwQS8YSP-JUiA23Fgpf4g&ust=1707192530915000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNie5PSpk4QDFQAAAAAdAAAAABAE";

  if (status === "loading") {
    return (
      <p className="flex items-center justify-center h-screen">Loading...</p>
    );
  }

  if (!session) {
    return <p>You must be logged in to access this page. Redirecting...</p>;
  }

  if (!session.user) {
    return <p>User data is missing. Please log in again.</p>;
  }

  const toggleShowBtn = () => {
    setShowBtn(!showBtn);
  };
  return (
    <div className="flex justify-end m-5 cursor-pointer">
      <div
        onClick={toggleShowBtn}
        className="overflow-hidden w-[100px h-[100px]] rounded-full"
      >
        <Image
          src={imageUrl}
          width={55}
          height={55}
          alt="profile pic"
          objectFit="cover"
        />
      </div>
      {showBtn && (
        <h1
          onClick={() => signOut()}
          className="absolute top-20 bg-gray-700 px-2 rounded-sm"
        >
          Logout
        </h1>
      )}
    </div>
  );
}
