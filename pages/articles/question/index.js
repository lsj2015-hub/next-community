import ArticleList from '../../../components/articles/ArticleList';
import Layout from '../../../components/Layout';

export default function AskArticles() {
  return (
    <Layout>
      <ArticleList title="Question Board" category="question" />
    </Layout>
  );
}
