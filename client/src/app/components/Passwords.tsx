"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Passwords() {
  const [passwords, setPasswords] = useState([]);
  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const res = await fetch(`http://localhost:8080/password/${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await res.json();

        setPasswords((prevPasswords) => result?.passwords || prevPasswords);
      } catch (error) {
        console.error(error);
        alert("Something went wrong");
      }
    };

    if (email) {
      fetchPasswords();
    }
  }, [email]);

  if (!email) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Render your passwords here */}
      {passwords.map((password, index) => (
        <div key={index}>
          <h1>{password}</h1>
        </div>
      ))}
    </div>
  );
}
