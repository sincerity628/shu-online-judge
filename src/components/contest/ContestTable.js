import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon, Label} from 'semantic-ui-react';
import api from '../../tools/api';
import '../components.css';

const ContestTable = ({ contests, action }) => {
  const countDuration = (start, end) => {
    start = start.replace(/-/g, '/');
    end = end.replace(/-/g, '/');
    let date1 = new Date(start);
    let date2 = new Date(end);
    let duration = (date2 - date1) / 1000;
    let hour = Math.floor(duration / 3600).toString();
    let minute = Math.floor(duration / 60 % 60);
    minute = minute === 0 ? '00' : minute.toString();
    return hour + ":" + minute;
  };

  const transTypeToIcon = (type) => {
    switch(type) {
      case 'PUBLIC':
        return <Icon color="green" name="check" size="large" className="type-icon" />;
      case 'SECRET_WITH_PASSWORD':
        return (
          <div className="father">
            <div>
            <div className="tooltip-container">
              <Label pointing="below" className="tooltip" size="large" color="black">{ transTypeToText(type) }</Label>
            </div>
            <Icon name="lock" size="large" className="type-icon" />
            </div>
          </div>
        );
      case 'SECRET_WITHOUT_PASSWORD':
        return <Icon color="red" name="times" size="large" className="type-icon" />;
      default:
        return '';
    }
  };

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

  const joinContest = (id) => {
    api
      .getContest(id)
      .then(res => {
        if(res.status === 200) {
          action.goToContest(id);
        }
      })
      .catch(error => {
        action.toggleOpen(true, id);
      })
  };

  return (
    <div className="contest-table">
      { contests.length? (
        <Table celled textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>名称</Table.HeaderCell>
              <Table.HeaderCell>开始时间</Table.HeaderCell>
              <Table.HeaderCell>时长</Table.HeaderCell>
              <Table.HeaderCell>权限</Table.HeaderCell>
              <Table.HeaderCell>状态</Table.HeaderCell>
              <Table.HeaderCell>发起人</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { contests.map((contest, index) => {
                return contest.visible? (
                  <Table.Row key={contest.id}>
                    <Table.Cell><b>{ index + 1 }</b></Table.Cell>
                    { contest.contestType === 'PUBLIC' && (
                      <Table.Cell>
                        <Link to={`/contest/${contest.id}`}>{ contest.name }</Link>
                      </Table.Cell>
                    ) }
                    { contest.contestType === 'SECRET_WITHOUT_PASSWORD' && (
                      <Table.Cell>{ contest.name }</Table.Cell>
                    ) }
                    { contest.contestType === 'SECRET_WITH_PASSWORD' && (
                      <Table.Cell>
                        <span className="secret-contest"
                          onClick={() => joinContest(contest.id)}
                        >{ contest.name }</span>
                      </Table.Cell>
                    ) }
                    <Table.Cell>{ contest.startDate }</Table.Cell>
                    <Table.Cell>{ countDuration(contest.startDate, contest.endDate) }</Table.Cell>
                    <Table.Cell>
                        { transTypeToIcon(contest.contestType) }
                    </Table.Cell>
                    <Table.Cell>{ transStatusToText(contest.status) }</Table.Cell>
                    <Table.Cell>
                      <Link to={`/profile/${contest.authorId}`}>{ contest.authorName }</Link>
                    </Table.Cell>
                  </Table.Row>
                ) : null;
              }) }
          </Table.Body>
        </Table>
      ) : (
        <p>暂无比赛</p>
      ) }
    </div>
  );
}

export default ContestTable;
