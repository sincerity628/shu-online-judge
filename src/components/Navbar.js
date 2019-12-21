import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('');

  return (
    <div className="navbar">
      <Menu>
        <Menu.Item as={Link} to="/">SHU OJ</Menu.Item>
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
      </Menu>
    </div>
  );
}

export default Navbar;
