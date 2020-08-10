const router = require('express').Router();

const apiRoutes = require('./api');

//chpt14
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/dashboard', dashboardRoutes);

router.use('/', homeRoutes);
//chpt14

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;