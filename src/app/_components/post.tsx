"use client";

import { api } from "@/trpc/react";

export function LatestPost() {
  const { data, isLoading } = api.post.getPosts.useQuery();

  if (isLoading)
    return (
      <div className="w-full max-w-xs animate-pulse space-y-2">
        <div className="h-8 w-1/4 rounded bg-white/10" />
        <div className="h-8 w-5/6 rounded bg-white/10" />
        <div className="h-8 w-1/2 rounded bg-white/10" />
      </div>
    );
  if (!data) return <div>No posts found.</div>;

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
    </div>
  );
}
