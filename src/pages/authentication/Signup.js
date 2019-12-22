import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Message } from 'semantic-ui-react';
import sha256 from 'js-sha256';
import api from '../../tools/api';
import './auth.css';

const initUser = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
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
  const [user, setUser] = useState(initUser);
  const [error, setError] = useState(initError);
  const [signupSuccess, setSignupSuccess] = useState(false);
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
      setUser({
        ...user,
        username: ''
      });
      return;
    }

    if(user.password.length < 6 ) {
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
    // signup success
    setSignupSuccess(true);
    console.log(user);

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
              onChange={handleChange} required placeholder="至少4位" />
          </Form.Field>

          <Form.Field required>
            <label htmlFor="email">邮箱：</label>
            <input type="email" id="email" value={user.email}
              onChange={handleChange} required />
          </Form.Field>

          <Form.Field required>
            <label htmlFor="password">密码：</label>
            <input type="password" id="password" value={user.password}
              onChange={handleChange} required placeholder="至少4位" />
          </Form.Field>

          <Form.Field required>
            <label htmlFor="passwordConfirm">再次输入密码：</label>
            <Form.Input type="password" id="confirmPassword"
              value={user.confirmPassword} onChange={handleChange} required
              error={confirmError} />
          </Form.Field>

          { signupSuccess? (
            <Message positive header="恭喜！" content="注册成功，快去登录吧" />
          ) : null }

          { error.isError? (
            <Message negative header="Aho!" content={error.content} />
          ) : null }

          <Button color="green">Sign up</Button>
          <span className="side-func">
            <Link to="/signin" className="link">已有账户，直接登入</Link>
          </span>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
