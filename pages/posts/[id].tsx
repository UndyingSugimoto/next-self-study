import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

type Props = {
  postData: Data;
};

export type Data = {
  id: string;
  content: string;
  date: string;
  title: string;
};

interface StaticProps extends ParsedUrlQuery {
  id: string;
}

export default function Post(props: Props) {
  return (
    <Layout home={false}>
      <Head>
        <title>{props.postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{props.postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date date={props.postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: props.postData.content }} />
      </article>
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
