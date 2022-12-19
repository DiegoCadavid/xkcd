import { GetStaticProps } from "next";
import fs from "fs/promises";

import { Comic } from "../interface/interfaces";
import ComicItem from "../components/ComicItem";
import HeadComponent from "../components/HeadComponent";
import Header from "../components/Header";

interface props {
  comics: Comic[];
}

export default function Home({ comics }: props) {
  return (
    <div>
      <HeadComponent title="Home" description="Root page" />

      <Header />
      <main>
        <>
          <h2 className="text-center font-primary font-medium mb-3">
            Latest Comics
          </h2>
          {/* Comic container */}
          <div className="flex justify-center flex-wrap gap-4">
            {comics.length > 0 &&
              comics.map((comic, i) => {
                return <ComicItem key={comic.id} priority={ i < 4 } {...comic}  />;
              })}
          </div>
        </>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const files: string[] = await fs.readdir("./comics");
  const latestComics: string[] = files.slice(-8, files.length);

  const promisesComics = latestComics.map((comicName) => {
    return fs.readFile(`./comics/${comicName}`, "utf-8");
  });
  const resultsPromiseComics = await Promise.all(promisesComics);
  const comicsContent: Comic[] = resultsPromiseComics.map((result) =>
    JSON.parse(result)
  );

  return {
    props: {
      comics: comicsContent,
    },
  };
};
