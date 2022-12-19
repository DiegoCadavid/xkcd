import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center font-primary gap-3 ">
      <div>
        <h2 className="font-bold text-6xl">404</h2>
        <p>Page Not Found</p>
      </div>

      <Link href='/' className="border-slate-800 border-comic border-comic-small p-2 hover:scale-110 transition-transform ease-out"> Home </Link>
    </div>
  );
};

export default ErrorPage;
