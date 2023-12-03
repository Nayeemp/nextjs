import ArticleCard from "@/Components/Articles/ArticleCard";

async function getData() {
  const res = await fetch(
    "https://caredrop.api-care-box.click/care-drop/v1/blog/blog-list/?limit=5&offset=0'",
    //{ cache: "no-store" }
    { next: { revalidate: 10 } }
  ); // { next: { revalidate: value in second} }
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  // console.log("data = ", data);
  console.log("Article page api called");

  return data;
}

const Articles = async () => {
  const data = await getData();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[15px] md:gap-y-[20px] gap-x-[30px] main-article-section">
        {data.results.map((cardItem) => (
          <ArticleCard key={cardItem.id} cardDetails={cardItem} />
        ))}
      </div>
    </>
  );
};

export default Articles;
