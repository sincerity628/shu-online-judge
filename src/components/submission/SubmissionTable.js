import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import '../components.css';

const SubmissionTable = ({ submissions }) => {
  console.log(submissions);

  return (
    <div className="submmision-table">
      <Table celled textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>创建时间</Table.HeaderCell>
            <Table.HeaderCell>作者</Table.HeaderCell>
            <Table.HeaderCell>题目</Table.HeaderCell>
            <Table.HeaderCell>语言</Table.HeaderCell>
            <Table.HeaderCell>结果</Table.HeaderCell>
            <Table.HeaderCell>耗时</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { submissions.map(submission => (
            <Table.Row key={submission.id}>
              <Table.Cell>
                <Link to={`/submission/${submission.id}`}>
                  { submission.id.substring(0, 15) + "..." }
                </Link>
              </Table.Cell>
              <Table.Cell>{ submission.createDate }</Table.Cell>
              <Table.Cell>{ submission.authorName }</Table.Cell>
              <Table.Cell>
                <Link to={`/problem/${submission.problemId}`}>
                  { submission.problemTitle }
                </Link>
              </Table.Cell>
              <Table.Cell>{ submission.language }</Table.Cell>
              <Table.Cell
                positive={ submission.result === 'ACCEPTED' }
                error={
                  submission.result === 'RUNTIME_ERROR' ||
                  submission.result === 'COMPILE_ERROR' ||
                  submission.result === 'WRONG_ANSWER'
                }
                warning={
                  submission.result === 'CPU_TIME_LIMIT_EXCEEDED' ||
                  submission.result === 'TIME_LIMIT_EXCEEDED' ||
                  submission.result === 'MEMORY_LIMIT_EXCEEDED'
                }
              ><b>{ submission.result }</b></Table.Cell>
              <Table.Cell>
                { submission.duration? submission.duration : 'N/A' }
              </Table.Cell>
            </Table.Row>
          )) }
        </Table.Body>
      </Table>
    </div>
  );
}

export default SubmissionTable;
