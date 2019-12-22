import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button, Dropdown } from 'semantic-ui-react';
import "./components.css";

const Navbar = ({ token, handleLogout }) => {
  const [activeItem, setActiveItem] = useState('');

  return (
    <div className="navbar">
      <Menu>
        <Menu.Item as={Link} to="/"><div className="logo-text">SHU Online Judge</div></Menu.Item>
        <Menu.Item name="problem" active={ activeItem ==='problem' }
          onClick={() => setActiveItem('problem')} as={Link} to="/">题目
        </Menu.Item>
        <Menu.Item name="status" active={ activeItem ==='status' }
          onClick={() => setActiveItem('status')} as={Link} to="/status">提交状态
        </Menu.Item>
        <Menu.Item name="test" active={ activeItem ==='test' }
          onClick={() => setActiveItem('test')} as={Link} to="/tests">考试
        </Menu.Item>
        <Menu.Item name="group" active={ activeItem ==='group' }
          onClick={() => setActiveItem('group')} as={Link} to="/groups">小组
        </Menu.Item>
        <Menu.Item name="rank" active={ activeItem ==='rank' }
          onClick={() => setActiveItem('rank')} as={Link} to="/rank">排名
        </Menu.Item>

        <Menu.Menu position="right">
          <div className="sign-btn">
            <Button basic size="small" className="signin-btn"
              as={Link} to="/signin"style={{marginLeft: '10px'}}
              onClick={() => setActiveItem('')}>Sign in</Button>
            <Button secondary size="small" as={Link} to="/signup"
            onClick={() => setActiveItem('')}>Sign up</Button>
          </div>

          <Dropdown text='(username)' pointing className='link item'>
            <Dropdown.Menu style={{marginRight: '10px'}}>
              <Dropdown.Header>(role)</Dropdown.Header>

              <Dropdown.Item as={Link} to="/backend">后台管理</Dropdown.Item>
              <Dropdown.Divider />

              <Dropdown.Item as={Link} to="/profile">个人主页</Dropdown.Item>
              <Dropdown.Item as={Link} to="/submission">我的提交</Dropdown.Item>
              <Dropdown.Item as={Link} to="/setting">密保设置</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>登出</Dropdown.Header>
              <Button size="small" className="sign-out">Sign out.</Button>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
        
      </Menu>
    </div>
  );
}

export default Navbar;
