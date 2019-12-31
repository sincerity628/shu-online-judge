import React from 'react';
import { Table } from 'semantic-ui-react';

const ResultCell = ({ result }) => {
  return (
    <Table.Cell
      positive={ result === 'ACCEPTED' }
      error={
        result === 'RUNTIME_ERROR' ||
        result === 'COMPILE_ERROR' ||
        result === 'WRONG_ANSWER'
      }
      warning={
        result === 'CPU_TIME_LIMIT_EXCEEDED' ||
        result === 'TIME_LIMIT_EXCEEDED' ||
        result === 'MEMORY_LIMIT_EXCEEDED' ||
        result === 'JUDGE_CLIENT_ERROR'
      }
    ><b>{ result }</b></Table.Cell>
  );
}

export default ResultCell;
