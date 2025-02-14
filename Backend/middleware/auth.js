// middleware/auth.js
import jwt from "jsonwebtoken"

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' ,success:false});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.user.id;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid',success:false });
  }
};

// exports.employerAuth = async (req, res, next) => {
//   if (req.user.role !== 'employer') {
//     return res.status(401).json({ msg: 'Employer authorization required' });
//   }
//   next();
// };

// exports.jobSeekerAuth = async (req, res, next) => {
//   if (req.user.role !== 'jobseeker') {
//     return res.status(401).json({ msg: 'Job seeker authorization required' });
//   }
//   next();
// };