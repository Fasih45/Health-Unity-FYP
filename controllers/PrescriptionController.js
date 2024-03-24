const Prescription = require("../model/Prescription");
const createPrescription = async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    res.status(201).send(prescription);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllPrescriptions = async (req, res) => {
  try {
    const ITEMS_PER_PAGE = 5;
    const parsedPage = +req.params.page || 1;

    const prescriptions = await Prescription.find({ id: req.params.id })
      .skip((parsedPage - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .exec();
    res.send(prescriptions);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!prescription) {
      return res.status(404).send();
    }
    res.send(prescription);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!prescription) {
      return res.status(404).send();
    }
    res.send(prescription);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createPrescription,
  getAllPrescriptions,

  updatePrescription,
  deletePrescription,
};
