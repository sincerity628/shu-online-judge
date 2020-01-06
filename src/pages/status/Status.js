import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';
import SubmissionTable from '../../components/submission/SubmissionTable';
import { UIContext } from '../../contexts/UIContext';
import "./status.css";
import api from '../../tools/api';

const Status = () => {
  const history = useHistory();
  const { toggleDimmer } = useContext(UIContext);

  const [submissions, setSubmissions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
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
    };

    setDimmer(true);
    api
      .getSubmissions({
        page: page - 1,
        size: size,
        isPratice: true
      })
      .then(res => {
        if(res.status === 200) {
          setDimmer(false);
          document.documentElement.scrollTop = document.body.scrollTop = 0;
          setSubmissions(res.data.list);
          countTotalPages(res.data.total);
        } else {
          setDimmer(false);
        }
      })
      .catch(error => {
        history.push('/not-signin');
      })
  }, [page, size, history]);

  const handlePageChange = (e, { activePage }) => {
    setPage(activePage);
  };

  return (
    <div className="status">
      <h1>Status</h1>
      <SubmissionTable submissions={submissions} contest={false} />
      <div className="status-pagination">
        <Pagination
          siblingRange={1}
          activePage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <div onClick={() => setSize(20)}></div>
    </div>
  );
}

export default Status;
