import Github from 'github';

export default class GithubOrgStats {

  constructor(token, org) {
    this.token = token;
    this.org = org;

    this.github = Github();
    
    this.github.authenticate({
      type: 'token',
      token: token,
    });
  }

  getOrgRepos = () => {
    return this.github.repos.getForOrg({ org: this.org, per_page: 100 });
  }

  getContributors = (repo) => {
    return this.github.repos.getContributors({ owner: this.org, repo }).then(({ data }) => {
      const contributors = data
        .map(contributor => ({ login: contributor.login, contributions: contributor.contributions }))
        .sort((a, b) => {
          return b.contributions - a.contributions;
        });
        
      return contributors;
    });
  }

  getClones = (repo) => {
    return this.github.repos.getClones({ owner: this.org, repo }).then(({ data }) => {
      return { count: data.count, uniques: data.uniques };
    });
  }

  get = () => {
    return this.getOrgRepos().then(({ data }) => {
      let repos = [];
      let promises = [];

      for (let item of data) {
        let repo = { name: item.name, stars: parseInt(item.stargazers_count, 10) };
        let info$ = this.getContributors(item.name)
          .then((contributors) => {
            repo.totalContributors = contributors.length;
            repo.commits = contributors.reduce((total, current) => total + current.contributions, 0);
            repo.contributors = contributors;
          })
          .then(() => this.getClones(item.name).then((clones) => {
            repo.clones = clones.count;
            repo.uniqueClones = clones.uniques;
            repos.push(repo);
          }));

        promises.push(info$);
      }

      return Promise.all(promises).then(() => {
        repos.sort((a, b) => b.stars - a.stars);
      
        const totalStars = repos.reduce((total, current) => total + current.stars, 0);
        const totalRepos = data.length;
        const totalContributors = repos.reduce((total, current) => total + current.totalContributors, 0);
        const totalClones = repos.reduce((total, current) => total + current.clones, 0);
        const totalCommits = repos.reduce((total, current) => total + current.commits, 0);

        return {
          totalStars,
          totalRepos,
          totalContributors,
          totalClones,
          totalCommits,
          repos,
        }
      });
  
    });
  }
}