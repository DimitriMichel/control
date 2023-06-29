import express from 'express';
import ora from 'ora';
import chalk from 'chalk';
import userRoutes from '../app/Routes/user.js';
import organizationRoutes from '../app/Routes/organization.js';
import patientRoutes from '../app/Routes/patient.js';

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing urlencoded bodies

app.use('/users', userRoutes);
app.use('/organizations', organizationRoutes);
app.use('/patients', patientRoutes);


const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
    const spinner = ora(`Server is running! -> ${chalk.green('Port:')} ${PORT}`).start();
});

export default app;