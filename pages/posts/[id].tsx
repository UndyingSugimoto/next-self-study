import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

type Props = {
  params: Params;
  fallback: boolean;
};

type Params = {
  id: string;
};

type Data = {
  id: string;
  date: Date;
  title: string;
};

export default function Post(postData: Data) {
  return (
    <Layout home={false}>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
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
  const postData = getPostData(props.params.id);
  return {
    props: {
      postData,
    },
  };
}
