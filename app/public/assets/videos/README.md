# videos/ — out of git on purpose

Raw captures live here and are **not versioned**. The whole folder is in `.gitignore`;
`README.md` is the only file in it that git tracks.

GitHub rejects any single file over 100 MB, and a 157 MB screen recording is what stopped a
push on 2026-09-22. The rule that came out of it:

- **Delivered creatives stay in git.** They are the work product, they are small — the largest
  is under 11 MB — and `/meta-ads · Our creations` reads them off disk.
- **Raw captures do not.** Screen recordings, camera rushes, anything that exists so a still
  can be cut out of it. They belong here, and what goes into git is the still.

The app still serves this folder at `/assets/videos/…` locally, so a raw file can be watched
and scrubbed on this machine. A fresh clone will not have it — that is the trade, and it is
the right one for a file nobody is going to diff.

Back up what is in here somewhere that is not a git repo.
