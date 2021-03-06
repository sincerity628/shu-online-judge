import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button, Message } from 'semantic-ui-react';
import sha256 from 'js-sha256';
import api from '../../tools/api';
import './auth.css';

const initUser = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  school: ''
};

const initError = {
  isError: false,
  content: ''
};

const initConfirmError = {
  content: '需要与密码一致噢！',
  pointing: 'below'
};

const Signup = () => {
  const history = useHistory();

  const [user, setUser] = useState(initUser);
  const [error, setError] = useState(initError);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [confirmError, setConfirmError] = useState(null);

  const handleChange = (e) => {
    setError(initError);

    if(e.target.id === 'confirmPassword') {
      if(e.target.value !== user.password) {
        setConfirmError(initConfirmError);
      } else {
        setConfirmError(null);
      }
    }

    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(confirmError) return;
    if(user.username.length < 4) {
      setError({
        isError: true,
        content: '用户名长度至少需要4位'
      });
      return;
    }
    if(user.password.length < 6) {
      setError({
        isError: true,
        content: '密码长度至少需要6位'
      });
      setUser({
        ...user,
        password: '',
        confirmPassword: ''
      });
      return;
    }

    setBtnLoading(true);

    const data = {
      username: user.username,
      password: sha256(user.password),
      email: user.email,
      name: user.name,
      school: user.school
    };

    api
      .register(data)
      .then(res => {
        if(res.status === 200) {

          setUser(initUser);
          setBtnLoading(false);
          setSignupSuccess(true);

          setTimeout(() => {
            setSignupSuccess(false);
            history.push('/signin');
          }, 2000);

        }
      })
      .catch(error => {
        if(error.status === 400) {
          setBtnLoading(false);

          if(error.data.message === '邮箱重复！') {
            setError({
              isError: true,
              content: '邮箱重复'
            });
            setUser({
              ...user,
              email: ''
            });
            return;
          }

          if(error.data.message === '用户名重复！') {
            setError({
              isError: true,
              content: '用户名重复'
            });
            setUser({
              ...user,
              username: ''
            });
            return;
          }
        }
      })
  };

  return (
    <div className="signup">
      <div className="form-title">
        <h1>注册</h1>
      </div>
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <Form.Field required>
            <label htmlFor="username">用户名：</label>
            <input type="text" id="username" value={user.username}
              onChange={handleChange} required placeholder="至少4位"
              autoComplete="off" />
          </Form.Field>

          <Form.Field required>
            <label htmlFor="email">邮箱：</label>
            <input type="email" id="email" value={user.email}
              onChange={handleChange} required autoComplete="off" />
          </Form.Field>

          <Form.Field required>
            <label htmlFor="password">密码：</label>
            <input type="password" id="password" value={user.password}
              onChange={handleChange} required placeholder="至少6位"
              autoComplete="off" />
          </Form.Field>

          <Form.Field required>
            <label htmlFor="passwordConfirm">再次输入密码：</label>
            <Form.Input type="password" id="confirmPassword"
              value={user.confirmPassword} onChange={handleChange} required
              error={confirmError} autoComplete="off" />
          </Form.Field>

          <Form.Field required>
            <label htmlFor="passwordConfirm">姓名：</label>
            <input type="text" id="name" value={user.name} required
              onChange={handleChange} autoComplete="off" />
          </Form.Field>

          <Form.Field required>
            <label htmlFor="passwordConfirm">学校：</label>
            <input type="text" id="school" value={user.school} required
            onChange={handleChange} autoComplete="off" />
          </Form.Field>

          { signupSuccess? (
            <Message positive header="恭喜！" content="注册成功，快去登录吧" />
          ) : null }

          { error.isError? (
            <Message negative header="Aho!" content={error.content} />
          ) : null }

          <Button color="green" loading={btnLoading}>Sign up</Button>
          <span className="side-func">
            <Link to="/signin" className="link">已有账户，直接登入</Link>
          </span>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
