const { createConnection } = require('typeorm');

const main = async () => {
    try {
        await createConnection();
    } catch (error) {
        return console.log(error);
    }
};

main();
