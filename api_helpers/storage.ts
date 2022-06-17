import fs from "fs";

export const setPage = (pageId: string, pageToken: string) => {
  fs.writeFileSync("tmp/page.json", JSON.stringify({ pageId, pageToken }));
};

export const getPage = () => {
  console.log("getting storage");

  const page = fs.readFileSync("tmp/page.json", "utf-8");
  console.log("page", page);

  return JSON.parse(page) as { pageId: string; pageToken: string };
};
