# github-org-stats

:warning: do not use this yet. this is a work in progress.

Gather statistics for your github organization

### Install

```
npm install github-org-stats
```

or

```
yarn add github-org-stats
```

### Usage

```js
import GithubOrgStats from 'github-org-stats';

const githubOrgStats = new GithubOrgStats(GITHUB_TOKEN, GITHUB_ORGANIZATION);

githubOrgStats.get().then(result => console.log(result));
```

For now `.get` only returns:

```json
{
  "totalStars": 3084,
  "repos": [ { "name": "grommet", "stars": 2543 } ],
}
```
