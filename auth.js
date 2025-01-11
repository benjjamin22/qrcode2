const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Middleware to parse cookies
app.use(cookieParser());
app.use(express.json());

// Port setup
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const jwt = require('jsonwebtoken'); // Use JWT for session tokens (optional)

const SECRET_KEY = 'your_secret_key'; // Replace with an environment variable in production

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validate user credentials (replace with real authentication)
    if (username === 'user' && password === 'password') {
        // Generate a token or session ID
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

        // Set an HTTP-only cookie
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict', // Prevent CSRF
        });

        return res.json({ message: 'Login successful' });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
});

const authenticateUser = (req, res, next) => {
    //const token = req.cookies.authToken;
    const token = req.headers['authorization'];
    const allowedReferrer = 'https:www.isemb.mydatabase.com.ng';
    const referrer = req.headers['referer'] || req.headers['origin'];

    if (!token && referrer && referrer.startwith(allowedReferrer)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach user info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden' });
    }
};

app.get('/protected', authenticateUser, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}!` });
});

app.post('/logout', (req, res) => {
    res.clearCookie('authToken');
    res.json({ message: 'Logged out successfully' });
});


const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json());

// Configure session middleware
app.use(
    session({
        secret: 'your_secret_key', // Replace with a strong, unique secret in production
        resave: false, // Avoid saving session if it hasn't been modified
        saveUninitialized: false, // Avoid creating empty sessions
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 1000 * 60 * 60, // 1-hour expiration
        },
    })
);

// Port setup
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validate user credentials (replace with real authentication)
    if (username === 'user' && password === 'password') {
        // Save user data in session
        req.session.user = { username };

        return res.json({ message: 'Login successful' });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
});


const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next(); // User is authenticated, proceed to the route
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};


app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out' });
        }

        res.clearCookie('connect.sid'); // Clear the session cookie
        res.json({ message: 'Logged out successfully' });
    });
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.json({ message: 'Logged out successfully' });
    });
});


const session = require('express-session');

app.use(
    session({
        secret: 'your_secret_key', // Use a strong secret
        resave: false, // Do not save the session if it hasn't changed
        saveUninitialized: false, // Do not save uninitialized sessions
        cookie: {
            httpOnly: true, // Protect against client-side script access
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 1000 * 60 * 15, // 15 minutes of idle timeout (in milliseconds)
        },
    })
);


app.get('/some-route', (req, res) => {
    // If the user is active, the session remains valid
    if (req.session.user) {
        res.json({ message: 'Session refreshed due to activity.' });
    } else {
        res.status(401).json({ message: 'Session expired or not logged in.' });
    }
});

const session = require('express-session');

app.use(
    session({
        secret: 'your_secret_key', // Use a strong secret
        resave: false, // Do not save the session if it hasn't changed
        saveUninitialized: false, // Do not save uninitialized sessions
        cookie: {
            httpOnly: true, // Protect against client-side script access
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 1000 * 60 * 15, // 15 minutes of idle timeout (in milliseconds)
        },
    })
);


app.get('/some-route', (req, res) => {
    // If the user is active, the session remains valid
    if (req.session.user) {
        res.json({ message: 'Session refreshed due to activity.' });
    } else {
        res.status(401).json({ message: 'Session expired or not logged in.' });
    }
});


const RedisStore = require('connect-redis')(session);
const Redis = require('ioredis');
const redisClient = new Redis();

app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 15, // 15-minute idle timeout
        },
    })
);




[
    {
      "username": "admin",
      "password": "admin123",
      "role": "admin"
    },
    {
      "username": "user",
      "password": "user123",
      "role": "user"
    }
  ]
  const express = require('express');
  const fs = require('fs');
  const path = require('path');
  const app = express();
  
  app.use(express.json());
  
  // Load the JSON file
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json')));
  
  // Port setup
  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  const sessions = {}; // Store active sessions

  app.post('/login', (req, res) => {
      const { username, password } = req.body;
  
      // Find user in JSON file
      const user = users.find(u => u.username === username && u.password === password);
  
      if (user) {
          // Generate a session token (for simplicity, use the username as the token)
          const token = `${username}-${Date.now()}`;
  
          // Save the session
          sessions[token] = { username: user.username, role: user.role };
  
          res.json({ message: 'Login successful', token });
      } else {
          res.status(401).json({ message: 'Invalid credentials' });
      }
  });
  const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    // Validate the token
    if (!token || !sessions[token]) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Attach user data to the request object
    req.user = sessions[token];
    next();
};
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}!`, role: req.user.role });
});
const authorizeRole = role => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

app.get('/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
    res.json({ message: 'Welcome to the admin panel!' });
});
app.post('/logout', authenticateToken, (req, res) => {
    const token = req.headers['authorization'];

    // Remove the token from the active sessions
    delete sessions[token];

    res.json({ message: 'Logged out successfully' });
});
      

app.use((req,res,next)=>{
    if(req.body && typeof req.body === 'object'){
        for(const key in req.body){
            if(typeof req.body[key] ==='string'){
                req.body[key] = req.body[key].toUpperCase();
            }
        }
    }
    next()
})



<form action="/search" method="post" >
<h2 style="margin: 0px;font-size: 20px;margin-bottom: 0px;"></h2>
<input style="margin-bottom: -12px;" type="text" id="firstName" name="firstName" placeholder="<%=firstname%>">
<input style="margin-bottom: -12px;" type="text" id="MiddleName" name="MiddleName"required placeholder="<%=MiddleName%>">
<input style="margin-bottom: -12px;" type="text" id="SurName " name="SurName"required placeholder="<%=Surname%>">
<input  type="number" id="Password" name="ParentPhoneNo"required placeholder="<%=ParentPhoneNo%>">
<button type="submit">Get my id Number</button>
</form>

twillio N2BWDG5E56DSJ3YA5VDJYE5Z

https://github.com/benjjamin22/qrcode2/security/secret-scanning/unblock-secret/2rTXUxqWSs1oAmQDw3LlSW0a0Zx

