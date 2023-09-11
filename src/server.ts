import app from './app';

const { PORT } = require('../config');

const port = PORT || '4422';

app.listen(port, () => console.log(`Server is listening on port ${port}`));
