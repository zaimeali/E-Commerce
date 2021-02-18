In Backend:
1) npm init
2) npm i express
3) node index.js
4) npm i nodemon
5) change in script in package.json
6) "start" => "nodemon index.js"
7) now npm start in terminal


++++++++++++++++++++++++
in mongodb cmd:
1) show dbs (for checking is db connected or not)
2) quit() to quit


=======================
## Middlewares:
1) Something in between (which is like a filter)
2) BodyParser famous middleware (It parse the request body, to handle request which comes from front-side)
3) CookieParser header and populate cookie to set cookie or check cookie
4) cors => cross origin resource sharing => outside domain then use it


==================
express-validator => for validating like middleware
jsonwebtoken => for authentication
express-jwt