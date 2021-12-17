import axios from 'axios';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Layout from '../components/Layout';
import authAtom from '../stores/authAtom';

export default function me() {
  const [profile, setProfile] = useState({});
  const [, setAuth] = useAtom(authAtom);
  const router = useRouter();
  useEffect(() => {
    axios
      .get(`${process.env.API_HOST}/me`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.warn(err));
  }, []);

  const logout = useCallback(() => {
    const cookies = new Cookies();
    cookies.remove('token');
    setAuth((auth) => ({ ...auth, token: null, user: null }));
    delete axios.defaults.headers.common.Authorization;
    router.push('/');
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
        <button className="btn btn-danger" onClick={logout}>
          로그아웃
        </button>
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
