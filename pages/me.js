import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Layout from '../components/Layout';

export default function me() {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    axios
      .get(`${process.env.API_HOST}/me`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.warn(err));
  }, []);

  return (
    <Layout>
      <div className="container">
        <dl>
          <dt>이메일</dt>
          <dd>{profile.email}</dd>
          <dt>이름</dt>
          <dd>{profile.name}</dd>
          <dt>가입일시</dt>
          <dd>{profile.created_at}</dd>
        </dl>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ req, resolvedUrl }) => {
  const cookies = new Cookies(req.headers.cookie);
  const token = cookies.get('token');
  if (token) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        destination: 'auth/sign-in?ref=' + resolvedUrl,
        permanent: false,
      },
    };
  }
};
