"use client";
import React, { useEffect, useState } from "react";
import { copyToClipboard } from "./utils/clipboard";
import {
  IPasswordOptions,
  generateRandomPassword,
} from "./utils/generate-password";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";

const Home = () => {
  const [passwordOptions, setPasswordOptions] = useState<IPasswordOptions>({
    includeLetters: true,
    includeNumbers: true,
    includeSpecialChars: true,
    length: 12,
  });

  const [password, setPassword] = useState<string>(
    generateRandomPassword(passwordOptions)
  );

  const [textToCopy, setTextToCopy] = useState<string>(password);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleMarkCopied = () => {
    copyToClipboard(password);
    setIsCopied(!isCopied);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const handleGeneratePassword = () => {
    const newPassword = generateRandomPassword(passwordOptions);
    setPassword(newPassword);
    setTextToCopy(newPassword);
    setIsCopied(false);
  };

  const handleOptionChange = (option: keyof IPasswordOptions) => {
    setPasswordOptions({
      ...passwordOptions,
      [option]: !passwordOptions[option],
    });
  };

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(status);
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, session, router]);
  return (
    <>
      <Header />
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        <h1 className="text-xl font-bold">
          {" "}
          {`Hello ${session?.user?.name}! 👋`}{" "}
        </h1>
        <h1 className="font-serif text-2xl">Create Strong Passwords</h1>
        <input
          type="text"
          value={password}
          className="rounded-sm w-[500px] h-[50px] text-center text-xl font-semibold text-black"
          readOnly
        />
        <div className="flex gap-2">
          <label>
            <input
              type="checkbox"
              checked={passwordOptions.includeLetters}
              onChange={() => handleOptionChange("includeLetters")}
            />
            Letters
          </label>
          <label>
            <input
              type="checkbox"
              checked={passwordOptions.includeNumbers}
              onChange={() => handleOptionChange("includeNumbers")}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={passwordOptions.includeSpecialChars}
              onChange={() => handleOptionChange("includeSpecialChars")}
            />
            Special Characters
          </label>
        </div>
        <label className="flex items-center gap-2">
          Password Length: {passwordOptions.length}
          <input
            type="range"
            min={6}
            max={20}
            step={1}
            value={passwordOptions.length}
            onChange={(e) =>
              setPasswordOptions({
                ...passwordOptions,
                length: parseInt(e.target.value),
              })
            }
          />
        </label>
        <button
          onClick={() => {
            setTextToCopy(password);
            copyToClipboard(password);
            handleMarkCopied();
          }}
          className={`bg-gray-700 text-white px-4 py-2 rounded ${
            isCopied ? "bg-green-500" : ""
          }`}
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
        <button
          onClick={handleGeneratePassword}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Generate New Password
        </button>
      </div>
    </>
  );
};

export default Home;
