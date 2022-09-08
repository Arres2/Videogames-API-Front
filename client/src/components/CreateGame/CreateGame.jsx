import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogames, getGenres } from "../../redux/actions/index.js";
import style from "./CreateRecipe.module.css";
import { Link } from "react-router-dom";

const CreateRecipe = () => {
  const dispatch = useDispatch();
  const options = useSelector((store) => store.all_genres);
  const [dragActive, setDragActive] = useState(false);
  const [data, setData] = useState({
    name:"",
    platforms:[],
    genres:[],
    rating :0,
    releaseDate :"",
    description :"",
    img:""
  });
  const inputRef = useRef(null);

  const [errors, setErrors] = useState({});

  useEffect(()=>{
    if(!options.length){
      dispatch(getGenres())}
    
},[dispatch,options])

  const validate = (data) => {
    let errors = {};
    if (!data.name) {
      errors.name = "El name es obligatorio";
    }
    if (!data.description) {
      errors.description = "La descripción es obligatorio";
    }
    if (!data.releaseDate) {
      errors.releaseDate = "Las instrucciones son obligatorias";
    }
    if (!data.img) {
      errors.img = "La imagen es obligatoria";
    }
    if (!data.genres.length) {
      errors.genres = "El genero es obligatorio";
    }
    if (!data.platforms.length) {
      errors.platforms = "Las plataformas disponibles es obligatorio";
    }
    return errors;
  };

  let available_p = ["PC",
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
  ]

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({
      ...data,
      [e.target.name]: e.target.value,
    }))
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleDrop = function(e) {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);
  const file = e.dataTransfer.files[0]
  const reader = new FileReader()

  reader.readAsDataURL(file)
  reader.onloadend = (e)=>{
    setData({
      ...data,
      img:e.target.result
    });
  }
  }



  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      console.log(e.type)
      setDragActive(true);
    } 
    else if(e.type === "dragleave") {
      console.log(e.type)
      setDragActive(false);
    }
  };
  const checkbox = (e) => {
    if (data.platforms.includes(e.target.value)) {
      data.platforms = data.platforms.filter((id) => id !== e.target.value);
      setData({
        ...data,
        platforms: data.platforms,
      });
      setErrors(validate({
        ...data,
        [e.target.name]: e.target.value,
      }))
    } else {
      setData({
        ...data,
        platforms: [...data.platforms, e.target.value],
      });
      setErrors(validate({
        ...data,
        [e.target.name]: e.target.value,
      }))
    }

  };

  const checkbox2 = (e) => {
    if (data.genres.includes(e.target.value)) {
      data.genres = data.genres.filter((id) => id !== e.target.value);
      setData({
        ...data,
        genres: data.genres,
      });
      setErrors(validate({
        ...data,
        [e.target.name]: e.target.value,
      }))
    } else {
      setData({
        ...data,
        genres: [...data.genres, e.target.value],
      });
      setErrors(validate({
        ...data,
        [e.target.name]: e.target.value,
      }))
    }
  };

  const submit = (e) => {
    e.preventDefault();

    data.rating = (data.rating*5)/100
    console.log(typeof data.rating, data.rating )

    let date = data.releaseDate.split("-")

    date = new Date(date[0],date[1],date[2])
    console.log(date)




    setData({
      ...data,
      rating: data.rating,
      releaseDate: date
    });


    dispatch(createVideogames(data))
    setData({
      name: "",
      rating: 0,
      description: "",
      releaseDate: "",
      img:"",
      genres:[],
      platforms: [],
    });
  };

  const dropZoneStyle = {
    ...(dragActive && {backgroundColor: "white"}),
    ...(data.img && {
      backgroundImage:`url(${data.img})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "contain"
    })
  }
  return (
    <div className={style.containerCreate}>
      <form action="POST" className={style.form} onSubmit={submit}>
        <div className={style.container}>
          <div className={style.separado}>
            <h1>Crea tu propia receta</h1>
            <p className={errors.name ? style.danger : style.question}>
              <label>Name of the Game</label>
              <input
                type="text"
                placeholder="Jujutsu fighters"
                name="name"
                value={data.name}
                onChange={handleInputChange}
                
              />
            </p>
            {errors.name ? <p className={style.danger}>{errors.name}</p> : null}
            <p className={style.question}>
              <label>Rating</label>
              <input
                type="range"
                name="rating"
                value={data.rating}
                onChange={handleInputChange}
                
              />
              <span>{(data.rating*5)/100}</span>
            </p>
            
            <p className={errors.description ? style.danger : style.question}>
              <label>Description</label>
              <input
                type="text"
                name="description"
                placeholder="Game summary..."
                value={data.description}
                onChange={handleInputChange}
              />
            </p>
            {errors.description ? <p className={style.danger}>{errors.description}</p> : null}

            <p className={errors.releaseDate ? style.danger : style.question}>
              <label>Fecha de Lanzamiento</label>
              <input
                type="date"
                name="releaseDate"
                value={data.releaseDate}
                onChange={handleInputChange}
                
              />
              <span>{data.releaseDate}</span>
            </p>
            {errors.releaseDate ? <p className={style.danger}>{errors.releaseDate}</p> : null}

            <div className={style.form_file_upload}  onDragEnter={handleDrag}>
              <input ref={inputRef} type="file" id={style.input_file_upload} multiple={false} name="img" onChange={handleInputChange} accept="image/jpeg,image/jpg,image/png,image/gif"  />
              <label className={style.label_file_upload} htmlFor="input_file_upload" style={dropZoneStyle} >
                <div>
                  <p>Drag and drop your file here or</p>
                  <button  type="button" className={style.upload_button} onClick={onButtonClick}>Upload a file</button>
                </div> 
              </label>
              { dragActive && <div id={style.drag_file_element} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }

              {errors.img ? <p className={style.danger}>{errors.img}</p> : null}
            </div>

            <input type="submit" value="Crear" className={style.submit} disabled={errors.length?true:false} onClick={validate}/>
          </div>
          <div className={style.hiddenCB}>
            <h1>Available Platforms</h1>
            <div className={style.tipos}>
              {available_p?.map((t) => (
                <div key={t}>
                  <input
                    type="checkbox"
                    name={t}
                    value={t}
                    id={t}
                    onChange={checkbox}
                    
                  />
                  <label htmlFor={t}>{t}</label>
                  {/* {t.slot % 4 === 0 ? <br /> : null} */}
                </div>
              ))}
            </div>
            {errors.platforms ? <p className={style.danger}>{errors.platforms}</p> : null}
          </div>
          <div className={style.hiddenCB}>
            <h1>Genres</h1>
            <div className={style.tipos}>
              {options.map((t) => (
                <div key={t.name}>
                  <input
                    type="checkbox"
                    name={t.name}
                    value={t.name}
                    id={t.name}
                    onChange={checkbox2}
                    
                  />
                  <label htmlFor={t.name}>{t.name}</label>
                  {/* {t.slot % 4 === 0 ? <br /> : null} */}
                </div>
              ))}
              {errors.genres ? <p className={style.danger}>{errors.genres}</p> : null}
            </div>
          </div>
        </div>
      </form>
      <div className={style.pagination}>
        <Link to="/videogames">
          <button className={style.pagination_button}>Back</button>
        </Link>
      </div>
    </div>
    
  );
  
};

export default CreateRecipe;