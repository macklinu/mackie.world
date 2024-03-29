---
date: '2017-05-20'
title: 'npm pack --dry-run'
description: 'Have you ever wondered, "Where do my files go when I publish a package to npm?"'
---

Have you ever wondered, "Where do my files go when I publish a package to npm?"
I have. I recently learned about [`npm pack`][npm-pack]. According to the
[`npm publish`][npm-publish] documentation:

> For a "dry run" that does everything except actually publishing to the
> registry, see [`npm pack`][npm-pack], which figures out the files to be
> included and packs them into a tarball to be uploaded to the registry.

From the root of your repository, run `npm pack` to generate a tarball. You can
run `tar -ztf <name>-<version>.tgz` on Unix systems to view the files in the
resulting tarball. Here's an example from a Node module of mine,
[danger-plugin-jira-issue][danger-plugin-jira-issue].

```shell
❯ tar -ztf danger-plugin-jira-issue-0.0.0-development.tgz
package/package.json
package/README.md
package/LICENSE.md
package/dist/index.js
package/types/index.d.ts
```

This is useful for ensuring that you are uploading the necessary files to be
consumed by users of your Node module, or that you aren't shipping unnecessary
files like tests, documentation, or dot files.

If you want to remove some of those unneeded files, add the ["files"][files]
field to your `package.json` to control exactly what you'll ship. An example
from danger-plugin-jira-issue's `package.json`:

```json title="package.json"
{
  "files": ["dist", "types/index.d.ts"]
}
```

[danger-plugin-jira-issue]: https://github.com/macklinu/danger-plugin-jira-issue
[files]: https://docs.npmjs.com/files/package.json#files
[npm-pack]: https://docs.npmjs.com/cli/pack
[npm-publish]: https://docs.npmjs.com/cli/publish
