const app = require('./app');
const { PORT } = require('./config/config');
const { connect } = require('./config/config');


connect();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
