import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Table, Label } from 'semantic-ui-react';
import { UIContext } from '../../contexts/UIContext';
import api from '../../tools/api';
import './contest.css';


const ContestDetail = (props) => {
  const { toggleDimmer } = useContext(UIContext);

  const [contest, setContest] = useState({});
  const [activeItem, setActiveItem] = useState('考试信息');
  const [dimmer, setDimmer] = useState(false);

  useEffect(() => {
    toggleDimmer(dimmer);
  }, [toggleDimmer, dimmer]);

  useEffect(() => {
    setDimmer(true);
    api
      .getContest(props.match.params.id)
      .then(res => {
        if(res.status === 200) {
          setDimmer(false);
          console.log(res.data);
          setContest(res.data);
        }
      })
  }, []);

  const transTypeToText = (type) => {
    switch(type) {
      case 'PUBLIC':
        return '公开赛';
      case 'SECRET_WITH_PASSWORD':
        return '私密可加入';
      case 'SECRET_WITHOUT_PASSWORD':
        return '不可加入';
      default:
        return '';
    }
  };

  const transStatusToText = (status) => {
    switch(status) {
      case 'NOT_STARTED':
        return '即将开始';
      case 'PROCESSING':
        return '正在进行';
      case 'ENDED':
        return '已结束';
      default:
        return '';
    }
  };

  return (
    <div className="contest-detail">
      <h1>{ contest.name }</h1>
      <Menu secondary>
        <Menu.Item
          name="考试信息"
          active={activeItem === '考试信息'}
          onClick={() => setActiveItem('考试信息')}
        />
        <Menu.Item
          name="题目列表"
          active={activeItem === '题目列表'}
          onClick={() => setActiveItem('题目列表')}
        />
        <Menu.Item
          name="排名情况"
          active={activeItem === '排名情况'}
          onClick={() => setActiveItem('排名情况')}
        />
      </Menu>
      { activeItem === '考试信息' && (
        <div>
          <h4 className="part-title">描述</h4>
          <div
            dangerouslySetInnerHTML={{ __html: contest.description }}
          ></div>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>开始时间</Table.HeaderCell>
                <Table.HeaderCell>结束时间</Table.HeaderCell>
                <Table.HeaderCell>状态</Table.HeaderCell>
                <Table.HeaderCell>比赛类型</Table.HeaderCell>
                <Table.HeaderCell>发起人</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Label ribbon>1</Label>
                </Table.Cell>
                <Table.Cell>{ contest.createDate }</Table.Cell>
                <Table.Cell>{ contest.endDate }</Table.Cell>
                <Table.Cell>
                  { transStatusToText(contest.status) }
                </Table.Cell>
                <Table.Cell>
                  { transTypeToText(contest.contestType) }
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/profile/${contest.authorId}`}>
                    { contest.authorName }
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      ) }
      { activeItem === '题目列表' && (
        <h1>题目列表</h1>
      ) }
      { activeItem === '排名情况' && (
        <h1>排名情况</h1>
      ) }

    </div>
  );
}

export default ContestDetail;
