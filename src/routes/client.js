const Client = require('../models/client');

// Method for get list of all clients;
function getClient(request, response) {
    Client.find().then((result) => {
        if (!result.length) {
            return response.status(404).json({});
        }
        return response.status(200).json(result);
    }).catch(() => {
        return response.status(500).json({});
    });
}

// Method for add new client;
function addClient(request, response) {
    if (!request.body) {
        return response.status(400).json({});
    }

    const login = request.body.login;
    const email = request.body.email;
    const country = request.body.country;
    const sex = request.body.sex;
    const age = request.body.age;

    if (!login || !email) {
        return response.status(400).json({});
    }

    const client = new Client();
    client.login = login;
    client.email = email;
    client.country = country;
    client.sex = sex;
    client.age = age;
    client.save().then((result) => {
        return response.status(201).json({ _id: result._id });
    }).catch(() => {
        return response.status(409).json({});
    });
}

// Method for update client;
function updateClient(request, response) {
    if (!request.body || !request.body._id) {
        return response.status(400).json({});
    }

    Client.findById(request.body._id).then((result) => {
        if (result === null) {
            return response.status(404).json({});
        }

        Client.updateOne({
            _id: request.body._id
        }, {
            login: request.body.login ? request.body.login : result.login,
            email: request.body.email ? request.body.email: result.email,
            country: request.body.country ? request.body.country : result.country,
            sex: request.body.sex && request.body.sex >= 0 && request.body.sex <= 1 ? request.body.sex : result.sex,
            age: request.body.age && request.body.age >= 0 ? request.body.age : result.age
        }).then((result) => {
            return response.status(200).json({});
        }).catch(() => {
            return response.status(409).json({});
        });
    }).catch(() => {
        return response.status(500).json({});
    });
}

// Method for delete client;
function deleteClient(request, response) {
    if (!request.body || !request.body._id) {
        return response.status(400).json({});
    }

    Client.findByIdAndDelete(request.body._id).then((result) => {
        if (result === null) {
            return response.status(404).json({});
        }
        return response.status(200).json({});
    }).catch(() => {
        return response.status(500).json({});
    });
}

module.exports = { getClient, addClient, updateClient, deleteClient };
