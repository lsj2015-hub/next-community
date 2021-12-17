import { useRouter } from 'next/router';
import AriticleView from '../../../components/articles/ArticleView';
import Layout from '../../../components/Layout';

export default function ViewPage({ id }) {
  console.log(id);
  const router = useRouter();
  return (
    <Layout>
      <AriticleView id={id} />
    </Layout>
  );
}

export const getServerSideProps = ({ params }) => {
  return {
    props: {
      id: params.id,
    },
  };
};
