import { getNews } from "@/lib/actions/news.actions";
import { currentUser } from "@clerk/nextjs/server";
import { Breadcrumbs } from "@heroui/react";
import { Timer } from "lucide-react";
import Image from "next/image";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const { title, genre, content, duration, posted_by, created_at } =
    await getNews(id);
  const user = await currentUser();
  return (
    <main className="mx-3 p-3 relative">
      <div className="breadcrumb py-5">
        <Breadcrumbs className="inline-flex items-center gap-2 text-sm font-semibold w-full">
          <Breadcrumbs.Item
            href="/news"
            className="flex items-center hover:underline hover:underline-offset-8 hover:decoration-secondary gap-2 w-fit"
          >
            News
          </Breadcrumbs.Item>
          <Breadcrumbs.Item className="line-clamp-1 w-fit">
            {title}
          </Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
      <header className="relative mb-8 rounded-lg overflow-hidden shadow-md min-h-[80vh] w-full">
        <div className="h-full w-full ">
          <Image
            src="/images/news-default.png"
            alt={title}
            fill
            sizes="100vw"
            className="object-cover sm:h-80"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black to-transparent flex items-end p-6">
          <div className="text-white">
            <div className="pill bg-white/10 text-white inline-block mb-2">
              {genre}
            </div>
            <h1 className="text-3xl sm:text-2xl font-bold leading-tight">
              {title}
            </h1>
            <div className="mt-2 text-sm opacity-90  inline-flex flex-wrap">
              <span>
                {created_at ? new Date(created_at).toLocaleDateString() : ""}
              </span>
              {duration ? (
                <>
                  <span className="mx-2">•</span>
                  <span className="flex items-center gap-1.5">
                    <Timer size={20} />
                    {duration} min read
                  </span>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <article className="prose max-w-none bg-surface rounded-2xl min-h-80 p-4 border border-outline/70 shadow-lg">
        {content ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <p>No content available for this article.</p>
        )}
      </article>
    </main>
  );
};

export default page;
