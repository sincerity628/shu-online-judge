import React, { useState, useEffect, useContext } from 'react';
import SubmissionTable from '../../components/submission/SubmissionTable';
import { UIContext } from '../../contexts/UIContext';
import api from '../../tools/api';

const Status = () => {
  const { toggleDimmer } = useContext(UIContext);
  const [submissions, setSubmissions] = useState([]);
  const [dimmer, setDimmer] = useState(false);

  useEffect(() => {
    toggleDimmer(dimmer);
  }, [toggleDimmer, dimmer]);

  useEffect(() => {
    setDimmer(true);
    api
      .getSubmissions({
        page: 0,
        size: 20,
        isPratice: true
      })
      .then(res => {
        if(res.status === 200) {
          setDimmer(false);
          console.log(res);
        } else {
          setDimmer(false);
        }
      })
  }, []);
  
  return (
    <div className="status">
      <h1>Status</h1>

    </div>
  );
}

export default Status;
