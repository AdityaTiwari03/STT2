# Library Management system

**NOTE:** For usage instructions related to mini-project, see [MiniProject.md](MiniProject.md)

This is a system to manage your personal home library.

## Installation and usage (On local machine)

### Installation

1. To install, clone the git repository
> git clone git@github.com:AdityaTiwari03/STT2.git
2. Switch to directory
3. Install `npm` dependencies.
> npm install

**NOTE:** Library management system depends on `node`.

### Usage

1. Run Server
> node server.js
2. Open `http://127.0.0.1:3000/` in browser

## Installation and usage (Using docker)

### Getting Image

1. Building image

> docker build -t <image-name> .

2. From Dockerhub

> docker pull sbdaule5/library:0.0.3

### Running

1. Production server

> docker run -p 3000:3000 sbdaule5/library:0.0.3

2. Development server

> docker run -p 3000:3000 sbdaule5/library:0.0.3 node devel-server.js

### Running (Using docker compose)

1. Production server

> docker-compose up

2. Development server

> docker-compose -f docker-compose-devel.yml up

**NOTE:** 
1. While making changes to the app it is advised to clone this repository and bind mount app directory using `-v $(pwd)/app:/app`.
2. Library management system requires javascript enabled, it will not work if javascript is disabled.
