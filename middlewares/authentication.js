import jwt from "jsonwebtoken";

const secret = "123";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }
  console.log("Token received:", token);  
console.log("my Token :",secret)
  try {
    
    const user = jwt.verify(token, secret);
console.log(user)
    req.userId = user.userId;  
    next();  
  } catch (err) {
    console.error("JWT verification error:", err);

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token has expired" });
    } else {
      return res.status(403).json({ message: "Invalid  token" });
    }
  }
};

export { authenticateToken };
