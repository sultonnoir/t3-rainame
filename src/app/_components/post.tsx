"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

export function LatestPost() {
  const [data] = api.post.getPosts.useSuspenseQuery();

  const utils = api.useUtils();
  const [message, setMessage] = useState<string | undefined>();
  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async (restult) => {
      await utils.post.invalidate();
      setName("");
      setMessage(restult.message);
    },
  });

  return (
    <div className="w-full max-w-xs">
      <p>{data.duration.toFixed(0)}ms</p>
      <ul>
        {data.posts.map((post) => (
          <li key={post.id} className="border-b border-white/10 py-2">
            {post.name}
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ name });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
}
