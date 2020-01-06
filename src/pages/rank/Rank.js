import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';
import { UIContext } from '../../contexts/UIContext';
import RankTable from '../../components/rank/RankTable';
import BarChart from '../../components/data-visualization/BarChart';
import api from '../../tools/api';
import './rank.css';

const initData = {
  labels: ['becca', 'fei', 'jasmine', 'merlin', 'chen', 'yu'],
  datasets: [{
    label: 'Accept',
    data: [14, 13, 12, 10, 9, 8, 3],
    backgroundColor: 'rgba(139, 228, 227, 0.63)',
    borderColor: 'rgba(139, 228, 227, 1)',
    borderWidth: 1,
    hoverBoderWidth: 3
  }, {
    label: 'Submission',
    data: [20, 20, 20, 15, 18, 20],
    backgroundColor: 'rgba(228, 78, 68, 0.63)',
    borderColor: 'rgba(228, 78, 68, 1)',
    borderWidth: 1,
    hoverBoderWidth: 3
  }]
};

const options = {

};

const Rank = () => {
  const history = useHistory();
  const { toggleDimmer } = useContext(UIContext);

  const [ranks, setRanks] = useState(false);
  const [data, setData] = useState(initData);
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

    const getRankData = (list) => {
      console.log(list);
      let user = [];
      let accept = [];
      let total = [];
      for(let i = 0; i < 10; i++) {
        user.push(list[i].username);
        accept.push(list[i].acCount);
        total.push(list[i].submitCount);
      }
      setData({
        labels: user,
        datasets: [{
          label: 'Accept',
          data: accept,
          backgroundColor: 'rgba(139, 228, 227, 0.63)',
          borderColor: 'rgba(139, 228, 227, 1)',
          borderWidth: 1,
          hoverBoderWidth: 3
        }, {
          label: 'Total',
          data: total,
          backgroundColor: 'rgba(228, 78, 68, 0.63)',
          borderColor: 'rgba(228, 78, 68, 1)',
          borderWidth: 1,
          hoverBoderWidth: 3
        }]
      });
    };

    api
      .getRank({
        page: page - 1,
        size: size
      })
      .then(res => {
        if(res.status === 200) {
          getRankData(res.data.list);
          setDimmer(false);
          setRanks(res.data.list);
          countTotalPages(res.data.total);
        }
      })
      .catch(error => {
        setDimmer(false);
        history.push('/not-signin');
      })
  }, [history, page, size]);

  const handlePageChange = (e, { activePage }) => {
    setPage(activePage);
  };

  return (
    <div className="rank">
      <h1>Rank</h1>
      <BarChart data={data} options={options} />
      <RankTable ranks={ranks} />
      <div className="rank-pagination">
        <Pagination
          siblingRange={1}
          activePage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Rank;
