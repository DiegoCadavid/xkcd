import { Comic } from "../interface/interfaces";
import Image from "next/image";
import Link from "next/link";

interface Props extends Comic {
  priority: boolean;
  width?: number;
  height?: number;
}

const ComicItem = ({
  id,
  day,
  month,
  year,
  safe_title,
  img,
  alt,
  height = 396,
  width = 396,
  priority,
}: Props) => {
  return (
    <Link href={`/comic/${id}`}>
      <div
        style={{
          width,
          height,
        }}
        className={`bg-zinc-800 rounded-lg overflow-hidden shadow-md shadow-zinc-700/40 border-zinc-700 border-comic group relative hover:scale-105 transition-transform ease-out hover:cursor-pointer`}>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-800/80 via-transparent flex justify-between items-end p-5 text-zinc-100 font-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity ease-out">
          <p> {safe_title} </p>
          <p> </p>
          <p className="">{`${day}/${month}/${year}`}</p>
        </div>
        <div className="w-full h-full">
          <Image
            priority={priority}
            src={img}
            width={width}
            height={height}
            alt={`${alt}`}
            className="w-full h-full object-center object-contain"
          />
        </div>
      </div>
    </Link>
  );
};

export default ComicItem;
