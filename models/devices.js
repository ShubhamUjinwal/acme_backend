import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sensor: [{
    name: String,
    state: String
  }]
});

module.exports = mongoose.model("Devices", deviceSchema);