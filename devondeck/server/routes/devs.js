const devscontroller = require('../controllers/devs');

module.exports = (app) => {
  app.post('/api/devs/register',devscontroller.register);
  app.post('/api/devs/login',devscontroller.login);
  app.post('/api/devs/skills/Languages',devscontroller.AddSkills);
  app.post('/api/devs/skills/Frameworks',devscontroller.AddSkills);
 
  
};
