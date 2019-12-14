# DoggoWorld

SJSU Fall 2019 CS160 Term Project  

A social network platform for dogowners to interact and meetup for events. A 3-tier web application built with ReactJS, Node.JS, Express, Socket.io, and MySQL.

## How to Run

### Install Prerequisites

> #### Node.JS
>
> Go to the [official website](https://nodejs.org/en/) of Node.JS to download it for your environment.  
> Select Version 10.16.3 for optimal compatibility.
>
> #### MySQL Community Server
>
> Download MySQL from [here](https://dev.mysql.com/downloads/mysql/).  
> Follow the setup files to install MySQL, keep note of the username and password.  
> The database connector library does not support a few of the new features in version 8.x.x, and requires the password of your user to be reverted to 5.7.x format. So enter MySQL in command line or bash with the command:
>
> ```
> mysql -u [username] -p
> ```
>
> When inside MySQL, run the following command:
>
> ```
> SET PASSWORD FOR 'username'@'localhost' = OLD_PASSWORD('password');
> ```
>
> This should resolve all issues with the DB connector library.

### Setup this project

> - `git clone` this repo into your local directory
> - `cd` into `backend` directory and run - `npm install`
> - `cd` into `react_app` directory and run - `npm install`
> - open code editor to `backend\modules\database.js`
>   - modify the `"root"` and `"password"` fields to your MySQL username and password
> - Create a database in MySQL named `doggoworld`
>
> *Database tables will be auto generated when the backend is started.*   
> 
> The backend is powered by an ExpressJS framework and runs on port 5000.  
> The frontend is powered by React and runs on port 3000.

### Environment Variables

> For the backend modules to properly function, an environment variable have to be set:
>
> - `dw_jwtPrivateKey`
>   
> `dw_jwtPrivateKey` will be the private key for [Json Web Tokens](https://jwt.io/) to be generated. We will be using JWT Tokens as part of the request respose cycle by authenticating and authorizing users.
> 
> The way to set environment variables differ between platforms and interface.  
> **_Only the terminal running the backend needs to set its env_var._**
>
> ```
> // Windows CMD
> > set dw_jwtPrivateKey="value"
>
> // Windows Powershell
> > $env:dw_jwtPrivateKey="value"
>
> // Mac/Linux Bash Shell
> > export dw_jwtPrivateKey="value"
> ```

### Running the Project

> - Open 2 terminals for each of the applications
> - Run the `backend` with command - `node app`
> - Run the `react_app` with command - `npm start`
>
> If successful, the 2 terminals should display the following:
>
> ```
> // React App
> > npm start
>
> Compiled with warnings.
> ...
> ...
> Search for the keywords to learn more about each warning.
> To ignore, add // eslint-disable-next-line to the line before.
> ```
>
> ```
> // Backend
> > node app
>
> DoggoWorld listening on port 5000
> Executing (default): SELECT 1+1 AS result
> database connected
> All models synced to tables
> ```
>
> Using a web browser, go to <localhost:3000> and start playing around with our app!
>
> **Note:** Due to major browsers (Chrome, Safari) only allowing secure websockets ( `wss://` ) but not insecure ones (`ws://`), [**Firefox**](https://www.mozilla.org/en-US/firefox/) is the only browser we've tested that works with full compatibility.


## Built With

- [React](https://reactjs.org/) - UI framework
- [Semantic UI](https://react.semantic-ui.com/) - Opinionated CSS library/framework
- [Bootstrap](https://getbootstrap.com/) - Utility CSS library
- [Node.js](https://nodejs.org/en/) - Backend runtime environment
- [Express](https://expressjs.com/) - Backend web framework
- [Socket.io](https://socket.io/) - Real-time event-based communication library
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) - Database server


## Authors

* **Rick Li** -  [Github](https://github.com/rickdiculousli)
* **Han Kang** - [Github](https://github.com/Hankang0321)
* **Alex Collado** - [Github](https://github.com/alexaac14)

## Acknowledgements
- Professor Jahan Ghofranih - for providing a great opportunity to learn industry practices with hands on application.
