const axios = require('axios').default
export default function handler(req, res) {
   res.status(200).json({message : 'api connected'})
}