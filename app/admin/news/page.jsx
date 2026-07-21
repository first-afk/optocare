"use client";
import React, { useEffect, useState } from "react";
import NewsForm from "../components/NewsForm";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

const NEWS_PER_PAGE = 3;

const miniCards = [
  { title: "published", number: "--", color: "#EDF5FF", text: "#0c3491" },
  { title: "drafts", number: "--", color: "#ffedd5", text: "#473c2d" },
  { title: "views", number: "--", color: "#EDEDED", text: "#111111" },
];
const NewsAdminPage = () => {
  const [news, setNews] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNews = async (p = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/news?page=${p}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to load");
      setNews(data.news || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
      toast.error("An error occured", {
        error: err,
      });
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNews(pageNum);
  }, [pageNum]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this article?")) return;
    const res = await fetch("/api/admin/news", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) return console.error("Delete failed");
    setNews((n) => n.filter((a) => a.id !== id));
    setTotal((t) => Math.max(t - 1, 0));
  };

  const handleEdit = (id) => {
    router.push(`/news/${id}`);
  };

  const pageCount = Math.max(Math.ceil(total / NEWS_PER_PAGE), 1);
  const displayedFrom = total === 0 ? 0 : (pageNum - 1) * NEWS_PER_PAGE + 1;
  const displayedTo = Math.min(pageNum * NEWS_PER_PAGE, total);

  return (
    <main className="py-10">
      <div className="content-header mx-5">
        <h1 className="heading-h3 capitalize">news feed management</h1>
        <p className="text-sm mt-3 font-medium dark:text-slate-300">
          Curate and publish latest updates for optovision patients and staff
        </p>
      </div>
      <div className="flex max-md:flex-col flex-row-reverse items-start justify-between gap-6 w-full py-10 px-5">
        <div className="md:w-1/2 w-full flex-1">
          <div className="flex items-center justify-between gap-3 ">
            {miniCards.map(({ title, number, color, text }) => (
              <div
                key={title}
                style={{ backgroundColor: color, color: text }}
                className="dashboard_card flex-1 w-full"
              >
                <h1 className="font-semibold capitalize text-sm">{title}</h1>
                <p className="font-bold text-lg">{number}</p>
              </div>
            ))}
          </div>

          <div className="published_articles mt-6 dashboard_card">
            <div className="space-y-6">
              {loading ? (
                <div className="text-sm text-slate-500">Loading...</div>
              ) : news.length === 0 ? (
                <div className="text-sm text-slate-500">
                  No published articles.
                </div>
              ) : (
                news.map((article) => (
                  <div
                    key={article.id}
                    className="flex items-start gap-2 p-0 rounded-md dashboard_card max-h-50 w-full relative  overflow-hidden"
                  >
                    <div className="w-[25%] h-[25vh] rounded-md relative">
                      <Image
                        src={
                          article.image_url ||
                          article.image ||
                          "/images/news-default.png"
                        }
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                        alt={article.title}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 p-3">
                      <div className="flex items-start justify-between space-y-3 gap-2">
                        <div className="title text-sm font-semibold">
                          {article.title}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label="Edit article"
                            onClick={() => handleEdit(article.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-500/20"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            type="button"
                            aria-label="Delete article"
                            onClick={() => handleDelete(article.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-500/20 text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mt-1 leading-tight line-clamp-2">
                        {article.content?.slice(0, 140) || "—"}
                      </p>
                      <div className="text-xs text-slate-500 mt-3">
                        {new Date(article.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-slate-500">
              <div>
                Showing {displayedFrom} - {displayedTo} of {total} articles
              </div>
              <div className="flex items-center gap-2">
                {Array.from({ length: pageCount }, (_, i) => {
                  const p = i + 1;
                  return (
                    <button
                      key={p}
                      onClick={() => setPageNum(p)}
                      className={`min-w-9 px-3 py-1 rounded-full text-sm ${p === pageNum ? "bg-primary text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <article className="md:w-1/2 w-full">
          <NewsForm />
        </article>
      </div>
    </main>
  );
};

export default NewsAdminPage;
