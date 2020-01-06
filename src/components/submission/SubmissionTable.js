import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import ResultCell from '../public/ResultCell';
import '../components.css';

const SubmissionTable = ({ submissions, contest }) => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    let id = JSON.parse(localStorage.getItem('user')).id;
    setUserId(id);
  }, []);

  return (
    <div className="submmision-table">
      { submissions.length? (
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
                { userId === submission.authorId? (
                  <Table.Cell>
                    <Link to={`/submission/${submission.id}`}>
                      { submission.id.substring(0, 15) + "..." }
                    </Link>
                  </Table.Cell>
                ) : (
                  <Table.Cell>
                    { submission.id.substring(0, 15) + "..." }
                  </Table.Cell>
                ) }
                <Table.Cell>{ submission.createDate }</Table.Cell>
                <Table.Cell>
                  <Link to={`/profile/${submission.authorId}`}>
                    { submission.authorName }
                  </Link>
                </Table.Cell>
                { typeof(contest) === 'undefined'? (
                  <Table.Cell>{ submission.problemTitle }</Table.Cell>
                ) : (
                  <Table.Cell>
                    <Link to={`/problem/${submission.problemId}`}>
                      { submission.problemTitle }
                    </Link>
                  </Table.Cell>
                ) }
                <Table.Cell>{ submission.language }</Table.Cell>
                <ResultCell result={submission.result} />
                <Table.Cell>
                  { submission.duration? submission.duration + 'ms' : 'N/A' }
                </Table.Cell>
              </Table.Row>
            )) }
          </Table.Body>
        </Table>
      ) : (
        <p>暂无提交记录</p>
      ) }
    </div>
  );
}

export default SubmissionTable;
