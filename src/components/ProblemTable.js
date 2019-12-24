import React from 'react';
import { Table } from 'semantic-ui-react';

const ProblemTable = ({ problems }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>标题</Table.HeaderCell>
          <Table.HeaderCell>通过率</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Table>
  );
}

export default ProblemTable;
