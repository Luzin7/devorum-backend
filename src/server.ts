import app from './app';

const { PORT } = require('../config');

const port = PORT || '4425';

app.listen(port, () => console.log(`Server is listening on port ${port}`));
