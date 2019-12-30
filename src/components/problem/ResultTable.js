import React from 'react';
import { Table } from 'semantic-ui-react';
import '../components.css';

const ResultTable = ({ result }) => {
  console.log(result);
  return (
    <div className="result-table">
    <Table celled unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>语言</Table.HeaderCell>
          <Table.HeaderCell>提交时间</Table.HeaderCell>
          <Table.HeaderCell>结果</Table.HeaderCell>
          <Table.HeaderCell>耗时</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>{ result.id }</Table.Cell>
          <Table.Cell>{ result.language }</Table.Cell>
          <Table.Cell>{ result.createDate }</Table.Cell>
          <Table.Cell>{ result.result }</Table.Cell>
          <Table.Cell>{ result.duration }</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    </div>
  );
}

export default ResultTable;
