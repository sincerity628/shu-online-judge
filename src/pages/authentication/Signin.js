import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import sha256 from 'js-sha256';
import api from '../../tools/api';
import './auth.css';

const initUser = {
  username: '',
  password: ''
};

const Signin = () => {
  const [user, setUser] = useState(initUser);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: user.username,
      password: sha256(user.password)
    };

    api
      .login(data)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });

  };

  return (
    <div className="signin">
      <div className="form-title">
        <h1>登录</h1>
      </div>
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <Form.Field required>
            <label htmlFor="username">用户名：</label>
            <input required type="text" id="username" value={user.username} onChange={handleChange} />
          </Form.Field>
          <Form.Field required>
            <label htmlFor="password">密码：</label>
            <input required type="password" id="password" value={user.password} onChange={handleChange} />
          </Form.Field>
          <Button color="green">Sign in</Button>
          <span className="side-func">
            <Link to="/forget-password" className="link">忘记密码</Link>
            &nbsp; | &nbsp;
            <Link to="/signup" className="link">注册账号</Link>
          </span>
        </Form>
      </div>
    </div>
  );
}

export default Signin;
