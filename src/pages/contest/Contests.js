import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Pagination, Input, Modal, Header, Button } from 'semantic-ui-react';
import md5 from 'md5';
import { UIContext } from '../../contexts/UIContext';
import ContestTable from '../../components/contest/ContestTable';
import api from '../../tools/api';
import "./contest.css";

const Tests = () => {
  const history = useHistory();
  const { toggleDimmer } = useContext(UIContext);

  const [contests, setContests] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  const [searchText, setSearchText] = useState('');
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [joinId, setJoinId] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);
  const [dimmer, setDimmer] = useState(false);

  useEffect(() => {
    toggleDimmer(dimmer);
  }, [toggleDimmer, dimmer]);

  useEffect(() => {
    const countTotalPages = (total) => {
      if(total % size === 0) {
        setTotalPages(total / size);
      } else {
        setTotalPages(Math.floor(total / size) + 1);
      }
    }

    setDimmer(true);

    api
      .getContests({
        page: page - 1,
        size: size,
        name: searchText
      })
      .then(res => {
        if(res.status === 200) {
          setDimmer(false);
          setContests(res.data.list);
          countTotalPages(res.data.total);
        }
      })
      .catch(error => {
        setDimmer(false);
        history.push('/not-signin');
      })

  }, [history, size, page, searchText]);

  const handlePageChange = (e, { activePage }) => {
    setPage(activePage);
  };

  const toggleOpen = (value ,id) => {
    setOpen(value);
    setJoinId(id);
  };

  const handlePasswordChange = e => {
    setError('');
    setSuccess('');
    setPassword(e.target.value);
  };

  const joinContest = () => {
    setBtnLoading(true);

    api
      .joinContest({
        id: joinId,
        password: md5(password)
      })
      .then(res => {
        if(res.status === 200) {
          if(res.data.message === '加入成功') {
            setBtnLoading(false);
            setSuccess('加入成功');

            setTimeout(() => {
              setOpen(false);
              history.push(`/contest/${joinId}`);
            }, 1000);
            
            setPassword('');

          } else if(res.data.message === '密码错误') {
            setBtnLoading(false);
            setError('密码错误');
          }
        }
      })
      .catch(error => {
        setBtnLoading(false);
        setError('加入失败');
      })
  };

  return (
    <div className="contests">
      <Modal
        open={open}
        basic
      >
        <Header>请输入比赛邀请密码</Header>
        <Modal.Content>
          <Input
            type="password" value={password} fluid
            onChange={handlePasswordChange}
          />
          <br />
          { success && <div>{ success }</div> }
          { error && <div>{ error }</div> }
        </Modal.Content>
        <Modal.Actions>
          <Button inverted color="red"
            onClick={() => setOpen(false)}
          >取消</Button>
          <Button inverted color="green"
            onClick={joinContest} loading={btnLoading}
          >加入比赛</Button>
        </Modal.Actions>
      </Modal>
      <form onSubmit={e => {
        e.preventDefault();
        setSearchText(text);
      }}>
        <Input
          icon="search" placeholder="输入后按回车搜索"
          value={text} className="search-input"
          onChange={e => {
            if(e.target.value === '') {
              setText('');
              setSearchText('');
            } else {
              setText(e.target.value);
            }
          }}
        />
      </form>
      <ContestTable contests={contests} toggleOpen={toggleOpen} />
      <div className="contest-pagination">
        <Pagination
          siblingRange={1}
          activePage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <div onClick={() => setSize(size)}></div>
    </div>
  );
}

export default Tests;
