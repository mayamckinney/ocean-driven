const fs = require('fs');

const getBoatImages = (boatName) => {

    fs.readdir(`../../client/public/images/boats/${boatName}`, (err, data) => {
        if (err) {
            throw err
        }

        console.log(data)

        const array = data.map((file) => {
            return `../../client/public/images/boats/${boatName}/${file}`
        })
        console.log(array);
    })
}

module.exports getBoatImages;

