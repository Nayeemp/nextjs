"use client";
import ArticleCard from "@/Components/Articles/ArticleCard";
import ArticleCardLoader from "@/Components/Articles/ArticleCardLoader";
import { useEffect, useState } from "react";

const Articles = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function getData() {
    setIsLoading(true);
    const res = await fetch(
      "https://caredrop.api-care-box.click/care-drop/v1/blog/blog-list/?limit=5&offset=0'"
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const result = await res.json();
    // console.log("result = ", result.results);
    setData(result);
    setIsLoading(false);

    // return data;
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {!isLoading &&
        data?.results &&
        (data?.results?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[15px] md:gap-y-[20px] gap-x-[30px] main-article-section">
            {data.results.map((cardItem) => (
              <ArticleCard key={cardItem.id} cardDetails={cardItem} />
            ))}
          </div>
        ) : (
          <div>No Article Found</div>
        ))}

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[15px] md:gap-y-[20px] gap-x-[30px] main-article-section">
          <ArticleCardLoader />
          <ArticleCardLoader />
          <ArticleCardLoader />
          <ArticleCardLoader />
          <ArticleCardLoader />
        </div>
      )}
    </>
  );
};

export default Articles;
