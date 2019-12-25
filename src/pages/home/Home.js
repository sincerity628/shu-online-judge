import React, { useState, useEffect } from 'react';
import { Grid, Input } from 'semantic-ui-react';
import ProblemTable from '../../components/ProblemTable';
import api from '../../tools/api';
import './home.css';

const Home = () => {
  const [problems, setProblems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [tags, setTags] = useState([]);
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
    }, [page]);

  return (
    <div className="home">
      <h1>Home</h1>

      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={12} computer={12}>
            <div>
              <form className="search-input">
                <Input icon="search" placeholder="search..."
                  value={searchText} onChange={e => setSearchText(e.target.value)} />
              </form>
              <ProblemTable problems={problems} />
            </div>
          </Grid.Column>

          <Grid.Column mobile={16} tablet={4} computer={4}>
            <div>
              <h4>announce</h4>
              <h4>tags</h4>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Home;
