import Link from "next/link";

type Props = {};

const routes = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/about",
    name: "About",
  },
  {
    path: "/search",
    name: "Search",
  },
];

const Header = (props: Props) => {
  return (
    <div className="bg-zinc-100 shadow-md mb-5">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link href={'/'}>
          <div className="font-bold text-slate-800 font-primary flex items-center gap-3 group">
            <p>Next</p>
            <p className=" border-slate-800 border-comic border-comic-small p-2 group-hover:scale-110 transition-transform ease-out">
              XKCD
            </p>
          </div>
        </Link>
        <nav>
          <ul className="flex gap-2 items-center">
            {routes.map(({ name, path }, i) => {
              return (
                <li
                  key={i}
                  className="group hover:-translate-x-1 hover:-translate-y-1 hover:-rotate-2 active:-translate-y-0.5 active:-translate-x-0.5 transition-transform ease-in">
                  <Link
                    href={path}
                    className="font-primary relative p-2 text-white border-slate-800 border-comic border-comic-small">
                    {name}
                    <span className="absolute inset-0 bg-comic bg-zinc-700 group-hover:rotate-2  -z-10 group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-active:translate-x-1 group-active:translate-y-1 transition-transform ease-in"></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
