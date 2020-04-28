import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
import { Data } from "../pages/posts/[id]";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // /posts　配下のファイル名を取得する
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // id を取得するためにファイル名から ".md" を削除する
    const id = fileName.replace(/\.md$/, "");

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // 投稿のメタデータ部分を解析するために gray-matter を使う
    const matterResult = matter(fileContents);
    const { date, title } = matterResult.data;
    const castDate = date as Date;
    const castTitle = title as string;

    // データを id と合わせる
    return {
      id: id,
      date: castDate,
      title: castTitle,
    };
  });
  // 投稿を日付でソートする
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // 以下のような配列を返します:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // 投稿のメタデータ部分を解析するために gray-matter を使う
  const matterResult = matter(fileContents);
  const { date, title } = matterResult.data;
  const castDate = date as string;
  const castTitle = title as string;

  // マークダウンを HTML 文字列に変換するために remark を使う
  const processedContent = await remark()
    .use(html.plugins)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const result: Data = {
    id: id,
    content: contentHtml,
    date: castDate,
    title: castTitle,
  };

  // データを id と組み合わせる
  return result;
}
