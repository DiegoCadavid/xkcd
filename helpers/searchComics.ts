import fs from "fs/promises";
import { Comic } from "../interface/interfaces";

const searchComics = async(query: { q: string }):Promise<Comic[]> => {
  const search = query?.q || "";
  const searchRegex = new RegExp(`${search}`, "gi");

  const files = (await fs.readdir("./comics")).map((file) => {
    return file.slice(0, 4);
  });

  const promisesComic = files.map((id) => {
    return fs.readFile(`./comics/${id}.json`, "utf-8");
  });

  const comics: Comic[] = (await Promise.all(promisesComic))
    .map((comic) => {
      return JSON.parse(comic);
    })
    .filter((comic: Comic) => {
      return (comic.safe_title.match(new RegExp(searchRegex, "gi")) || comic.alt.match(new RegExp(searchRegex, "gi")) );
    })
    .reverse();

  return comics;
};

export default searchComics;