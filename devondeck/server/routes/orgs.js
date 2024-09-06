const orgsController = require('../controllers/orgs');

module.exports = (app) => {
  app.post('/api/orgs/register',orgsController.register);
  app.post('/api/orgs/login',orgsController.login);
  app.post('/api/orgs/jobs/new',orgsController.addPosition);
  app.get('/api/orgs/jobs/:positionId',orgsController.getOnePosition);
  app.get('/api/orgs/dashboard',orgsController.getAllAvailableDevs);
  
};