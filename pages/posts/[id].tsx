import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";

type Props = {
  postData: Data;
};

export type Data = {
  id: string;
  content: string;
  date: Date;
  title: string;
};

export default function Post(props: Props) {
  console.log(props.postData);
  console.log("id :" + props.postData.id);
  console.log("content :" + props.postData.content);
  console.log("date :" + props.postData.date);
  console.log("title :" + props.postData.title);
  return (
    <Layout home={false}>
      {props.postData.title}
      <br />
      {props.postData.id}
      <br />
      {props.postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: props.postData.content }} />
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
