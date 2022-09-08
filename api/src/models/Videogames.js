const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// ID: * No puede ser un ID de un videojuego ya existente en la API rawg
// Nombre *
// Descripción *
// Fecha de lanzamiento
// Rating
// Plataformas *

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogames", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.BLOB(),
      allowNull: false,
    },
    platforms: {
      type: DataTypes.ARRAY(
        DataTypes.ENUM(
          "PC",
          "PlayStation 5",
          "PlayStation 4",
          "Xbox One",
          "Xbox Series S/X",
          "Nintendo Switch",
          "iOS",
          "Android",
          "Nintendo 3DS",
          "Nintendo DS",
          "Nintendo DSi",
          "macOS",
          "Linux",
          "Xbox 360",
          "Xbox",
          "PlayStation 3",
          "PlayStation 2",
          "PlayStation",
          "PS Vita",
          "PSP",
          "Wii U",
          "Wii",
          "GameCube",
          "Nintendo 64",
          "Game Boy Advance",
          "Game Boy Color",
          "Game Boy",
          "SNES",
          "NES",
          "Classic Macintosh",
          "Apple II",
          "Commodore / Amiga",
          "Atari 7800",
          "Atari 5200",
          "Atari 2600",
          "Atari Flashback",
          "Atari 8-bit",
          "Atari ST",
          "Atari Lynx",
          "Atari XEGS",
          "Genesis",
          "SEGA Saturn",
          "SEGA CD",
          "SEGA 32X",
          "SEGA Master System",
          "Dreamcast",
          "3DO",
          "Jaguar",
          "Game Gear",
          "Neo Geo"
        )
      ),
      allowNull: false,
    },
  }),
    {
      timestamps: true,
      createdAt: true,
    };
};
