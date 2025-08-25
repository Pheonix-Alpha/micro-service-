import jwt from "jsonwebtoken";

export default function authMiddleware(req, res ,next){
   
    const authHeader = req.headers("authorization");
  const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.status(401).json({msg:"no token available"});

    try{
        const decorded = jwt.verify(token,process.env.JWT_SECREAT);
        req.user = decorded;
        next();
    } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}