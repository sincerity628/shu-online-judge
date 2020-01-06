import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon } from 'semantic-ui-react';

const GroupTable = ({ groups }) => {
  return (
    <div className="group-table">
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>名称</Table.HeaderCell>
            <Table.HeaderCell>创建者</Table.HeaderCell>
            <Table.HeaderCell>人数</Table.HeaderCell>
            <Table.HeaderCell>创建时间</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { groups.length? groups.map((group, index) => (
            <Table.Row key={group.id}>
              <Table.Cell collapsing>{ index + 1 }</Table.Cell>
              <Table.Cell style={{ color: '#' + group.id.slice(2, 8) }}>
                { group.name }
              </Table.Cell>
              <Table.Cell collapsing>
                <Link to={`/profile/${group.authorId}`}>{ group.authorName }</Link>
              </Table.Cell>
              <Table.Cell collapsing>
                <Icon name="user" />
                <Icon name="times" size="tiny" />
                { group.jwtUserList.length }
              </Table.Cell>
              <Table.Cell collapsing>{ group.createDate }</Table.Cell>
            </Table.Row>
          )) : null }
        </Table.Body>
      </Table>
    </div>
  );
}

export default GroupTable;
