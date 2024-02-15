<a href="https://rodis.vercel.app/">
  <img src="https://img.shields.io/github/deployments/archasion/discord-file-viewer/production?logo=vercel&label=vercel&link=https%3A%2F%2Frodis.vercel.app%2F" alt="Vercel Deployment Status"/>
</a>

# Discord File Viewer

Fetches a Discord text file by its URL and returns its content. Can be used to improve mobile accessibility by offering
a web view of a file, instead of having to download it.

| Label       | Route                           |
|-------------|---------------------------------|
| File viewer | `/files?url={ENCODED_FILE_URL}` |

## Deployment

- Deploy the development server using `bun run test` or `vercel dev`
- Deploy the production server using `bun run deploy` or `vercel --prod`