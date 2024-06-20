"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

// const initialState = {
//   name: ``,
//   email: ``,
//   message: ``,
// };

export default function page() {
  //   const [data, setData] = useState(initialState);
  const [name, setName] = useState(``);
  const [email, setEmail] = useState(``);
  const [message, setMessage] = useState(``);

  const router = useRouter();

  const data = { name, email, message };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify(data));
    // const { name, email, message } = data;
    const res = await fetch(`http://localhost:3000/api/feedback`, {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    console.log(`THE CLIENT`, result);
    router.push(`/thankyou`);
  };
  return (
    <div className="w-full bg-slate-600 h-screen text-white/70">
      <form onSubmit={handleSubmit} className="mx-auto w-[60%] pt-10">
        <h2 className="text-2xl ">Contact us</h2>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label className="m-2 mx-3">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="rounded-2xl p-3 px-6"
              name="name"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </div>
          <div className="flex flex-col">
            <label className="m-2 mx-3">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="rounded-2xl p-3 px-6 "
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div className="flex flex-col">
            <label className="m-2 mx-3">Message</label>
            <textarea
              className="rounded-2xl p-3 px-6 h-[100px] text-black"
              placeholder="write your message"
              name="message"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setMessage(e.target.value)
              }
            />
          </div>
        </div>
        <input
          type="submit"
          className="rounded-2xl p-3 px-6 bg-blue-600 my-6 w-full cursor-pointer"
        />
      </form>
    </div>
  );
}
