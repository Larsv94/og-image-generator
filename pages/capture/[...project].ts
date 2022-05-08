import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import getOgImage from "../../server/og-image";
import fs from "fs";
import slugify from "slugify";

type RouteQuery = GetServerSidePropsContext["query"] & {
  theme: string;
  date: string;
  readTime: string;
  title: string;
  url: string;
};
export default function Empty() {
  return null;
}

export async function getServerSideProps({
  req,
  res,
  query,
}: GetServerSidePropsContext) {
  const {
    project: projectQuery,
    theme,
    readTime,
    title,
    url,
    date,
  } = query as RouteQuery;
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
  res.setHeader("Content-Type", "image/png");
  res.setHeader(
    "Content-disposition",
    `attachment; filename=${slugify(title)}.png`
  );
  res.write(imageBuffer);
  res.end();
  return { props: { test: "test" } };
}
