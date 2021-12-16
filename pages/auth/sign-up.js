import { useCallback, useMemo, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function SignUp() {
  const router = useRouter();
  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedName, setTouchedName] = useState(false);

  const errors = useMemo(() => {
    const errors = {};
    if (!email) {
      errors.email = '이메일은 필수 입력 항목입니다.';
    } else if (!password) {
      errors.password = '비밀번호는 필수 입력 항목입니다.';
    } else if (!name) {
      errors.name = '이름은 필수 입력 항목입니다.';
    }
    return errors;
  }, [email, password, name]);

  const submit = useCallback(
    (e) => {
      // submit에 대한 동작
      e.preventDefault();
      if (Object.keys(errors).length > 0) {
        return;
      }
      axios
        .post(process.env.API_HOST + '/auth/sign-up', {
          email,
          password,
          name,
        })
        .then(() => {
          alert('회원가입이 완료되었습니다.');
          router.push('/auth/sign-in');
        })
        .catch((err) => {
          alert(
            err.response?.data?.message ??
              err.message ??
              '서버와 통신에 실패했습니다.'
          );
        });
    },
    [email, password, name, errors]
  );

  // form validation
  // ajax
  return (
    <>
      <div className="container">
        <h1>회원가입</h1>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => setTouchedEmail(true)}
            />
            <p className="text-danger mt-2">
              {errors.email && touchedEmail && errors.email}
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="비밀번호를 입력하세요..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => setTouchedPassword(true)}
            />
            <p className="text-danger mt-2">
              {errors.password && touchedPassword && errors.password}
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              placeholder="이름을 입력하세요..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => setTouchedName(true)}
            />
            <p className="text-danger mt-2">
              {errors.name && touchedName && errors.name}
            </p>
          </div>
          <div>
            <button className="btn btn-primary">회원가입</button>
          </div>
        </form>
      </div>
    </>
  );
}
