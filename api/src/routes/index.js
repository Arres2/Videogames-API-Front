const { Router } = require("express");
const {
  getAllGames,
  getSingleGame,
  createGame,
  getGenres,
  deleteDbData,
} = require("../middleware/fetcher");

const router = Router();

router.get("/videogames", async (req, res) => {
  try {
    let data = await getAllGames();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/videogames/:id", async (req, res) => {
  let { id } = req.params;
  let detail = await getSingleGame(id);

  try {
    res.status(200).json(detail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/genres", async (req, res) => {
  try {
    let data = await getGenres();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/videogames", async (req, res) => {
  try {
    let { id, name, description, rating, img, genres, platforms, releaseDate } =
      req.body;

    let data = await createGame(
      id,
      name,
      description,
      img,
      rating,
      genres,
      platforms,
      releaseDate
    );
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/videogames/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await deleteDbData(id);
    console.log(data);
    res.send({ msg: "Borrado con exito" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
