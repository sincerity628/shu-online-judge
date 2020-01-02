import React, { useState, useEffect, useContext } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { UIContext } from '../../contexts/UIContext';
import api from '../../tools/api';
import shadow from '../../assets/image/shadow.jpg';
import './profile.css';

const Profile = (props) => {
  console.log(props.match.params.id);
  const { toggleDimmer } = useContext(UIContext);
  const [user, setUser] = useState({});
  const [dimmer, setDimmer] = useState(false);

  useEffect(() => {
    toggleDimmer(dimmer);
  }, [toggleDimmer, dimmer]);

  useEffect(() => {
    let userId = props.match.params.id;
    setDimmer(true);
    api
      .getUser(userId)
      .then(res => {
        if(res.status === 200) {
          setDimmer(false);
          setUser(res.data);
          console.log(res.data);
        }
      })

  }, [props]);

  const transRole = () => {
    if(user && user.authorities) {
      switch(user.authorities[0].authority) {
        case 'ROLE_USER': return '学生';
        case 'ROLE_ADMIN': return '管理员';
        case 'ROLE_STUFF': return '教师';
        default: return '';
      }
    }
  };

  return (
    <div className="profile">
      <Card className="profile-card">
        <Card.Content>
          <Card.Header>
            { user.username }（{ transRole() }）
          </Card.Header>
        </Card.Content>

        <Card.Content>
          <div>
            <Icon name="user" />
            <span className="info-detail">
              { user.name ? user.name : '此用户没有填写姓名...' }
            </span>
          </div>
          <div className="card-container">
            <Icon name="building" />
            <span className="info-detail">
              { user.school ? user.school : '此用户没有填写学校名称...' }
            </span>
          </div>
          <div className="card-container">
            <Icon name="mail outline" />
            <span className="info-detail">
              { user.email ? user.email : '此用户没有填写联系邮箱...'}
            </span>
          </div>
        </Card.Content>
        <Card.Content>
          <div>
            solved:
            <span className="info-detail solved">{ user.acCount }</span>
          </div>
          <div className="card-container">
            submitted:
            <span className="info-detail submitted">{ user.submitCount }</span>
          </div>
          <div className="card-container">
            rate:
            <span className="info-detail submitted">{ (user.acRate * 100).toFixed(2) + "%" }</span>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}

export default Profile;
