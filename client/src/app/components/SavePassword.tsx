"use client";

import { useSession } from "next-auth/react";

interface Props {
  password: string;
}
export default function SavePassword({ password }: Props) {
  const { data: session, status } = useSession();

  const handleSavePassword = async () => {
    try {
      const response = await fetch("http://localhost:8080/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Password Saved");
      }
    } catch (error) {
      alert("Password already exist");
    }
  };

  return (
    <button
      className="p-2 px-5 hover:bg-gray-800 bg-gray-700 rounded-md"
      onClick={handleSavePassword}
    >
      Save
    </button>
  );
}
