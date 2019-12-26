import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Input, Pagination, Dimmer } from 'semantic-ui-react';
import ProblemTable from '../../components/home/ProblemTable';
import Announcement from '../../components/home/Announcement';
import TagGroup from '../../components/home/TagGroup';
import api from '../../tools/api';
import './home.css';

const Home = () => {
  const history = useHistory();

  const [problems, setProblems] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [tags, setTags] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchTag, setSearchTag] = useState('');
  const [maskActive, setMaskActive] = useState(false);

  useEffect(() => {
    let unmounted = false;
    setMaskActive(true);
    api
      .getProblems({
        page: page - 1,
        size: 20,
        title: searchText,
        tags: searchTag
      })
      .then(res => {
        if(!unmounted) {
          if(res.status === 200) {
            setMaskActive(false);
            setProblems(res.data.list);
            setTotal(res.data.total);
          } else {
            setMaskActive(false);
          }
        }
      })
      .catch(error => {
        history.push('/internet-error');
      })

      return () => { unmounted = true; };
  }, [page, searchText, searchTag, history]);

  // get the tags & announcements
  useEffect(() => {
    let unmounted = false;
    api
      .getTags()
      .then(res => {
        if(!unmounted) {
          if(res.status === 200) {
            setTags(res.data);
          }
        }
      })

    api
      .getAllAnnouncements()
      .then(res => {
        if(!unmounted) {
          if(res.status === 200) {
            setAnnouncements(res.data);
          }
        }
      })

    return () => { unmounted = true; };
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
      <Dimmer active={maskActive} page inverted></Dimmer>
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
