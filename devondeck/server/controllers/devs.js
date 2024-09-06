const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Dev = require('../models/devs');

const register = async (req, res) => {
  try {
    let data = req.body;
    const skills = [];
    if (!data.firstname || !data.lastname || !data.email || !data.address  || !data.city || !data.state || !data.password ) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    let newDev = new Dev({
      ...data,
      skills: skills,
      password: bcrypt.hashSync(data.password, 10),
      accountType: 'dev', 
      
    });
    if (data.orgId) {
      newDev.orgId = data.orgId;
    }

    let savedDev = await newDev.save();
    res.send(savedDev);
  } catch (error) {
    res.status(500).json({ error: `An error occurred while registering: ${error.message}` });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let dev = await Dev.findOne({ email: email });

    if (!dev || !bcrypt.compareSync(password, dev.password)) {
      return res.status(401).json({ error: 'Email or password invalid' });
    }

    let payload = {
      firstname: dev.firstname,
      lastname: dev.lastname,
      email: dev.email,
      address: dev.address,
      city: dev.city,
      state: dev.state,
      password: dev.password,
      confirm: dev.confirm,
      _id: dev._id
    };

    let token = jwt.sign(payload, '12345687hh');
    res.json({ mytoken: token });
  } catch (error) {
    res.status(500).json({ error: `An error occurred while logging in: ${error.message}` });
  }
};

const AddSkills = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { devId, selectedSkills, bio } = req.body; 

    let dev = await Dev.findById(devId);

    if (!dev) {
      return res.status(404).json({ error: 'Developer not found' });
    }

    dev.devskills = dev.devskills || [];

    if (!Array.isArray(selectedSkills)) {
      return res.status(400).json({ error: 'Skills should be an array' });
    }

    
    selectedSkills.forEach((skill) => {
      if (!dev.devskills.includes(skill)) {
        dev.devskills.push(skill);
      }
    });
    
    if (bio) {
      dev.bio = bio;
    }

    await dev.save();

    const response = {
      skills: dev.skills,
      bio: dev.bio
    };

    return res.json(response);
  } catch (error) {
    res.status(500).json({ error: `An error occurred while adding skill: ${error.message}` });
  }
};
module.exports = {
  register,
  login,
  AddSkills
};
