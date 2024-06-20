"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const initialState = {
  name: ``,
  email: ``,
  message: ``,
};

export default function page() {
  const [data, setData] = useState(initialState);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify(data));
    const { name, email, message } = data;
    const res = await fetch(`http://localhost:3000/api/feedback`, {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    console.log(result);
  };
  return (
    <div className="w-full bg-slate-600 h-screen text-white/70">
      <form className="mx-auto w-[60%] pt-10">
        <h2 className="text-2xl ">Contact us</h2>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label className="m-2 mx-3">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="rounded-2xl p-3 px-6"
            />
          </div>
          <div className="flex flex-col">
            <label className="m-2 mx-3">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="rounded-2xl p-3 px-6"
            />
          </div>
          <div className="flex flex-col">
            <label className="m-2 mx-3">Message</label>
            <textarea
              className="rounded-2xl p-3 px-6 h-20"
              placeholder="write your message"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
