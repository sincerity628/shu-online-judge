import React, { useState, useEffect } from 'react';
import { Grid, Input } from 'semantic-ui-react';
import ProblemTable from '../../components/home/ProblemTable';
import Announcement from '../../components/home/Announcement';
import api from '../../tools/api';
import './home.css';

const Home = () => {
  const [problems, setProblems] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [tags, setTags] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [searchTags, setSearchTags] = useState('');

  useEffect(() => {
    api
      .getProblems({
        page: page,
        size: 10,
        title: searchText
      })
      .then(res => {
        if(res.status === 200) {
          setProblems(res.data.list);
          setTotal(res.data.total);
        } else {
          // failed get the problems
        }
      })
  }, [page, searchText, searchTags]);

  useEffect(() => {
    api
      .getTags()
      .then(res => {
        if(res.status === 200) {
          setTags(res.data);
        } else {
          // failed get the tags
        }
      })
    api
      .getAllAnnouncements()
      .then(res => {
        if(res.status === 200) {
          setAnnouncements(res.data);
        } else {
          // failed get the announcements
        }
      })
    }, [page]);

  return (
    <div className="home">
      <h1>Home</h1>

      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={12} computer={12}>
            <Input className="search-input" icon="search"
              placeholder="search..." value={searchText}
              onChange={e => setSearchText(e.target.value)} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column mobile={16} tablet={12} computer={12}>
              <ProblemTable problems={problems} />
          </Grid.Column>

          <Grid.Column mobile={16} tablet={4} computer={4}>
            <div>
              <Announcement announcements={announcements} />
              <h4>tags</h4>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Home;
