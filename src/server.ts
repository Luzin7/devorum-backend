import app from './app';

require('dotenv').config();
const port = process.env.PORT || '4321';

app.listen(port, () => console.log(`Server is listening on port ${port}`));
