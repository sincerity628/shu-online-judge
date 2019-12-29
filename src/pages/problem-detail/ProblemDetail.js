import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Menu } from 'semantic-ui-react';
import ProblemContent from '../../components/problem/ProblemContent';
import ProblemDescription from '../../components/problem/ProblemDescription';
import TagGroup from '../../components/TagGroup';
import api from '../../tools/api';
import './problem-detail.css';

const ProblemDetail = (props) => {
  const history = useHistory();

  const [activeItem, setActiveItem] = useState('题面');
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
      <h1>{ problem.title }</h1>
      <Menu secondary>
        <Menu.Item
          name="题面"
          active={ activeItem === '题面' }
          onClick={ () => setActiveItem('题面') }
          />
        <Menu.Item
          name="提交"
          active={ activeItem === '提交' }
          onClick={ () => setActiveItem('提交') }
         />
      </Menu>

      { activeItem === '题面'? (
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={11} computer={11}>
              <ProblemContent problem={problem} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={5} computer={5}>
              <ProblemDescription problem={problem}  />
              <TagGroup tags={tags} chooseTag={chooseTag} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={11} computer={11}>
              <div>code form</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <div>submission</div>
      ) }

    </div>
  );
}

export default ProblemDetail;
