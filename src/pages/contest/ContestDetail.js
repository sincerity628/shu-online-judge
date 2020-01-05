import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Menu, Table, Label, Grid, Message, Pagination } from 'semantic-ui-react';
import { UIContext } from '../../contexts/UIContext';
import ProblemTable from '../../components/home/ProblemTable';
import ProblemDescription from '../../components/problem/ProblemDescription';
import ProblemContent from '../../components/problem/ProblemContent';
import CodeForm from '../../components/problem/CodeForm';
import ResultTable from '../../components/problem/ResultTable';
import SubmissionTable from '../../components/submission/SubmissionTable';
import CountDown from '../../components/contest/CountDown';
import api from '../../tools/api';
import './contest.css';

const initError = {
  isError: false,
  content: ''
};

const ContestDetail = (props) => {
  const history = useHistory();
  const { toggleDimmer, toggleDimmerMsg, toggleInverted } = useContext(UIContext);

  const [contest, setContest] = useState({});
  const [problems, setProblems] = useState([]);
  const [isChose, setIsChose] = useState(false);
  const [choseProblemId, setChoseProblemId] = useState('');
  const [choseProblem, setChoseProblem] = useState({});
  const [activeItem, setActiveItem] = useState('考试信息');

  const [error, setError] = useState(initError);
  const [btnLoading, setBtnLoading] = useState(false);
  const [result, setResult] = useState({});

  const [mySubmissions, setMySubmissions] = useState([]);
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [rank, setRank] = useState([]);

  const [submissionPage, setSubmissionPage] = useState(0);
  const [submissionTotalPages, setSubmissionTotalPages] = useState(0);
  const [size, setSize] = useState(20);

  const [dimmer, setDimmer] = useState(false);
  const [inverted, setInverted] = useState(true);
  const [dimmerMsg, setDimmerMsg] = useState({});
  const [errorMsg, setErrorMsg] = useState('');


  useEffect(() => {
    toggleDimmer(dimmer);
  }, [toggleDimmer, dimmer]);

  useEffect(() => {
    toggleInverted(inverted);
  }, [toggleInverted, inverted]);

  useEffect(() => {
    toggleDimmerMsg(dimmerMsg);
  }, [toggleDimmerMsg, dimmerMsg]);

  useEffect(() => {
    let unmounted = false;
    setDimmer(true);
    api
      .getContest(props.match.params.id)
      .then(res => {
        if(!unmounted && res.status === 200) {
          setDimmer(false);
          setContest(res.data);
        }
      })
      .catch(error => {
        if(!unmounted && error.data.code === -4) {
          setDimmerMsg({
            isShow: true,
            content: '比赛不可加入'
          });
          setInverted(false);

          setTimeout(() => {
            history.push('/contests');
            setInverted(true);
            setDimmerMsg({
              isShow: false,
              content: ''
            });
            setDimmer(false);
          }, 2000);
        }
      })
    return () => unmounted = true;
  }, [props, history, activeItem]);

  useEffect(() => {
    let unmounted = false;
    setDimmer(true);
    api
      .getContestProblems(props.match.params.id)
      .then(res => {
        if(!unmounted && res.status === 200) {
          setDimmer(false);
          setProblems(res.data);
        }
      })
      .catch(error => {
        if(!unmounted &&
          error.status === 400 &&
          error.data.code === -3) {
          // the contest is not started yet
          setDimmer(false);
          setErrorMsg(error.data.message);
        }
      })
    return () => unmounted = true;
  }, [props, activeItem]);

  useEffect(() => {
    let data = {
      contestId: props.match.params.id,
      problemId: choseProblemId
    };
    if(isChose) {
      api
        .getContestSubmission(data)
        .then(res => {
          if(res.status === 200) {
            setMySubmissions(res.data);
          }
        })
    }
  }, [props, isChose, choseProblemId]);

  useEffect(() => {
    const countTotalPages = (total) => {
      if(total % size === 0) {
        setSubmissionTotalPages(total / size);
      } else {
        setSubmissionTotalPages(Math.floor(total / size) + 1);
      }
    };
    let unmounted = false;
    setDimmer(true);
    api
      .getContestSubmissions({
        contestId: props.match.params.id,
        page: 0,
        size: 20
      })
      .then(res => {
        if(!unmounted && res.status === 200) {
          setDimmer(false);
          setAllSubmissions(res.data.list);
          countTotalPages(res.data.total);
        }
      })

    return () => unmounted = true;
  }, [props, activeItem, size]);

  const transTypeToText = (type) => {
    switch(type) {
      case 'PUBLIC':
        return '公开赛';
      case 'SECRET_WITH_PASSWORD':
        return '私密可加入';
      case 'SECRET_WITHOUT_PASSWORD':
        return '不可加入';
      default:
        return '';
    }
  };

  const transStatusToText = (status) => {
    switch(status) {
      case 'NOT_STARTED':
        return '即将开始';
      case 'PROCESSING':
        return '正在进行';
      case 'ENDED':
        return '已结束';
      default:
        return '';
    }
  };

  const getChoseProblem = (id) => {
    setDimmer(true);
    api
      .getContestProblem(props.match.params.id, id)
      .then(res => {
        if(res.status === 200) {
          setDimmer(false);
          setChoseProblem(res.data);
        }
      })
  };

  const chooseProblem = (id) => {
    setChoseProblemId(id);
    setIsChose(true);
    getChoseProblem(id);
    setActiveItem('');
  };

  const submitCode = (commit) => {
    setBtnLoading(true);
    commit.contestId = props.match.params.id;
    commit.problemId = choseProblemId;
    api
      .createContestSubmission(commit)
      .then(res => {
        if(res.status === 200) {
          setBtnLoading(false);
          setResult(res.data);
        }
      })
      .catch(error => {
        if(error.status === 400 && error.data.code === -6) {
          setBtnLoading(false);
          setError({
            isError: true,
            content: error.data.message
          });
        } else if(error.status === 400 && error.data.code === -3) {
          setBtnLoading(false);
          setError({
            isError: true,
            content: error.data.message
          });
        } else {
          setBtnLoading(false);
        }
      })
  };

  const handleSubmissionPageChange = (e, { activePage }) => {
    setSubmissionPage(activePage);
  };

  return (
    <div className="contest-detail">
      <h1>{ contest.name }</h1>
      <Menu secondary>
        <Menu.Item
          name="考试信息"
          active={activeItem === '考试信息'}
          onClick={() => {
            setActiveItem('考试信息');
            setChoseProblemId('');
            setIsChose(false);
            setError(initError);
            setResult(null);
          }}
        />
        <Menu.Item
          name="排名情况"
          active={activeItem === '排名情况'}
          onClick={() => {
            setActiveItem('排名情况');
            setChoseProblemId('');
            setIsChose(false);
            setError(initError);
            setResult(null);
          }}
        />
        <Menu.Item
          name="所有提交"
          active={activeItem === '所有提交'}
          onClick={() => {
            setActiveItem('所有提交');
            setChoseProblemId('');
            setIsChose(false);
            setError(initError);
            setResult(null);
          }}
        />
        { isChose && (
          <Menu.Item
            name="我的提交"
            active={activeItem === '我的提交'}
            onClick={() => {
              setActiveItem('我的提交');
              setChoseProblemId('');
              setError(initError);
              setResult(null);
            }}
          />
        ) }
      </Menu>
      { (activeItem === '考试信息' || choseProblemId) && (
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={11} computer={11}>
            { activeItem === '考试信息' && (
              <div>
                <h4 className="part-title">描述</h4>
                <div
                  dangerouslySetInnerHTML={{ __html: contest.description }}
                ></div>
                <Table celled textAlign="center">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>#</Table.HeaderCell>
                      <Table.HeaderCell>开始时间</Table.HeaderCell>
                      <Table.HeaderCell>结束时间</Table.HeaderCell>
                      <Table.HeaderCell>状态</Table.HeaderCell>
                      <Table.HeaderCell>比赛类型</Table.HeaderCell>
                      <Table.HeaderCell>发起人</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon>1</Label>
                      </Table.Cell>
                      <Table.Cell>{ contest.createDate }</Table.Cell>
                      <Table.Cell>{ contest.endDate }</Table.Cell>
                      <Table.Cell>
                        { transStatusToText(contest.status) }
                      </Table.Cell>
                      <Table.Cell>
                        { transTypeToText(contest.contestType) }
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/profile/${contest.authorId}`}>
                          { contest.authorName }
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>

                <h4>题目列表</h4>
                { errorMsg && <div>{ errorMsg }</div> }
                <ProblemTable
                  problems={problems}
                  contest={true}
                  chooseProblem={chooseProblem}
                />
              </div>
            ) }

            { choseProblemId && (
              <div>
                <h2>{ choseProblem.title }</h2>
                <ProblemContent problem={choseProblem} />
              </div>
            ) }
            </Grid.Column>

            <Grid.Column mobile={16} tablet={5} computer={5}>
              { choseProblemId && (
                <ProblemDescription problem={choseProblem} />
              ) }
              <CountDown startTime={contest.startDate} endTime={contest.endDate} />
            </Grid.Column>
          </Grid.Row>
          { choseProblemId && (
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
          ) }
        </Grid>
      ) }

      { activeItem === '排名情况' && (
        <h1>排名情况</h1>
      ) }

      { activeItem === '所有提交' && (
        <div>
          <SubmissionTable submissions={allSubmissions} />
          <div className="contest-pagination">
            <Pagination
              siblingRange={1}
              activePage={submissionPage}
              totalPages={submissionTotalPages}
              onPageChange={handleSubmissionPageChange}
            />
          </div>
          <div onClick={() => setSize(20)}></div>
        </div>
      ) }

      { activeItem === '我的提交' && (
        <div>
          <SubmissionTable submissions={mySubmissions} />
        </div>
      ) }

    </div>
  );
}

export default ContestDetail;
