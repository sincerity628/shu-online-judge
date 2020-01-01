import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Pagination, Input } from 'semantic-ui-react';
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
          console.log(res.data);
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

  return (
    <div className="contests">
      <h1>Contests</h1>
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
      <ContestTable contests={contests} />
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
