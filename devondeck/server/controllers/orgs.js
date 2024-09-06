const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Org = require('../models/orgs');
const Dev = require('../models/devs');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const register = async (req, res) => {
  try {
      let data = req.body;
      let skills = [];
      
      
      let newOrg = new Org({
          ...data,
          skills: skills,
          password: bcrypt.hashSync(data.password, 10),
      });

      let savedOrg = await newOrg.save();

      
      

      res.send(savedOrg);
  } catch (error) {
      res.send(error);
  }
};

    const login = async (req, res) => {
      try {
        let { contactEmail, password } = req.body;
        let org = await Org.findOne({ contactEmail: contactEmail });
    
        if (!org) {
          return res.send('Email or password invalid');
        }
    
        let validPass = bcrypt.compareSync(password, org.password);
    
        if (!validPass) {
          return res.send('Email or password invalid');
        }

    const payload = {
      orgname: org.orgname,
      firstname: org.firstname,
      lastname: org.lastname,
      contactEmail:org.contactEmail,
      orgAddress: org.orgAddress,
      orgCity: org.orgCity,
      state: org.state,
      password:org.password,
      confirm:org.confirm,
      _id:org._id
    };

    const token = jwt.sign(payload, '98745623tt');
    res.json({ mytoken: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllAvailableDevs = async (req, res) => {
  try {
    const availableDevs = await Dev.find({ accountType: 'dev' });
    const orgs = await Org.find({}).populate('positions');
    
    if (!orgs || orgs.length === 0) {
      console.error('No organizations found');
      return res.status(404).json({ error: 'Organization data not found' });
    }
    const positions = orgs.flatMap(org => org.positions);


    res.json({ availableDevs, positions  });
   
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addPosition = async (req, res) => {
  console.log('Request body:', req.body);
  const { orgId, position } = req.body; 

  try {
      const org = await Org.findById(orgId);
      if (!org) {
          return res.status(404).json({ error: 'Organization not found' });
      }

      
      org.positions.push(position);

      await org.save();

      
      res.json(position);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add position' });
  }
};
const getOnePosition = async (req, res) => {
  try {
      const positionId = req.params.positionId;

      // Ensure the position ID is a valid ObjectId
      if (!ObjectId.isValid(positionId)) {
          return res.status(400).json({ error: 'Invalid position ID' });
      }

      // Retrieve all developers with accountType 'dev'
      const availableDevs = await Dev.find({ accountType: 'dev' });

      // Find the organization that contains the position with the given position ID
      const organization = await Org.findOne({ 'positions._id': positionId });
      if (!organization) {
          console.log('Organization not found');
          return res.status(404).json({ error: 'Organization not found' });
      }

      // Find the specific position within the organization's positions array
      const position = organization.positions.id(positionId);
      if (!position) {
          console.log('Position not found');
          return res.status(404).json({ error: 'Position not found' });
      }

      const matchedDevs = availableDevs.filter(dev => {
        // Convert developer skills and required skills to lowercase for case-insensitive comparison
        const devSkills = dev.devskills.map(skill => skill.toLowerCase());
        const requiredSkills = position.requiredSkills.map(skill => skill.toLowerCase());
        console.log('Developer Skills:', devSkills);
        console.log('Required Skills:', requiredSkills);
        // Check if every required skill is present in the developer's skills
        return requiredSkills.some(skill => devSkills.includes(skill));
      });
      console.log('Matched Developers:', matchedDevs);

      // Return the position and matched developers
      res.json({ position, matchedDevs });
  } catch (error) {
      console.error('Error in getOnePosition:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};











module.exports = {
  register,
  login,
  getAllAvailableDevs,
  
  getOnePosition,
  addPosition
  
};
