import type { NextApiRequest, NextApiResponse } from "next";
import getOgImage from "../../../server/og-image";
import fs from "fs";
import slugify from "slugify";

type RouteQuery = NextApiRequest["query"] & {
  theme: string;
  date: string;
  readTime: string;
  title: string;
  url: string;
};

export default async function Handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    project: projectQuery,
    theme,
    readTime,
    title,
    url,
    date,
  } = req.query as RouteQuery;
  const project = Array.isArray(projectQuery)
    ? projectQuery.join("/")
    : projectQuery;

  

  const imagePath = await getOgImage({
    project,
    theme,
    readTime,
    title,
    url,
    date,
  });
  const imageBuffer = await fs.promises.readFile(imagePath);
  res.setHeader("Content-Type", "image/png");
  res.setHeader(
    "Content-disposition",
    `attachment; filename=${slugify(title)}.png`
  );
  res.send(imageBuffer);
}
