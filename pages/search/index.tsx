import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import fs from "fs/promises";

import HeadComponent from "../../components/HeadComponent";
import Header from "../../components/Header";
import { Comic } from "../../interface/interfaces";
import ComicItem from "../../components/ComicItem";
import { FormEventHandler, useState } from "react";
import searchComics from "../../helpers/searchComics";

interface Props {
  comics: Comic[];
}

const Index = ({ comics }: Props) => {

  const [inputText, setInputText] = useState("");
  const router = useRouter();

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    
    router.push( inputText.trim().length > 0 ? `/search?q=${inputText.trim()}` : "/search");
    setInputText('');
  }

  return (
    <div>
      <HeadComponent title="Search" description="search all pages" />
      <Header />
      <div className="flex justify-center my-6">
        <form onSubmit={(e) => handleSubmit(e)} method="GET" className="w-full max-w-sm flex gap-1 items-center">
          <input name="q" id="q" onChange={(e) => setInputText(e.target.value) } value={inputText} type="text" placeholder="search" className="p-2 border-slate-800 border-b-2 w-full outline-none" />
          <input type="submit" value="Buscar" className="p-2 border-slate-800 border-comic border-comic-small hover:cursor-pointer hover:scale-105 transition-transform ease-out" />
        </form>
      </div>
      <div className="container mx-auto flex flex-wrap gap-1 justify-center">
        {comics.map((comic) => {
          return <ComicItem key={comic.id} {...comic} priority={false} width={250} height={250} />;
        })}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const comics = await searchComics(query as { q:string });
  return {
    props: {
      comics
    },
  };
};

export default Index;
