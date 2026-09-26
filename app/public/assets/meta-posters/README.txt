Poster frames for video creatives uploaded to Meta Ads through the MCP. Meta's ad creative
API requires an image (image_hash or image_url) as the cover of every video ad and fetches it
by URL, so each poster lives here at a public raw-GitHub path. Not rendered by the app: this
folder is outside assets/winkypie/ on purpose, so the posters never list as creatives.

<creative stem>_poster.png = the first plate of that creative's mp4, cut with ffmpeg at 0.5 s,
full resolution. Regenerate from the mp4 in assets/winkypie/creatives/ if the cut changes.
