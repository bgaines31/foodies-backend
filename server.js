require('dotenv').config('.env');
const express = require('express');
const app = express();
const { User, Recipe } = require('./db');
const bcrypt = require('bcrypt');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(morgan('dev'));

// app.get('/', async (req, res, next) => {
//   try {
//     res.send('<h1>Welcome to Loginopolis!</h1><p>Log in via POST /login or register via POST /register</p>');
//   } catch (error) {
//     console.error(error);
//     next(error)
//   }
// });
const createUser = async ({ firstName , lastName, email , password }) => {
    return await User.create({ firstName , lastName,  email , password });
};

app.post("/register", async (req, res, next) => {
  const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}
  try {
    const {username, password} = req.body;
    const hashedPassword = await hashPassword(password, 10);
    const user = await User.create({username, password:hashedPassword});
    // res.send("successfully created user " + user.username);
    const token = jwt.sign({ username, id: user.id }, process.env.JWT_SECRET);
    res.send({message: 'success', token: token });
  } catch(error) {
    console.error(error);
    next(error);
  }
})


// router.post('/login', async function(req, res, next) { 
//     const { email, password } = req.body;
//     if (email && password) {
//         let user = await getUser({ email: email });
//         if (!user) {
//           return  res.status(401).json({ message: 'No such user found' });
//         }
//         bcrypt.compare( password , user.password, (err, result) =>{
//             if(err){
//                  res.status(403).json({message :'incorrect password'});
//             }
//             if(result){
//                 let payload = { user   };
//                 console.log(jwtOptions.secretOrKey);
//                 let token = jwt.sign(payload, jwtOptions.secretOrKey);
//                return res.status(200).json({ message: 'ok', token });
//             }
//             else{
//               return  res.status(403).json({message :'incorrect password'});
//             }

//         })

//     }
// });

// POST /login
app.post('/login', async (req, res, next) => {

    try {
        const { username, password } = req.body;
const user = await User.findOne({ where: { username } });
    if (!user) {
      res.sendStatus(401);
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.sendStatus(401);
      } else {
        const token = jwt.sign({ username, id: user.id }, process.env.JWT_SECRET);
        res.send({message: "success", token: token});
      }
    }
    } catch (error) {
        console.log(error);
        next(error);
    }

})

app.get("/recipes", async (req, res, next)=>{
    try{
        res.send(await Recipe.findAll())
    }catch(error) {
    console.error(error);
    next(error);
  }
})
app.get("/users", async (req, res, next)=>{
    try{
        allUsers = await User.findAll()
        res.send(allUsers)
    }catch(error) {
    console.error(error);
    next(error);
  }
})

app.get("/recipes/:id", async(req, res) => {
    const userId = await Recipe.findAll({where: {ownerId: req.params.id}})
    // let oneRecipe = await Recipe.findByPk(req.params.id, {where:{ ownerId: User.userId

    // }})
    res.send(userId)
  })

app.listen(process.env.PORT, () => {
    console.log(`Recipes are ready at http://localhost:${process.env.PORT}`);
  });
  
module.exports = app;
