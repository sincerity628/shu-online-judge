import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UIContext } from '../../contexts/UIContext';
import { Grid, Input, Pagination } from 'semantic-ui-react';
import ProblemTable from '../../components/home/ProblemTable';
import Announcement from '../../components/home/Announcement';
import TagGroup from '../../components/home/TagGroup';
import api from '../../tools/api';
import './home.css';

const Home = () => {
  const history = useHistory();
  const { toggleDimmer } = useContext(UIContext);

  const [problems, setProblems] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [tags, setTags] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchTag, setSearchTag] = useState('');

  useEffect(() => {
    const getProblems = () => {
      toggleDimmer(true);

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
              toggleDimmer(false);
              setProblems(res.data.list);
              setTotal(res.data.total);
            } else {
              toggleDimmer(false);
            }
          }
        })
        .catch(error => {
          history.push('/internet-error');
        })
    }

    let unmounted = false;
    getProblems();
    return () => { unmounted = true; };
  }, [history, page, searchTag, searchText]);

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
