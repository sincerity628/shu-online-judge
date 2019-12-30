import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Menu, Message } from 'semantic-ui-react';
import ProblemContent from '../../components/problem/ProblemContent';
import ProblemDescription from '../../components/problem/ProblemDescription';
import TagGroup from '../../components/TagGroup';
import CodeForm from '../../components/problem/CodeForm';
import ResultTable from '../../components/problem/ResultTable';
import { UIContext } from '../../contexts/UIContext';
import api from '../../tools/api';
import './problem-detail.css';

const initError = {
  isError: false,
  content: ''
};

const ProblemDetail = (props) => {
  const history = useHistory();
  const { toggleDimmer } = useContext(UIContext);

  const [activeItem, setActiveItem] = useState('题面');
  const [problem, setProblem] = useState({});
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(initError);
  const [result, setResult] = useState(null);
  const [dimmer, setDimmer] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    toggleDimmer(dimmer);
  }, [toggleDimmer, dimmer]);

  useEffect(() => {
    setDimmer(true);
    api
      .getProblem(props.match.params.id)
      .then(res => {
        if(res.status === 200) {
          console.log(res.data);
          setDimmer(false);
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

  const submitCode = (result) => {
    setBtnLoading(true);
    result.id = props.match.params.id;
    api
      .createSubmission(result)
      .then(res => {
        if(res.status === 200) {
          setBtnLoading(false);
          setResult(res.data);
        } else {
          setBtnLoading(false);
          setError({
            isError: true,
            content: '系统错误'
          });
        }
      })
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
            <Grid.Column mobile={16} tablet={16} computer={16}>
              { error.isError && (
                <Message negative>
                  <Message.Header>提交失败</Message.Header>
                  <p>{ error.content }</p>
                </Message>
              ) }
              <CodeForm submitCode={submitCode} btnLoading={btnLoading}
                setError={setError} />

              { result && <ResultTable result={result} /> }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <h5>submmit</h5>
      ) }

    </div>
  );
}

export default ProblemDetail;
