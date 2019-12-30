import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import ResultCell from '../public/ResultCell';
import '../components.css';

const ResultTable = ({ result }) => {
  return (
    <div className="result-table">
      <Table celled textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell><b>#</b></Table.HeaderCell>
            <Table.HeaderCell>语言</Table.HeaderCell>
            <Table.HeaderCell>提交时间</Table.HeaderCell>
            <Table.HeaderCell >结果</Table.HeaderCell>
            <Table.HeaderCell>耗时</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Link to={`/submission/${result.id}`}>
                { result.id.substring(0, 15) + "..." }
              </Link>
            </Table.Cell>
            <Table.Cell>{ result.language }</Table.Cell>
            <Table.Cell>{ result.createDate }</Table.Cell>
            <ResultCell result={result.result} />
            <Table.Cell>{ result.duration? result.duration : 'N/A' }</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

export default ResultTable;
