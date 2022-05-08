import type { NextApiRequest, NextApiResponse } from "next";
import getOgImage from "../../../server/og-image";
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

  const imageBuffer = await getOgImage({
    project,
    theme,
    readTime,
    title,
    url,
    date,
  });
  console.log("Hit it again");
  res.setHeader("Content-Type", "image/png");
  res.setHeader(
    "Content-disposition",
    `attachment; filename=${slugify(title)}.png`
  );
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=604800, stale-while-revalidate=86400"
  );

  res.send(imageBuffer);
}
