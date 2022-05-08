import chrome from "chrome-aws-lambda";
import { createHash } from "crypto";
import fs from "fs";
import path from "path";

interface URLProps {
  project?: string;
  theme: string;
  date: string;
  readTime: string;
  title: string;
  url: string;
}
async function getOgImage(props: URLProps) {
  const baseUrl = "https://og-image.weekenddive.com/";
  const siteUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const { project, ...queryParameters } = { ...props };
  queryParameters.url = siteUrl + (props.url ?? "");
  const entries = Object.entries(queryParameters).filter((x) => x);
  const queryString = entries.map(([prop, val]) => `${prop}=${val}`).join("&");

  const imageUrl = `${baseUrl}/${project}?${queryString}`;
  const hash = createHash("md5").update(imageUrl).digest("hex");
  const ogImageDir = "./public/images/og";
  const imagePath = `${ogImageDir}/${hash}.png`;
  //const publicPath = `${siteUrl}/images/og/${hash}.png`;

  try {
    await fs.promises.stat(imagePath);
    return await fs.promises.readFile(imagePath);
  } catch {
    // file does not exists, so we create it
  }

  const browser = await chrome.puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto(imageUrl, { waitUntil: "networkidle2" });
  const buffer = await page.screenshot({ type: "png" });
  await browser.close();

  if (buffer && process.env.NODE_ENV !== "development") {
    await fs.promises.mkdir(ogImageDir, { recursive: true });
    await fs.promises.writeFile(imagePath, buffer);
  }

  return buffer;
}

export default getOgImage;
