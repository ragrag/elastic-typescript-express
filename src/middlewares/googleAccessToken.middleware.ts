import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const getGoogleAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const googleCode = req.body.code;
    const response = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code: googleCode,
        redirect_uri: process.env.NODE_ENV === 'production' ? 'https://www.yourdomain.com/oauth/google' : 'http://localhost:3001/oauth/google',
        grant_type: 'authorization_code',
      },
      {},
    );
    req.body.access_token = response.data.access_token;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(400).send('Something went wrong during Google Authentication');
  }
};

export default getGoogleAccessToken;
