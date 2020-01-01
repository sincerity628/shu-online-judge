import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';
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
      .getContests()
      .then(res => {
        if(res.status === 200) {
          setDimmer(false);
          setContests(res.data.list);
          countTotalPages(res.data.total);
        }
      })
      .catch(error => {
        console.log('asd');
        setDimmer(false);
        history.push('/not-signin');
      })

  }, [history, size]);
  return (
    <div className="contests">
      <h1>Contests</h1>
      <ContestTable contests={contests} />
    </div>
  );
}

export default Tests;
