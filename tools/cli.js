import GithubOrgStats from '../src/GithubOrgStats';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_ORGANIZATION = process.env.GITHUB_ORGANIZATION || 'grommet';

const githubOrgStats = new GithubOrgStats(GITHUB_TOKEN, GITHUB_ORGANIZATION);

githubOrgStats.get().then(result => console.log(result));