
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const { UserInfo, Role } = require("../models/user");


const createUser = async(req, res) => {
        console.log('req.body', req.body);
        
        const{pseudo, email,id_role,id_session} = req.body, password = bcrypt.hashSync(req.body.password, 10);
        if(!pseudo || !email || !password){
            return res.status(400).json({
                "msg": "Missing parameters"
            });
        }
        try{
            const newUser = new UserInfo({pseudo, email, password,id_role,id_session});
            await newUser.save();
            return res.status(201).json({
                "msg": "New User created !"
            });
        }catch(err){
            return res.status(500).json({
                "msg": err.message
            });
        }
       
    };
const getAllUsers = async(req, res) => {
        try{
            const users = await User.find();
            return res.status(200).json(users);
        }catch(err){
            return res.status(500).json({
                "msg": err
            });
        }
    };
const login = async(req, res) => {
      const { username, password } = req.body;
      const user = User_DB.find((u) => u.username === username && bcrypt.compareSync(password, u.password));
      if (user) {
        const accessToken = jwt.sign(
          {
            username: user.username,
            exp: Math.floor(Date.now() / 1000) + 120
          },
          process.env.ACCESS_JWT_KEY
        );
  
        return res.status(200).json({ message: "You are now connected!", accessToken });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    };
const authenticate = async (req, res) => {
      let authHeader = req.headers["authorization"];
  
      // Vérification que l'en-tête existe et suit le format "Bearer <token>"
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token manquant ou mal formaté" });
      }
  
      // Extraction du token sans le préfixe "Bearer "
      const token = authHeader.split(" ")[1];
  
      try {
        // Vérification du token
        const decoded = jwt.verify(token, process.env.ACCESS_JWT_KEY);
  
        const { username, password } = req.body;
        const user = User_DB.find((u) => u.username === username && bcrypt.compareSync(password, u.password));
        if (!user) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
  
        // Authentification réussie
        req.user = user;
        return res.status(200).json({ message: "Authentification réussie", user });
  
      } catch (err) {
        return res.status(401).json({ message: "Token invalide ou expiré", error: err.message });
      }
    };

export {createUser, getAllUsers, login, authenticate}