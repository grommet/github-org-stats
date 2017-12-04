# github-org-stats

:warning: Do not use this yet. This is a work in progress.

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

### Potential Stats to Display
```
Ideas from @alansouzati:

1) Total number of projects
2) Total unique number of contributors
3) Stars by project
4) Contributors by project
5) Top contributors list
6) Top contributors list by project
7) Number of clones and unique clones (this view: https://github.com/grommet/grommet/graphs/traffic)
8) Number of visitors (https://github.com/grommet/grommet/graphs/traffic)
9) Referring sites (https://github.com/grommet/grommet/graphs/traffic)

Would be really, really great if we could see how these numbers evolved comparing to yesterday, 
last week, last month and last year.

Also, if we want to take it to the next level, we could talk to NPM and gather data as it shows in 
this view:
https://www.npmjs.com/package/grommet

Show info by project, as well as combined for the entire organization.
```