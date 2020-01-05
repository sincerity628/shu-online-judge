import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const RankTable = ({ ranks }) => {
  return (
    <div className="rank-table">
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>用户名</Table.HeaderCell>
            <Table.HeaderCell>Accept</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Rate</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { ranks.length && ranks.map((rank, index) => (
            <Table.Row key={rank.id}>
              <Table.Cell collapsing>{ index + 1 }</Table.Cell>
              <Table.Cell>
                <Link to={`/profile/${rank.id}`}>{ rank.username }</Link>
              </Table.Cell>
              <Table.Cell collapsing>{ rank.acCount }</Table.Cell>
              <Table.Cell collapsing>{ rank.submitCount }</Table.Cell>
              <Table.Cell collapsing>{ (rank.acRate * 100).toFixed(2) + '%' }</Table.Cell>
            </Table.Row>
          )) }
        </Table.Body>
      </Table>
    </div>
  );
}

export default RankTable;
