const express = require("express");
const router = express.Router();
const data = require("../data/helpers/actionModel");

router.use(express.json());

function validateActionPost(req, res, next) {
  if (req.body.description && req.body.project_id && req.body.notes) {
    next();
  } else if (req.body.description > 128) {
    res.status(400).json({ ErrorMessage: "Description is to long!" });
  } else {
    res
      .status(400)
      .json({ ErrorMessage: "Missing one of the required Fields!" });
  }
}
function validateID(req, res, next) {
  if (req.params.id) {
    next();
  } else {
    res.status(400).json({ ErrorMessage: "Wrong Id" });
  }
}
//getting all actions
router.get("/actions", (req, res) => {
  data.get(req.params.id).then((resp) => {
    res.status(200).json({ data: resp });
  });
});
//adding an action
router.post("/actions", validateActionPost, (req, res) => {
  data
    .insert(req.body)
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ ErrorMessage: "Server Failed to add" });
    });
});
//Update for actions
router.put("/actions/:id", validateID, validateActionPost, (req, res) => {
  data
    .update(req.params.id, req.body)
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ ErrorMessage: "FAILED TO UPDATE!" });
    });
});

router.delete("/actions/:id", validateID, (req, res) => {
  data
    .remove(req.params.id)
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ ErrorMessage: "Failed to remove!" });
    });
});
module.exports = router;



