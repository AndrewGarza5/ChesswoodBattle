# Dependencies

Postman: https://www.postman.com/downloads/

Node & NPM: https://nodejs.org/en/download/https://nodejs.org/en/download/

express 4.17.1 | npm install express --save

nodemon 2.0.15 | npm i nodemon -D

mongoose | npm install mongoose

.env  | npm i dotenv

Axios | npm i axios

UUID | npm i uuid

# Helpful links
Mongoosejs docs for queries | https://mongoosejs.com/docs/queries.html

# Games that we will create

# Things to change when pushing to prod

- use the socket.io.min.js bundle, which is an optimized build excluding the debug package. As opposed to socket.io.js
- /scripts/socket_io.js has server address
- all endpoint paths in routes
- all script api calls

# THINGS I HAVE LEARNED!!!

Working on this has been an absolute headache. I make 10 minutes of progress, hit a wall, and then get stuck for hours trying to figure
out a tiny annoying problem. I just want to write some of the problems and solutions down for future reference.

### CORS...

CORS has held me down for a week, and even in projects before that CORS has been a problem that I never figured out.
But after reading dozens of articles and stack overflow posts I have learned what it is and how to fix it.
CORS in of itself is a feature in servers/APIs that restricts who can access it for security reasons. 
Only services that are on the same ip and port can access it. So, if I have an API on localhost:5000, only services on
localhost:5000 can access this API. Which is sort of silly, because why would a service be limited to invoking itself???
Not only does it limit WHO can access, but what kind of methods can access it. I had trouble with POST calls for too long.
You can change this though with the "Access-Control-Allow-_____" header values.There are three main ones: 
Access-Control-Allow-Origin, 
Access-Control-Allow-Headers, 
and Access-Control-Allow-Methods.
By setting these values you can modify who has access to your API. This is the setup:
In your express middleware add this
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://yourOrigin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
  });

alternatively, you can set 'http://yourOrigin' to '*' which just allows everyone to access it. These 6 lines was all I needed
for hours of frustration.

### JavaScript map
A nifty way to apply a function to every value in an array and get the resulting array, which seems super useful. Especially with JSON
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
