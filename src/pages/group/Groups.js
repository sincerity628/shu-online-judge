import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UIContext } from '../../contexts/UIContext';
import GroupTable from '../../components/group/GroupTable';
import api from '../../tools/api';

const Groups = () => {
  const history = useHistory();
  const { toggleDimmer } = useContext(UIContext);

  const [groups, setGroups] = useState([]);
  const [dimmer, setDimmer] = useState(false);

  useEffect(() => {
    toggleDimmer(dimmer);
  }, [toggleDimmer, dimmer]);

  useEffect(() => {
    let unmounted = false;
    setDimmer(true);
    api
      .getGroups()
      .then(res => {
        if(!unmounted && res.status === 200) {
          setDimmer(false);
          setGroups(res.data);
        }
      })
      .catch(error => {
        setDimmer(false);
        history.push('/not-signin');
      })

    return () => unmounted = true;
  }, [history]);

  return (
    <div className="groups">
      <h1>Groups</h1>
      <GroupTable groups={groups} />
    </div>
  );
}

export default Groups;
