# Seba-lab

## How to setup

- install node latest version & clone repo
- run `npm install` in root directory and in frontend

## Environment variables

When you add a new environment variable, please include it in the table below.

### backend

Create a `.env` file in root directory and add the following envs.

| key        | example                            |
| ---------- | ---------------------------------- |
| PORT       | 3003                               |
| MONGO_URI  | mongodb://localhost:27017/seba-lab |
| JWT_SECRET | sosecure2020                       |
| NODE_ENV   | dev                                |

## How to dev

In root directory:

- `npm run dev` to start both frontend and backend
- `npm run server` to start backend
- `npm run client` to start frontend

## run redis

run redis with brew on macOS:

install redis vis brew:

- `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

## install redis and start it

install redis and start it:

- `brew install redis`
- `brew services start redis`

test redis service:

- `redis-cli ping`

## run redis on windows

- Redis for Windows repo: https://github.com/MicrosoftArchive/redis/releases
- Download the 'Redis-x64-xxx.zip' file. ( do not download the 'source code' zip)
- Unzip the file
- In the newly created folder, run redis-server.exe
- You should see a window appear that says redis is running on port 6379.

### frontend library

https://material-ui.com/

Customize components: https://material-ui.com/styles/basics/
