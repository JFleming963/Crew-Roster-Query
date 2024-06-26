const inquirer = require('inquirer');
const pool = require('../utils/pool');

async function promptAddDept() {

    // -- Prompts for adding dept --
    return inquirer
        .prompt(
            [{
                type: 'input',
                name: 'addDept',
                message: 'Enter the name of the Department you would like to add--',
                validata: (answer) => {
                    if (answer === "") {
                        return "Invalid entry. Please enter a Department name. Or, you may exit the query at any time by typing 'ctr + c'";
                    }
                    else {
                        return true;
                    }
                }
            }]
        )
        .then(async (answers) => {

            // -------- Handling prompt answers
            try {
                await pool.query(`INSERT INTO department (name) VALUES ('${answers.addDept}')`);
                console.log('---------------------');
                console.log('Department successfully added.');
                console.log('---------------------');
            }
            catch (err) {
                console.log("Error executing query", err);
            }
        })
        .catch((err) => {
            if (err.isTtyError) {
                console.log("Prompt could not be rendered in the current environment", err);
            } else {
                console.log("something else went wrong", err);
            }
        });
};

module.exports = promptAddDept;