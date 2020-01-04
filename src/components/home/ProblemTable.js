import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Label } from 'semantic-ui-react';
import '../components.css';

const ProblemTable = ({ problems, contest, chooseProblem }) => {

  const calculateDifficulty = (difficulty) => {
    switch(difficulty) {
      case 'HIGH':
        return ( <Label color="red">困难</Label> );
      case 'MEDIUM':
        return ( <Label color="yellow">中等</Label> );
      case 'LOW':
        return ( <Label color="green">简单</Label> );
      default: return '';
    }
  }

  return (
    <div className="table-container">
    { problems.length? (
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>标题</Table.HeaderCell>
            <Table.HeaderCell>难度</Table.HeaderCell>
            <Table.HeaderCell>通过率</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { problems.map((problem, index) => {
            return (
              <Table.Row key={problem.id}>
                <Table.Cell collapsing>{ index + 1 }</Table.Cell>
                { contest && (
                  <Table.Cell>
                    <span className="problem-title"
                      onClick={() => chooseProblem(problem.id)}
                    >
                      { problem.title }
                    </span>
                  </Table.Cell>
                ) }
                { !contest && (
                  <Table.Cell>
                    <Link to={`/problem/${problem.id}`}>{ problem.title }</Link>
                  </Table.Cell>
                ) }
                <Table.Cell collapsing>
                  { calculateDifficulty(problem.difficulty) }
                </Table.Cell>
                <Table.Cell collapsing>
                  { (problem.acceptRate * 100).toFixed(2) } %
                  ( { problem.acceptCount } / { problem.submitCount } )
                </Table.Cell>
              </Table.Row>
            );
          }) }
        </Table.Body>
      </Table>
    ) : (
      <p>problem not found...</p>
    ) }
    </div>
  );
}

export default ProblemTable;
