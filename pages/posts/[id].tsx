import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";

type Params = {
  id: string;
};

export type Data = {
  id: string;
  content: string;
  date: Date;
  title: string;
};

export default function Post(postData: Data) {
  console.log("id :" + postData.id);
  console.log("content :" + postData.content);
  console.log("date :" + postData.date);
  console.log("title :" + postData.title);
  return (
    <Layout home={false}>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.content }} />
    </Layout>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  console.log("paths :" + paths);
  return {
    paths,
    fallback: false,
  };
};

// export async function getStaticProps(props: Props) {
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const postData = await getPostData(id);
  console.log("postData.contentHtml :" + postData.content);
  return {
    props: {
      postData,
    },
  };
};
