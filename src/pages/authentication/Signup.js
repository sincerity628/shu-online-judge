import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import sha256 from 'js-sha256';
import api from '../../tools/api';
import './auth.css';

const Signup = () => {
  return (
    <div className="signup">
      <div className="form-title">
        <h1>注册</h1>
      </div>
      <div className="form-container">
        <Form>
          <Form.Field required>
            <label htmlFor="username">用户名：</label>
            <input type="text" />
          </Form.Field>
          <Form.Field required>
            <label htmlFor="email">邮箱：</label>
            <input type="email" />
          </Form.Field>
          <Form.Field required>
            <label htmlFor="password">密码：</label>
            <input type="password" />
          </Form.Field>
          <Form.Field required>
            <label htmlFor="passwordConfirm">再次输入密码：</label>
            <input type="password" />
          </Form.Field>
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
