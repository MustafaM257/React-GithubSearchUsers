import React, { useState, useEffect } from 'react';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: '' });

  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);

    try {
      const response = await axios(`${rootUrl}/users/${user}`);
      const { login, followers_url } = response.data;

      setGithubUser(response.data);

      const [reposResponse, followersResponse] = await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ]);

      const status = 'fulfilled';

      if (reposResponse.status === status) {
        setRepos(reposResponse.value.data);
      }

      if (followersResponse.status === status) {
        setFollowers(followersResponse.value.data);
      }
    } catch (error) {
      toggleError(true, 'There is no user with that username');
    }

    checkRequests();
    setIsLoading(false);
  };

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, 'Sorry, you have exceeded your hourly rate limit');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function toggleError(show = false, msg = '') {
    setError({ show, msg });
  }

  useEffect(() => {
    checkRequests();
    searchGithubUser('MustafaM257'); // initially
  }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
