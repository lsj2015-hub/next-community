import { useAtom } from 'jotai';
import Link from 'next/link';
import authAtom from '../stores/authAtom';

export default function Layout({ children }) {
  const [auth, setAuth] = useAtom(authAtom);
  return (
    <div className="flex flex-col">
      <header className="container flex flex-row justify-between py-2">
        <Link href="/">
          <a className="btn btn-link -ml-3">Magne Community</a>
        </Link>
        <div className="flex flex-row -mr-4">
          <Link href="/">
            <a className="btn btn-link">Home</a>
          </Link>
          <Link href="/">
            <a className="btn btn-link">General Board</a>
          </Link>
          <Link href="/">
            <a className="btn btn-link">Question Board</a>
          </Link>
          {!auth.loaded ? (
            <>loading.....</>
          ) : (
            <>
              {auth.user ? (
                <Link href="/me">
                  <a className="btn btn-link">My Info</a>
                </Link>
              ) : (
                <Link href="/auth/sign-in">
                  <a className="btn btn-link">로그인</a>
                </Link>
              )}
            </>
          )}
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
