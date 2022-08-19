var express = require('express');
var client = require('../db/index.js');

const getUserTrips = (req: any, res: any) => {

  //May need to optimize this query
  const queryString = `
  SELECT DISTINCT trips.id, name, status FROM trips
  INNER JOIN user_trip
  ON user_trip.user_email = trips.user_email
  WHERE
  trips.email = '${req.params.user_email}'
  trips.status = 'planned' OR trips.status = 'active';`

  client.query(queryString)
  .then((data: any) => {
    console.log('req email in controller', req.params.user_email)
    console.log(data.rows);
    res.send(data.rows);
  })
  .catch((error: Error) => {
    console.error(error);
  })
}

module.exports = getUserTrips;