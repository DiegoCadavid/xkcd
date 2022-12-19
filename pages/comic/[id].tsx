import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import Link from "next/link";
import fs from "fs/promises";
import { existsSync } from "fs";

import Header from "../../components/Header";
import { Comic } from "../../interface/interfaces";
import HeadComponent from "../../components/HeadComponent";

interface Props extends Comic {
  hasPrev: boolean;
  hasNext: boolean;
}

const ComicId = ({
  img,
  alt,
  day,
  month,
  year,
  safe_title,
  id,
  hasNext,
  hasPrev,
}: Props) => {
  return (
    <div>
      <HeadComponent
        title={`Comic - ${safe_title}`}
        description={`${safe_title} : ${alt}`}
      />
      <Header />

      <div className="flex flex-col gap-5 justify-center items-center ">
        <div className="font-primary text-center">
          <p className="font-bold text-xl"> {safe_title} </p>
          <p className="italic"> {`${day}/${month}/${year}`} </p>
          <p className="w-[500px]">{alt}</p>
        </div>
        <Image priority={true} width={500} height={500} alt={alt} src={img} />
        <div className="flex gap-2">
          {hasPrev && (
            <Link
              href={`/comic/${id - 1}`}
              className="p-2 border-slate-800 border-comic border-comic-small hover:scale-110 transition-transform ease-out">
              Prev
            </Link>
          )}
          {hasNext && (
            <Link
              href={`/comic/${id + 1}`}
              className="p-2 border-slate-800 border-comic border-comic-small hover:scale-110 transition-transform ease-out">
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

interface returnType {
  params: {
    id: string;
  };
}


// Generamos todas las rutas que van a existir
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const files: string[] = (await fs.readdir("./comics")).map((comicName) =>
    comicName.slice(0, 4)
  );
  const filesPaths: returnType[] = files.map((id) => {
    return {
      params: { id },
    };
  });

  return {
    paths: filesPaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id: RawId = 1 } = params as { id: string };
  const id = +RawId;

  const comic: Comic = JSON.parse(
    await fs.readFile(`./comics/${id}.json`, "utf-8")
  );

  const [hasPrev, hasNext] = await Promise.all([
    existsSync(`./comics/${id - 1}.json`),
    existsSync(`./comics/${id + 1}.json`),
  ]);

  return {
    props: {
      ...comic,
      hasPrev,
      hasNext,
    },
  };
};

export default ComicId;
