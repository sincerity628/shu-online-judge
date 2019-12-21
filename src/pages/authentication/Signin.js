import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import './auth.css';

const Signin = () => {
  return (
    <div className="signin">
      <div className="form-title">
        <h1>登录</h1>
      </div>
      <div className="form-container">
        <Form>
          <Form.Field required>
            <label htmlFor="username">用户名：</label>
            <input type="text" />
          </Form.Field>
          <Form.Field required>
            <label htmlFor="password">密码：</label>
            <input type="password" />
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
