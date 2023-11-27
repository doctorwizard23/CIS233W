var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'images',
    password: 'images',
    database: 'images',
    debug: false
});

function releaseConnection(connection) {
    connection.removeListener('error', errListener);
    connection.release();
}

function errListener(err, errString, connection, callback) {
    console.log(err);
    releaseConnection(connection);
    callback({ error: "<p><b>" + errString + "</b></p><p>" + err.code + "</p>" });
}

module.exports.uploadFile = function(image, callback) {
    pool.getConnection(function(err, connection) {
    
        function returnResult(err, result) {
            if(err) {
                console.log(err);
                errListener(err, "Error: Couldn't upload image metadata.", connection, callback);
            } else {
                releaseConnection(connection);
                callback({ id: result.insertId });
            }    
        }

        function uploadMetadata(err, result) {
            if(err) {
                errListener(err, "Error: Couldn't upload image.", connection, callback);
                return;
            }
            connection.query(
                'INSERT INTO metadata '
                + 'VALUES (?, DEFAULT, ?, ?, ?);', [
                    image.name, 
                    image.type, 
                    image.size, 
                    result.insertId
                ], 
                returnResult
            );
        }    

        if(err) {
            callback({ error: "Error: Couldn't get connection."});
            return;
        }

        connection.on('error', function(err) {
            errListener(err, "Error: Couldn't INSERT image.", connection, callback);
        });
        connection.query(
            'INSERT INTO imagedata VALUES (NULL, ?);', 
            [image.data], 
            uploadMetadata
        );
    });
};

module.exports.fetchImage = function(id, callback) {
    pool.getConnection(function(err, connection) {
        
        if(err) {
            callback({ error: "Error: Couldn't get connection."});
            return;
        } 
        connection.on('error', function(err) {
            errListener(err, "Error: Couldn't fetch image.", connection, callback);
        });
        connection.query(
            'SELECT type, size, data ' 
            + 'FROM metadata ' 
            + 'JOIN imagedata ' 
            + 'ON id = imageid ' 
            + 'WHERE id = ?;', [id], function(err, rows, fields) {
            if(err) {
                errListener(err, "Error: Couldn't fetch image.", connection, callback);
            } else {
                releaseConnection(connection);
                callback(rows[0]);
            }
        });
    });
};

module.exports.listImages = function(callback) {
    pool.getConnection(function(err, connection) {

        if(err) {
            callback({ error: "Error: Couldn't get connection."});
            return;
        }
        connection.on('error', function(err) {
            errListener(err, "Error: Couldn't fetch image list.", connection, callback);
        });
        connection.query('SELECT name, imageid FROM metadata ORDER BY created DESC;', function(err, rows, fields) {
            if(err) {
                errListener(err, "Error: Couldn't fetch image list.", connection, callback);
            } else {
                releaseConnection(connection);
                callback(rows);
            }
        });
    });
};