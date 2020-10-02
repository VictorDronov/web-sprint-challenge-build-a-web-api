const express = require("express");
const router = express.Router();
const data = require("../data/helpers/projectModel");
router.use(express.json());

//MIDDLEWARE

function validatePost(req, res, next) {
  if (req.body.name && req.body.description) {
    next();
  } else {
    res.status(404).json({
      message: "missing one of the required fields: description, name",
    });
  }
}
function validateId(req, res, next) {
  if (req.params.id) {
    next();
  } else {
    res.status(400).json({ message: "invalid id" });
  }
}

/// THINGS CRUD OPS
// GETTING BY all info for that prokect by THE ID
router.get("/:id",validateId, (req, res) => {
  data.get(req.params.id).then((resp) => {
    res.status(200).json({ data: resp });
  });
});
//GETTING WHOLE LIST
router.get("/", (req, res) => {
  data
    .get()
    .then((resp) => {
      res.status(200).json({ data: resp });
    })
    .catch((err) => {
      res.status(500).json({ ErrorMessage: "Server Failed To Get" });
    });
});
//ADDING
router.post("/", validatePost, (req, res) => {
  console.log(req.body);
  data
    .insert(req.body)
    .then((resp) => {
      res.status(201).json({ data: resp });
    })
    .catch((err) => {
      res.status(500).json({ ErrorMessage: "Failed To Add Project" });
    });
});
// UPDATATING
router.put("/:id",validateId, (req, res) => {
  const changes = req.body;
  data
    .update(req.params.id, changes)
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ ErrorMessage: "Update Failed" });
    });
});
// DELETING
router.delete("/:id",validateId, (req, res) => {
  data
    .remove(req.params.id)
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ ErrorMessage: "Server Failed To Remove Project" });
    });
});

router.use(express.json());

module.exports = router;


