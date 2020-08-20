const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { update } = require('../models/Dev');
module.exports = {

    async index(request, response) {

        const devs = await Dev.find();

        return response.json(devs);

    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiresponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiresponse.data;

            const techsarray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsarray,
                location
            });

        }



        return response.json(dev)
    },
    async destroy(request, response) {
        const { github_username } = request.params;

        const dev = await Dev.deleteOne({github_username});

        return response.json({ dev });

    },
    async update(request, response) {
        const { github_username, techs, latitude, longitude, name, avatar_url, bio } = request.body;
        const techsarray = parseStringAsArray(techs);
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }
        const dev = await Dev.update({ github_username }, {
            name,
            avatar_url,
            bio,
            techs: techsarray,
            location

        });

        return response.json({ dev });

    },

};
