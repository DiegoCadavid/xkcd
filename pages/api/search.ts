import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import { Comic } from "../../interface/interfaces";
import searchComics from "../../helpers/searchComics";

interface Data {
  comics?: Comic[];
  msg?: string;
}

const search = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const comics = await searchComics(req.query as { q:string });
    res.status(200).json({ comics });
  } catch (error) {
    res.status(500).json({
      msg: "server error"
    });
  }
};

export default search;
