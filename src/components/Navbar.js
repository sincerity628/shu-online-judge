import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('');

  return (
    <div className="navbar">
      <Menu>
        <Link to="/"><Menu.Item>SHU OJ</Menu.Item></Link>
        <Link to="/">
          <Menu.Item name="problem" active={ activeItem ==='problem' }
            onClick={() => setActiveItem('problem')}>题目
          </Menu.Item>
        </Link>
        <Link to="/status">
          <Menu.Item name="status" active={ activeItem ==='status' }
            onClick={() => setActiveItem('status')}>提交状态
          </Menu.Item>
        </Link>
        <Link to="/tests">
          <Menu.Item name="test" active={ activeItem ==='test' }
            onClick={() => setActiveItem('test')}>考试
          </Menu.Item>
        </Link>
        <Link to="/groups">
          <Menu.Item name="group" active={ activeItem ==='group' }
            onClick={() => setActiveItem('group')}>小组
          </Menu.Item>
        </Link>
        <Link to="/rank">
          <Menu.Item name="rank" active={ activeItem ==='rank' }
            onClick={() => setActiveItem('rank')}>排名
          </Menu.Item>
        </Link>
      </Menu>
    </div>
  );
}

export default Navbar;
