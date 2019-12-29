import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import ProblemDescription from '../../components/problem/ProblemDescription';
import TagGroup from '../../components/TagGroup';
import api from '../../tools/api';
import './problem-detail.css';

const ProblemDetail = (props) => {
  const history = useHistory();

  const [problem, setProblem] = useState({});
  const [tags, setTags] = useState([]);

  useEffect(() => {
    api
      .getProblem(props.match.params.id)
      .then(res => {
        if(res.status === 200) {
          setProblem(res.data);
          setTags(res.data.tagList);
        }
      })

  }, [props.match.params.id]);

  const chooseTag = (tag) => {
    if(tag !== '') {
      history.push(`/tag/${tag}`);
    } else {
      history.push('/tag/0');
    }
  }

  return (
    <div className="problem-detail">
      <h1>ProblemDetail</h1>
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={12} computer={12}>

          </Grid.Column>
          <Grid.Column mobile={16} tablet={4} computer={4}>
            <ProblemDescription problem={problem}  />
            <TagGroup tags={tags} chooseTag={chooseTag} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default ProblemDetail;
