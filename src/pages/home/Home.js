import React, { useState, useEffect } from 'react';
import { Grid, Input, Pagination, Dimmer } from 'semantic-ui-react';
import ProblemTable from '../../components/home/ProblemTable';
import Announcement from '../../components/home/Announcement';
import TagGroup from '../../components/home/TagGroup';
import api from '../../tools/api';
import './home.css';

const Home = () => {
  const [problems, setProblems] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [tags, setTags] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchTag, setSearchTag] = useState('');
  const [maskActive, setMaskActive] = useState(false);

  useEffect(() => {
    // mask on
    setMaskActive(true);
    api
      .getProblems({
        page: page - 1,
        size: 20,
        title: searchText,
        tags: searchTag
      })
      .then(res => {
        if(res.status === 200) {
          // mask off
          setMaskActive(false);
          setProblems(res.data.list);
          setTotal(res.data.total);
        } else {
          // failed get the problems
          // mask off
          setMaskActive(false);
        }
      })
  }, [page, searchText, searchTag]);

  // get the tags & announcements
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
    }, [tags]);

    const chooseTag = (id) => {
      setSearchTag(id);
    }

    const handlePageChange = (e, { activePage }) => {
      console.log(activePage);
      setPage(activePage);
    }

  return (
    <div className="home">
      <Dimmer active={maskActive} page inverted> </Dimmer>
      <Grid columns={2}>
        <Grid.Row>

          <Grid.Column mobile={16} tablet={12} computer={12}>
            <Input className="search-input" icon="search"
              placeholder="search..." value={searchText}
              onChange={e => setSearchText(e.target.value)} />

            <ProblemTable problems={problems} />

            <div className="home-pagination">
              <Pagination
                siblingRange={1}
                activePage={page}
                totalPages={Math.floor(total / 20) + 1}
                onPageChange={handlePageChange}
                />
            </div>

          </Grid.Column>

          <Grid.Column mobile={16} tablet={4} computer={4}>
            <div>
              <Announcement announcements={announcements} />
              <TagGroup tags={tags} chooseTag={chooseTag} />
            </div>
          </Grid.Column>

        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Home;
