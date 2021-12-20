import { SWRConfig } from 'swr';
import ArticleList from '../../../components/articles/ArticleList';
import Layout from '../../../components/Layout';
import { fetcher } from '../../../hooks/useFetch';

export default function AskArticles({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Layout>
        <ArticleList title="Question Board" category="question" />
      </Layout>
    </SWRConfig>
  );
}

export const getServerSideProps = async () => {
  const url = `${process.env.API_HOST}/articles?category=question`;
  const data = await fetcher(url);
  return {
    props: {
      fallback: {
        [url]: data,
      },
    },
  };
};
