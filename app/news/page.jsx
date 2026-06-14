import { getAllNews, getUniqueGenre } from "@/lib/actions/news.actions";
import React from "react";
import NewsCategory from "../components/NewsCategory";
import Image from "next/image";
import { Timer } from "lucide-react";

const newsPage = async ({ searchParams }) => {
  const filters = await searchParams;
  const title = filters.title ? filters.title : "";
  const genre = filters.genre ? filters.genre : "";

  const [allGenres, news] = await Promise.all([
    getUniqueGenre(),
    getAllNews({ title: title, genre: genre }),
  ]);

  const spotlight = news.length > 0 ? news[0] : null;
  const cards = news.length > 1 ? news.slice(1) : [];

  return (
    <section className="bg-surface news-section px-5 py-5">
      <div className="news-header flex flex-col mx-3 justify-center">
        <h1 className="heading-h1 px-2 py-4">Industry Insights</h1>
        <p className="text-sm px-2 mb-4 leading-loose">
          The latest advancements, clinical studies, and practice management
          strategies for eye care professionals. Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Asperiores sunt, fugiat optio, dolor
          quos doloremque qui aliquid excepturi, sint nam sit ea incidunt
          accusamus impedit eaque unde consequuntur tempore placeat!
        </p>
        <div className="news-pills py-5">
          <NewsCategory genres={allGenres} activeGenre={genre} />
        </div>
      </div>
      <div className="news-body mx-3 mt-5">
        {spotlight ? (
          <article className="news-spotlight flex max-md:flex-col min-h-[80vh] w-full mb-10 items-start justify-center max-md:bg-surface  rounded-t-2xl">
            <div className="relative md:w-2/3 w-full min-h-[80vh] flex justify-stretch">
              <Image
                src="/images/optovision_hero.png"
                alt=""
                fill
                sizes="100vw"
                loading="lazy"
                className="object-cover rounded-4xl p-3"
              />
            </div>
            <div className="flex flex-col p-3 py-5 space-y-5 bg-surface md:border border-outline/70 shadow-lg rounded-2xl md:w-1/3 h-fit">
              <p className="news-genre-pill pill">{spotlight.genre}</p>
              <h2 className="heading-h3">{spotlight.title}</h2>
              <p className="max-md:line-clamp-2">
                {spotlight.content} Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Necessitatibus, quaerat temporibus! Corporis
                nobis voluptate provident sint consequatur impedit laboriosam
                aut optio dolores voluptatibus nulla possimus veniam doloremque
                officiis, cum nam.
              </p>
              <p className="flex items-center text-sm text-primary gap-1.5 font-semibold">
                {" "}
                <span>
                  <Timer size={20} />
                </span>{" "}
                {spotlight.duration} min read
              </p>
            </div>
          </article>
        ) : (
          <article className="news-spotlight empty-state">
            <p>No spotlight article available.</p>
          </article>
        )}

        <div className="news-cards flex flex-row flex-wrap gap-5 md:flex-col max-md:justify-center ">
          {cards.map((item) => (
            <article
              className="relative news-card w-full md:w-75 min-h-[40vh] bg-surface border border-outline/50 shadow-lg rounded-2xl flex flex-col overflow-hidden"
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
                <p className="news-genre-pill pill">{item.genre}</p>
                <h3 className="heading-h4">{item.title}</h3>
                <p className="text-sm leading-relaxed line-clamp-2 max-md:hidden">
                  {item.content} Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Eum id debitis vel ipsa autem explicabo, ex
                  ea a beatae facilis eaque rem laudantium reiciendis eos
                  recusandae saepe nobis alias necessitatibus!
                </p>
                <p className="flex items-center text-sm text-primary gap-1.5 font-semibold">
                  {" "}
                  <span>
                    <Timer size={20} />
                  </span>{" "}
                  {spotlight.duration} min read
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default newsPage;
