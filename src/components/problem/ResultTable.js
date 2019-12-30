import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import '../components.css';

const ResultTable = ({ result }) => {
  const [resultType, setResultType] = useState('');

  useEffect(() => {
    if(result.result === 'ACCEPTED') {
      setResultType('positive');
    } else if (
      result.result === 'CPU_TIME_LIMIT_EXCEEDED' ||
      result.result === 'TIME_LIMIT_EXCEEDED' ||
      result.result === 'MEMORY_LIMIT_EXCEEDED'
    ) {
      setResultType('warning');
    } else {
      setResultType('error');
    }
  }, [result])

  console.log(result);
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
            <Table.Cell
              positive={ resultType === 'positive' }
              error={ resultType === 'error' }
              warning={resultType === 'warning'}
            >
              <b>{ result.result }</b>
            </Table.Cell>
            <Table.Cell>{ result.duration? result.duration : 'N/A' }</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

export default ResultTable;
