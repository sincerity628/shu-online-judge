import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { UIContext } from '../../contexts/UIContext';
import { Menu, Button, Dropdown, Dimmer } from 'semantic-ui-react';
import "../components.css";

const Navbar = () => {
  const history = useHistory();
  const { user, token, dispatch } = useContext(UserContext);
  const { dimmer, toggleDimmer } = useContext(UIContext);
  const [activeItem, setActiveItem] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if(user && user.authorities) {
      switch(user.authorities[0].authority) {
        case 'ROLE_USER':
          setRole('同学');
          break;
        case 'ROLE_STUFF':
          setRole('教师');
          break;
        case 'ROLE_ADMIN':
          setRole('管理员');
          break;
        default:
          break;
      }
    }
  }, [user]);

  const handleSignout = () => {
    toggleDimmer(true);
    setTimeout(() => {
      // logout success
      toggleDimmer(false);
      dispatch({ type: 'LOGOUT' });
      history.push('/');
    }, 500);
  }

  return (
    <div className="navbar">
      <Dimmer active={dimmer} page inverted></Dimmer>
      <Menu>
        <Menu.Item as={Link} to="/" onClick={() => setActiveItem('')}>
          <div className="logo-text">SHU Online Judge</div>
        </Menu.Item>
        <Menu.Item name="problem" active={ activeItem ==='problem' }
          onClick={() => setActiveItem('problem')} as={Link} to="/">题目
        </Menu.Item>
        <Menu.Item name="status" active={ activeItem ==='status' }
          onClick={() => setActiveItem('status')} as={Link} to="/status">状态
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
        { token ? (
          <Dropdown text={ user? user.username : null } pointing
            className='link item'>

            <Dropdown.Menu style={{marginRight: '10px'}}>
              <Dropdown.Header>({ role })</Dropdown.Header>

              { role !== '同学' ? (
                <Dropdown.Item as={Link} to="/backend">后台管理</Dropdown.Item>
              ) : null }

              <Dropdown.Divider />

              <Dropdown.Item as={Link} to={`/profile/${user.id}`}>个人主页</Dropdown.Item>
              <Dropdown.Item as={Link} to="/my-submission">我的提交</Dropdown.Item>
              <Dropdown.Item as={Link} to="/setting">密保设置</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>登出</Dropdown.Header>
              <Button size="small" className="sign-out"
                onClick={handleSignout}>Sign out.</Button>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <div className="sign-btn">
            <Button basic size="small" className="signin-btn"
              as={Link} to="/signin"style={{marginLeft: '10px'}}
              onClick={() => setActiveItem('')}>Sign in</Button>
            <Button secondary size="small" as={Link} to="/signup"
            onClick={() => setActiveItem('')}>Sign up</Button>
          </div>
        ) }
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default Navbar;
