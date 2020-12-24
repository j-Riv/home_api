import dotenv from 'dotenv'
import express, { Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import rfs from 'rotating-file-stream';
import exphbs from 'express-handlebars';
// routes
import hue from './routes/hue';

const PORT = process.env.PORT || 3000;
const app: express.Application = express();
app.set('trust proxy', true);

dotenv.config();

// Define middleware here
app.use(express.urlencoded({
  limit: '50mb',
  extended: true,
  verify: (req: Request, res: Response, buf: Buffer, encoding: any) => {
    if ((req.url as string).startsWith('/api/')) {
      if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
      }
    }
  }
}));
app.use(express.json({
  limit: '50mb',
  // extended: true,
  verify: (req: Request, res: Response, buf: Buffer, encoding: any) => {
    if (req.url.startsWith('/api/')) {
      if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
      }
    }
  }
  }));

// Serve up static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/dist'));
// }
app.use('/public', express.static(path.join(__dirname, '../public')));

// App Setup
// create a rotating write stream
const accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname + '/../', 'logs')
})
app.use(morgan('combined', { stream: accessLogStream }));
app.use(cors());

// Handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
);
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'handlebars');

// Define API routes here
hue(app);

app.listen(PORT, () => {
  console.log(
    '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
    PORT,
    PORT
  );
});