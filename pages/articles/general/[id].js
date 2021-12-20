import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';
import AriticleView from '../../../components/articles/ArticleView';
import Layout from '../../../components/Layout';
import { fetcher } from '../../../hooks/useFetch';

export default function ViewPage({ id, fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Layout>
        <AriticleView id={id} />
      </Layout>
    </SWRConfig>
  );
}

export const getServerSideProps = async ({ params }) => {
  const id = params.id;
  const url = `${process.env.API_HOST}/articles/${id}`;
  const article = await fetcher(url);
  return {
    props: {
      id,
      fallback: {
        [url]: article,
      },
    },
  };
};
