"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session, status } = useSession();

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

  return (
    <div className="flex justify-end m-5">
      <div className="overflow-hidden w-[100px h-[100px]] rounded-full">
        <Image
          src={session.user.image}
          width={55}
          height={55}
          alt="profile pic"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
