import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

type Props = {
  params: Params;
  fallback: boolean;
};

type Params = {
  id: string;
};

export type Data = {
  id: string;
  contentHtml: string;
  date: Date;
  title: string;
};

export default function Post(postData: Data) {
  console.log("html :" + postData.contentHtml);
  return (
    <Layout home={false}>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
export async function getStaticPaths() {
  const paths = getAllPostIds();
  console.log("paths :" + paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(props: Props) {
  console.log("props :" + props);
  const postData = await getPostData(props.params.id);
  console.log("postData.contentHtml :" + postData.contentHtml);
  return {
    props: {
      postData,
    },
  };
}
