import { getAllNews, getUniqueGenre } from "@/lib/actions/news.actions";
import React from "react";
import NewsCategory from "./components/NewsCategory";
import Image from "next/image";
import { Timer } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const newsPage = async ({ searchParams }) => {
  const filters = await searchParams;
  const title = filters.title ? filters.title : "";
  const genre = filters.genre ? filters.genre : "";

  const [allGenres, news] = await Promise.all([
    getUniqueGenre(),
    getAllNews({ title: title, genre: genre }),
  ]);

  if (news.message && news.status === "error") {
    toast.error(news.message);
  }
  if (allGenres.message && allGenres.status === "error") {
    toast.error(allGenres.message);
  }

  const spotlight = news.length > 0 ? news[0] : null;
  const cards = news.length > 1 ? news.slice(1) : [];

  return (
    <section className="bg-surface news-section px-5 py-5">
      <div className="news-header flex flex-col mx-3 justify-center">
        <h1 className="heading-h1 px-2 py-4">Industry Insights</h1>
        <p className="text-sm px-2 mb-4 leading-loose">
          The latest advancements, clinical studies, and practice management
          strategies for eye care professionals.
        </p>
        <div className="news-pills py-5">
          <NewsCategory genres={allGenres} activeGenre={genre} />
        </div>
      </div>
      <div className="news-body mx-3 mt-5">
        {spotlight ? (
          <article className="news-spotlight">
            <div className="relative md:w-2/3 w-full h-125 flex justify-stretch">
              <Image
                src="/images/optovision_hero.png"
                alt=""
                fill
                sizes="100vw"
                loading="lazy"
                className="object-cover rounded-4xl p-3"
              />
            </div>
            <div className="spotlight-content">
              <p className="pill active w-fit capitalize">{spotlight.genre}</p>
              <h2 className="heading-h3">{spotlight.title}</h2>
              <p className="max-md:line-clamp-2 text-sm">{spotlight.content}</p>
              <div className="article-footer">
                <p className="flex items-center gap-1.5">
                  {" "}
                  <span>
                    <Timer size={20} />
                  </span>{" "}
                  {spotlight.duration} min read
                </p>
                <Link href={`/news/${spotlight.id}`}>View details</Link>
              </div>
            </div>
          </article>
        ) : (
          <article className="news-spotlight empty-state">
            <p>No spotlight article available.</p>
          </article>
        )}

        <div className="news-cards grid md:grid-cols-3 grid-cols-1 items-center gap-5 max-md:flex-col justify-center py-15">
          {cards.map((item) => (
            <article
              className="relative news-card w-full min-h-[40vh] bg-surface border border-outline/50 shadow-lg rounded-2xl flex flex-col overflow-hidden mb-auto"
              key={item.id ?? item.title}
            >
              <div className="relative w-full h-45">
                <Image
                  alt=""
                  src="/images/about_image.png"
                  fill
                  sizes="100vw"
                  loading="lazy"
                  className="object-cover rounded-t-2xl"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col gap-3">
                <p className="pill active w-fit capitalize">{item.genre}</p>
                <h3 className="heading-h4 line-clamp-1">{item.title}</h3>
                <p className="text-sm leading-relaxed line-clamp-2 max-md:hidden">
                  {item.content} Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Eum id debitis vel ipsa autem explicabo, ex
                  ea a beatae facilis eaque rem laudantium reiciendis eos
                  recusandae saepe nobis alias necessitatibus!
                </p>
                <div className="article-footer">
                  <p className="flex items-center gap-1.5 ">
                    {" "}
                    <span>
                      <Timer size={20} />
                    </span>{" "}
                    {item.duration} min read
                  </p>
                  <Link href={`/news/${item.id}`}>View details</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default newsPage;
