# team-project-care-pets

## Installation

Requirements:

- [Node v16+](https://nodejs.org/en/download/)
- [MongoDB](mongodb.com)
- [Cloudinary account](https://cloudinary.com/)

Before starting the backend server, configure the environment variables in the
directory `backend\config\.env` according to `.env.example` |Key|Value|
|---|---| |PORT|Running the backend server port| |CONNECT_DB_URI|Your connection
string to DB| |SECRET_JWT|Random string for creating jwt token|
|CLOUDINARY_API_KEY|Access key to cloudinary| |CLOUDINARY_API_SECRET|Secret to
api key|

Install the dependencies and devDependencies and start the backend server.

```sh
npm i
npm start
```

Open second Terminal. Install the dependencies and devDependencies and start the
frontend server.

```sh
cd frontend
npm i
npm start
```

## Development

Want to contribute? Great!

Open your favorite Terminal and run these commands.

First Tab:

```sh
npm run back
```

Second Tab:

```sh
npm run dev
```

1.  <!-- Team Soul kitchen project -->
