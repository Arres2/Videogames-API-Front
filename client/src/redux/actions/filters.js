export const filterByGenre = (genre, array) => {
  return array.filter((p) => {
    return p.genres.map((e) => e.name).includes(genre);
  });
};

export const ordered = (order, array) => {
  let names = array.map((o) => o.name);
  let rating = array.map((o) => o.rating);
  let orde = [];

  switch (order) {
    case "a-z":
      names = names.sort();
      names.forEach((p) => {
        array.forEach((po) => {
          if (p === po.name) orde.push(po);
        });
      });
      return orde;
    case "z-a":
      names = names.sort().reverse();
      names.forEach((p) => {
        array.forEach((po) => {
          if (p === po.name) orde.push(po);
        });
      });
      return orde;
    case "Rating+":
      rating = rating.sort((a, b) => b - a);
      rating.forEach((f) => {
        array.forEach((p) => {
          if (p.rating === f) orde.push(p);
        });
      });
      orde = orde.filter((e, i) => orde.indexOf(e) === i);
      return orde;
    case "Rating-":
      rating = rating.sort((a, b) => a - b);
      rating.forEach((f) => {
        array.forEach((p) => {
          if (p.rating === f) orde.push(p);
        });
      });
      orde = orde.filter((e, i) => orde.indexOf(e) === i);
      return orde;
    default:
      return array;
  }
};
