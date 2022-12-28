const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');

// Freelancer APIs
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const auth = require('./routes/api/auth');
const skill = require('./routes/api/skill');
const paymentType = require('./routes/api/paymentType');
const freelancer = require('./routes/api/Freelancer/freelancer');
const certifications = require('./routes/api/Freelancer/certifications');
const hasSkill = require('./routes/api/Freelancer/hasSkill');
const expertise = require('./routes/api/Freelancer/expertise');
const expertLevel = require('./routes/api/Freelancer/expertLevel');
const education = require('./routes/api/Freelancer/education');
const employment = require('./routes/api/Freelancer/employment');
const language = require('./routes/api/Freelancer/language');
const hourlyRate = require('./routes/api/Freelancer/hourlyRate');
const titleAndOverview = require('./routes/api/Freelancer/titleAndOverview');
const profilePhoto = require('./routes/api/Freelancer/profilePhoto');
const location = require('./routes/api/Freelancer/location');
const phone = require('./routes/api/Freelancer/phone');
const upload = require('./routes/api/upload')

// Client APIs
const company = require('./routes/api/Client/company')
const hireManager = require('./routes/api/Client/hireManager')

// Job Posting APIs
const complexity = require('./routes/api/JobPosting/complexity')
const expectedDuration = require('./routes/api/JobPosting/expectedDuration')
const job = require('./routes/api/JobPosting/job');

// Proposal And Contract APIs
const proposal = require('./routes/api/ProposalAndContract/Proposal')
const proposalstatuscatalog = require('./routes/api/ProposalAndContract/ProposalStatusCatalog')
const message = require('./routes/api/ProposalAndContract/Message')
const contract = require('./routes/api/ProposalAndContract/Contract')
const attachment = require('./routes/api/ProposalAndContract/Attachment')

const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io")
var cron = require('node-cron');
const { sendEmailsUnread } = require('./config/sendEmailsUnread');
const server = http.createServer(app);

app.use(cors());

// cron.schedule('*/10 * * * * *', () => {
//   sendEmailsUnread();
// });

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000","https://hidden-cliffs-88299.herokuapp.com","https://cyber-2-cyber.web.app"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("receive_message_successfull", (data) => {
    socket.to(data.room).emit("receive_message_successfull_done");
  })
  socket.on("disconnect", () => {
  });
});

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/auth', auth);
app.use('/api/certifications', certifications);
app.use('/api/skill', skill);
app.use('/api/paymentType', paymentType);
app.use('/api/freelancer', freelancer);
app.use('/api/hasSkill', hasSkill);
app.use('/api/expertise', expertise);
app.use('/api/expertLevel', expertLevel);
app.use('/api/education', education);
app.use('/api/employment', employment);
app.use('/api/language', language);
app.use('/api/hourlyRate', hourlyRate);
app.use('/api/titleAndOverview', titleAndOverview);
app.use('/api/profilePhoto', profilePhoto);
app.use('/api/location', location);
app.use('/api/phone', phone);
app.use('/api/upload', upload);

app.use('/api/company', company);
app.use('/api/hireManager', hireManager);

app.use('/api/complexity', complexity);
app.use('/api/expectedDuration', expectedDuration);
app.use('/api/job', job);

app.use('/api/proposal', proposal)
app.use('/api/proposalstatuscatalog', proposalstatuscatalog)
app.use('/api/message', message)
app.use('/api/contract', contract)
app.use('/api/attachment', attachment)

const port = process.env.PORT || 5000;


server.listen(port, () => console.log(`Server running on port ${port}`));