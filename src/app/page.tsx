"use client";
import { useState } from "react";

const Home = () => {
  const [password, setPassword] = useState<string>("qertcghvjb");
  const [textToCopy, setTextToCopy] = useState<string>(password);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleMarkCopied = () => {
    setIsCopied(!isCopied);
  };
  return (
    <div className="">
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        <h1 className="font-serif text-2xl">Create Strong Passwords</h1>
        <input
          type="text"
          value={password}
          className="rounded-sm w-[500px] h-[50px] text-center text-xl font-semibold text-black"
          readOnly
        />
        <button
          onClick={() => {
            setTextToCopy(password);
            copyToClipboard();
          }}
        >
          {isCopied ? "Copied!" : "Copy to Clipboard"}
        </button>
      </div>
    </div>
  );
};

export default Home;
