import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { Form, Button, Message } from 'semantic-ui-react';
import sha256 from 'js-sha256';
import api from '../../tools/api';
import './auth.css';

const initUser = {
  username: '',
  password: ''
};

const initError = {
  isError: false,
  content: ''
};

const Signin = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);

  const [user, setUser] = useState(initUser);
  const [error, setError] = useState(initError);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChange = (e) => {
    setError(initError);

    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(user.password.length < 6) {
      setError({
        isError: true,
        content: '密码长度至少需要6位'
      });
      setUser({
        ...user,
        password: ''
      });
      return;
    }

    setBtnLoading(true);

    const data = {
      username: user.username,
      password: sha256(user.password)
    };

    api
      .login(data)
      .then(res => {
        if(res.status === 200) {
          // login success
          let user = {
            token: res.data.token
          };
          dispatch({ type: 'LOGIN', user });

          setUser(initUser);
          setBtnLoading(false);
          setLoginSuccess(true);

          setTimeout(() => {
            setLoginSuccess(false);
            history.push('/');
            // 更新用户信息
            api
              .getUserInfo()
              .then(res => {
                if(res.status === 200) {
                  let user = res.data;
                  dispatch({ type: 'UPDATE', user });
                }
              })
          }, 2000);

        } else {
          // login failed
          setBtnLoading(false);
          setError({
            isError: true,
            content: '密码错误'
          });
          setUser({
            ...user,
            password: ''
          });

        }
      })
      .catch(error => {
        console.log(error);

      })
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
            <input required type="text" id="username"
              value={user.username} onChange={handleChange} />
          </Form.Field>

          <Form.Field required>
            <label htmlFor="password">密码：</label>
            <input required type="password" id="password"
              value={user.password} onChange={handleChange}
              placeholder="至少6位"/>
          </Form.Field>

          { loginSuccess? (
            <Message positive header="恭喜！" content="登录成功" />
          ) : null}
          { error.isError? (
            <Message negative header="Aho!" content={error.content} />
          ) : null }

          <Button color="green" loading={btnLoading}>Sign in</Button>

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
