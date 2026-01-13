const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config()//.env folder is in the same folder so no need to add the option of path
const app = express()
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
const cookieParser = require('cookie-parser');
const download = require('image-downloader');
const multer = require('multer');
const PlacesModel = require('./models/Places.model');
const Booking = require('./models/booking.model');

//(10,11)
//useContext ko study krte raho in more better way.
//Logout ho jane pr.if i go to /login must be redirected /accounts
//name is coming not on logging in but on profile rendering while refreshing
//1/Spread in the array (...)
//2/To be done: Functionality of editing and deleting photos

const bcryptsalt = bcrypt.genSaltSync(10);
const jwtSecretKey = "ksdajgjhaegduqweyuiqyweijlskdlkdfjhj";

function getUserDataFromToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecretKey, {}, async (err, user) => {
      if (err) {
        throw err;
      }
      resolve(user);
    })


  })

}

// Role based Access:
function verifyRole(requiredRole) {
  return (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authorized" });

    jwt.verify(token, jwtSecretKey, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });

      if (user.role !== requiredRole) {
        return res.status(403).json({ message: "Access denied: Insufficient permissions" });
      }

      req.user = user; // attach user info to request
      next();
    });
  };
}


app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS', 'PUT'], // Allow necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
}));

app.use('/uploads', express.static('uploads'));
app.use(cookieParser())
app.use(express.json())
app.use(express.static(__dirname)) // The current directory in which your images are saved , to access them http//localhost:3000/directoryname/imagename (if the images are in api directory then the directory is / bydeafult)
const port = 3000

mongoose.connect(process.env.MONGODB_URL)

app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, bcryptsalt);

    // Allow role only if it's valid, default to 'user'
    const userRole = role === "admin" ? "admin" : "user";

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🟢 LOGIN ROUTE
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not registered yet" });
    }

    const passOk = bcrypt.compareSync(password, user.password);
    if (!passOk) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Include role in JWT
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      jwtSecretKey,
      { expiresIn: "2h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true in production (HTTPS)
    }).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


app.get('/profile', (req, res) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, jwtSecretKey, {}, async (err, user) => {
      if (err) {
        throw err;
      }
      // Populate role in response
      const { name, email, _id, role } = await User.findById(user.id)
      res.json({ name, email, _id, role })
    })

  }
  else {
    res.json(null)
  }
})

app.post('/logout', (req, res) => {
  res.clearCookie('token').json('true')
})

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body
  const newName = Date.now() + '.jpg'
  const options = {
    url: link,
    dest: __dirname + '\\' + 'uploads' + newName,

  };


  await download.image(options)
    .then(({ filename }) => {
      console.log('Saved to', filename);
    })
    .catch((err) => console.error(err));

  res.json(__dirname + '\\' + 'uploads' + newName);
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
  }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('image'), function (req, res, next) {
  const url = `/uploads/${req.file.filename}`
  res.json({ imageurl: `http://localhost:3000/${url}` })
})

// PROTECT: Only admin can add places
app.post('/places', verifyRole('admin'), (req, res) => {
  const { title, address, description,
    checkIn, checkOut, perks, AddedPhotos, price } = req.body;
  const token = req.cookies.token;
  jwt.verify(token, jwtSecretKey, {}, async (err, user) => {
    if (err) {
      throw err;
    }
    const places = PlacesModel.create({
      owner: user._id,
      name: title,
      address,
      description,
      checkIn,
      checkOut,
      perks,
      photos: AddedPhotos,
      price

    })
    res.json(places);
  })

})

app.get('/user-places', async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, jwtSecretKey, {}, async (err, user) => {
    const data = await PlacesModel.find({ owner: user._id });
    res.json(data);
  })
})

app.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await PlacesModel.findById(id))
})

// PROTECT: Only admin can edit places
app.put('/places', verifyRole('admin'), async (req, res) => {


  const { id, title, address, description,
    checkIn, checkOut, perks, AddedPhotos, price } = req.body;

  const placeDoc = await PlacesModel.findById(id);
  placeDoc.set({
    name: title,
    address,
    description,
    checkIn,
    checkOut,
    perks,
    photos: AddedPhotos,
    price
  });
  await placeDoc.save();
  res.json('ok');
}
);


app.get('/places', async (req, res) => {
  res.json(await PlacesModel.find())
})

app.post('/booking', async (req, res) => {
  try {
    const userData = await getUserDataFromToken(req);
    const { place, checkin, checkout, name, mobile, guests, price,

    } = req.body;

    const booking = await Booking.create({
      place, checkin, checkout, name, mobile, guests, price,
      user: userData.id
    })

    res.json(booking);
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});


app.get('/booking', async (req, res) => {
  const userData = await getUserDataFromToken(req);
  const booking = (await Booking.find({ user: userData.id })
    .populate('place'))
  res.json(booking);
})

app.get('/profilebooking', async (req, res) => {
  res.json(await Booking.find().populate('place'));

})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

