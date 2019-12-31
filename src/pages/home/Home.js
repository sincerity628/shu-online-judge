import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UIContext } from '../../contexts/UIContext';
import { Grid, Input, Pagination } from 'semantic-ui-react';
import ProblemTable from '../../components/home/ProblemTable';
import Announcement from '../../components/home/Announcement';
import TagGroup from '../../components/public/TagGroup';
import api from '../../tools/api';
import './home.css';

const Home = (props) => {
  const history = useHistory();
  const { toggleDimmer } = useContext(UIContext);

  const [problems, setProblems] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [tags, setTags] = useState([]);
  // current page
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [size, setSize] = useState(20);
  const [searchText, setSearchText] = useState('');
  const [text, setText] = useState('');
  const [searchTag, setSearchTag] = useState('');
  const [tagName, setTagName] = useState('');
  const [dimmer, setDimmer] = useState(false);

  // check tag id
  useEffect(() => {
    let path = props.match.path;
    if(path === '/tag/:id' && props.match.params.id !== 0) {
      setSearchTag(props.match.params.id);
    } else {
      setSearchTag('');
    }
  }, [props]);

  useEffect(() => {
    api
      .getTags()
      .then(res => {
        if(res.status === 200) {
          let tags = res.data;
          let tag = tags.filter(tag => tag.id === searchTag);
          if(tag[0]) {
            setTagName(tag[0].name);
          } else {
            setTagName(null);
          }
        }
      })
  }, [searchTag]);

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
    }
    const getProblems = () => {
      setDimmer(true);

      api
        .getProblems({
          page: page - 1,
          size: size,
          title: searchText,
          tags: searchTag
        })
        .then(res => {
          if(!unmounted) {
            if(res.status === 200) {
              setDimmer(false);
              setProblems(res.data.list);
              countTotalPages(res.data.total);
            } else {
              setDimmer(false);
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
  }, [history, page, searchTag, searchText, size]);

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
        if(!unmounted && res.status === 200) {
          setAnnouncements(res.data);
        }
      })

    return () => { unmounted = true; };
    }, []);

  const chooseTag = (id) => {
    setSearchTag(id);
  }

  const handlePageChange = (e, { activePage }) => {
    setPage(activePage);
  }

  return (
    <div className="home">
      <Grid columns={2}>
        <Grid.Row>

          <Grid.Column mobile={16} tablet={11} computer={11}>
            <form onSubmit={e => {
              e.preventDefault();
              setSearchText(text);
            }}>
              <Input className="search-input" icon="search"
                placeholder="输入后按回车搜索" value={text}
                onChange={e => {
                  if(e.target.value === '') {
                    setSearchText(e.target.value);
                    setText('');
                  } else {
                    setText(e.target.value)
                  }
                }} />
            </form>

            { tagName &&
              <div className="tagHolder">
                <b>{ tagName }</b>
              </div> }

            <ProblemTable problems={problems} />

            <div className="home-pagination">
              <Pagination
                siblingRange={1}
                activePage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>

          </Grid.Column>

          <Grid.Column mobile={16} tablet={5} computer={5}>
            <div>
              <Announcement announcements={announcements} />
              <TagGroup tags={tags} chooseTag={chooseTag} />
            </div>
          </Grid.Column>

        </Grid.Row>
      </Grid>
      <div onClick={() => setSize(20)}></div>
    </div>
  );
}

export default Home;
