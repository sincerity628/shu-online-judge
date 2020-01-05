import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UIContext } from '../../contexts/UIContext';
import RankTable from '../../components/rank/RankTable';
import api from '../../tools/api';

const Rank = () => {
  const history = useHistory();
  const { toggleDimmer } = useContext(UIContext);

  const [ranks, setRanks] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(20);
  const [dimmer, setDimmer] = useState(false);

  useEffect(() => {
    toggleDimmer(dimmer);
  }, [toggleDimmer, dimmer]);

  useEffect(() => {
    setDimmer(true);
    const countTotalPages = (total) => {
      if(total % size === 0) {
        setTotalPages(total / size);
      } else {
        setTotalPages(Math.floor(total / size) + 1);
      }
    };
    api
      .getRank({
        page: page - 1,
        size: size
      })
      .then(res => {
        console.log(res);
        if(res.status === 200) {
          setDimmer(false);
          setRanks(res.data.list);
          countTotalPages(res.data.total);
        }
      })
      .catch(error => {
        console.log(error);
        setDimmer(false);
        history.push('/not-signin');
      })
  }, []);
  return (
    <div className="rank">
      <h1>Rank</h1>
      <RankTable ranks={ranks} />
    </div>
  );
}

export default Rank;
