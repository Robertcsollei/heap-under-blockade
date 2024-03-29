# MERN template project

## disclaimer
This is a school project based on a template provided in the assignment.

## Introduction
This project is a template for building full-stack JavaScript applications running on node.js. The technology stack is as follows:
- **React** for the front-end, bootstrapped with "Create React App".
- **express.js** for the server
  - serves the React app 
  - provides the JSON API for the React app using http

MongoDB is not used in this template but can be easily integrated into the server app.

The app is fully deployable to any PaaS like Heroku or AWS Elastic Beanstalk that understands how to build and run projects with a **package.json** file. 

## Commands
The package.json provides all the commands needed to test and run this application.
- **npm run install** install all dependencies for the server and the client.
- **npm run build** builds the React app so it can be served by the server.
- **npm start** starts the server which provides the API and serves the react app.
- **npm run react-dev** is for starting the React app in development mode on http://localhost:3000. This requires that the API server is already running on port 8080

## Development
Use this template to build your own apps. Since the React app is build using Create React App, you can easily update the React version.

During development of the React app, use **npm run react-dev** or simply navigate to the client folder and run **npm start**. Keep the server running as well. 

If you want reload-functionality for the server code, I recommend using something like [nodemon](https://www.npmjs.com/package/nodemon). You can then navigate to the server folder and start it using **nodemon src/index.js**. 

Before deploying, build and start the app, and test that everything works on http://localhost:8080. The react app should open when you visit http://localhost:8080 in the browser, and the API should be available on http://localhost:8080/api/.

## Configuration
The app opens on port 8080 by default. If the environment variable **PORT** is set, that port will be used instead.

In production mode, the React app expects to find the API on the same port as itself on the `/api` path. In development mode, the React app expects to find the api on http://localhost:8080/api/ instead. This has been defined in the two React `.env` files.

## Server implementation
It's worth noting that a tricks is used in the server implementation to concurrently serve the API and the React app from the same server app.

By default, when the express.js server receives a request, it tries to match it with one of the API routes. If none matches, it serves the React index.html file instead. This enables client-side routing in the React app (with React Router or similar library) without overriding the server API.

Relevant server code (from server.js):
```js
  // "Redirect" all non-API GET requests to React's entry point (index.html)
  app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
  );
```
