require("dotenv").config();
const { API_KEY } = process.env;
const { Videogames, Genres } = require("../db");

const params = new URLSearchParams({
  key: API_KEY,
  page_size: 40,
});

let getApiData = async () => {
  try {
    let x = await fetch("https://api.rawg.io/api/games?" + params).then((res) =>
      res.json()
    );
    let y = await fetch(x.next).then((res) => res.json());
    let z = await fetch(y.next).then((res) => res.json());

    let response = x.results.concat(y.results, z.results);

    return response;
  } catch (err) {
    throw Error(err);
  }
};

let getDbData = async () => {
  try {
    let response = await Videogames.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    let formated = await response.map((el) => {
      return {
        id: el.dataValues.id,
        name: el.dataValues.name,
        rating: el.dataValues.rating,
        description: el.dataValues.description,
        image: el.dataValues.image.toString(),
        release: el.dataValues.release,
        platforms: el.dataValues.platforms,
        genres: el.dataValues.genres.map((el) => {
          return el;
        }),
      };
    });
    return await formated;
  } catch (err) {
    throw Error(err);
  }
};

const getSingleGame = async (id) => {
  try {
    if (id.length > 10) {
      console.log(id);
      let response = await Videogames.findAll({
        where: { id: id },
        include: {
          model: Genres,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      let formated = await response.map((el) => {
        return {
          id: el.dataValues.id,
          name: el.dataValues.name,
          rating: el.dataValues.rating,
          description: el.dataValues.description,
          image: el.dataValues.image.toString(),
          release: el.dataValues.release,
          platforms: el.dataValues.platforms,
          genres: el.dataValues.genres.map((el) => {
            return el;
          }),
        };
      });

      return await formated[0];
    } else {
      let x = await fetch(`https://api.rawg.io/api/games/${id}?` + params);
      if (x.status === 404) {
        return false;
      } else return x.json();
    }
  } catch (err) {
    throw Error(err);
  }
};

let getAllGames = async () => {
  try {
    let api = await getApiData();
    let db = await getDbData();
    let results = api.concat(db);

    return results;
  } catch (err) {
    throw Error(err);
  }
};

let createGame = async (
  id,
  name,
  description,
  img,
  rating,
  genres,
  platforms,
  releaseDate
) => {
  try {
    let createdGame = await Videogames.create({
      id: id,
      name: name,
      description: description,
      image: img,
      rating: rating,
      platforms: platforms,
      release: releaseDate,
      // key={detail.id}
      // id={detail.id}
      // name={detail.name}
      // plaforms={detail.platforms.map(e=>e.platform.name)}
      // genres={detail.genres.map(e=>e.name)}
      // rating = {detail.rating}
      // releaseDate = {detail.release}
      // mcScore = {detail.metacritic}
      // description = {detail.description}
      // screenShots = {detail.short_screenshots.map(el=>el.image)}
      // steps={detail?.analyzedInstructions?.length? detail.analyzedInstructions[0].steps.map(el=>el.step): detail?.steps?.length? detail.steps:[]}
      // img={detail.background_image}
    });

    let genresDb = await Genres.findAll({
      where: {
        name: genres,
      },
    });

    createdGame.addGenres(genresDb);
    return { msg: "Character created succesfully" };
  } catch (err) {
    throw Error(err);
  }
};

let getGenres = async () => {
  try {
    let request = await fetch(`https://api.rawg.io/api/genres?` + params);
    let response = await request.json();

    await response.results.forEach((el) => {
      Genres.findOrCreate({
        where: { name: el.name },
      });
    });
    let allGenres = await Genres.findAll();
    return await allGenres;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

let deleteDbData = async (id) => {
  try {
    let response = await Videogames.destroy({
      where: { id: id },
    });
    return response;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

module.exports = {
  getAllGames,
  getSingleGame,
  createGame,
  getGenres,
  deleteDbData,
};
