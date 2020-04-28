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

interface StaticProps extends ParsedUrlQuery {
  id: string;
}

export default function Post(props: Props) {
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
export const getStaticPaths: GetStaticPaths<StaticProps> = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

// export async function getStaticProps(props: Props) {
export const getStaticProps: GetStaticProps<{}, StaticProps> = async ({
  params,
}) => {
  const id = params?.id as string;
  const postData = await getPostData(id);
  return {
    props: {
      postData,
    },
  };
};
