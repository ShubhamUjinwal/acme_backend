import express from 'express';
import Devices from '../models/devices';
const router = express.Router();

// Get all
router.get('/', async (req, res) => {
	try {
		const devices = await Devices.find();
		res.json(devices);
	} catch (error) {
		res.status(500).json({ message: error.message});
	}
});

// Get
router.get('/:id', getDevice, (req, res) => {
	res.json(res.device);
});

// Post
router.post('/', async (req, res) => {
	const device = new Devices({
		name: req.body.name,
		sensor: req.body.sensor
	});

	try {
		const newDevice = await device.save();
		res.status(201).json(newDevice);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Update
router.patch('/:id', getDevice, async (req, res) => {
  if (req.body.name != null) {
    res.device.name = req.body.name;
  }
  if (req.body.sensor != null) {
    res.device.sensor = req.body.sensor;
  }
  try {
    const updatedDevice = await res.device.save();
    res.json(updatedDevice);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});


// Delete
router.delete('/:id', getDevice, async (req, res) => {
	try {
    await res.device.remove()
    res.json({ message: 'Deleted Device' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

async function getDevice(req, res, next) {
	let device;
	try {
		device = await Devices.findById(req.params.id);
		if (device === null ) {
			return res.status(404).json({ message: 'Cannot find device' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.device = device;
	next();
}

module.exports = router;