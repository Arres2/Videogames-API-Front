import * as actions from "../redux/actions/index";
import * as data from "../../../api/Api_response.json";
import { Link, MemoryRouter } from "react-router-dom";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import React from "react";
import configureStore from "redux-mock-store";
import isReact from "is-react";
import thunk from "redux-thunk";

configure({ adapter: new Adapter() });

describe("<RecipeCard />", () => {
  let recipes1 = data.recipes[0];
  let recipes2 = data.recipes[1];
  let recipes3 = data.recipes[2];

  let RecipeCard, state, store, recipes;
  const mockStore = configureStore([thunk]);
  Recipes = data.recipes;
  state = {
    recipes: [],
  };
  store = mockStore(state);
  // Si o si vas a tener que usar class component! No van a correr ninguno de los tests si no lo haces.
  beforeEach(() => {
    RecipeCard = (recipes) =>
      mount(
        <Provider store={store}>
          <MemoryRouter>
            <RecipesCardConnected
              id={recipes.id}
              name={recipes.title}
              healthScore={recipes.healthScore}
              diets={recipes.diets}
              dishTypes={recipes.dishTypes}
              image={recipes.image}
            />
          </MemoryRouter>
        </Provider>
      );
    expect(isReact.component(RecipesCard)).toBeTruthy();
  });

  afterEach(() => jest.restoreAllMocks());

  describe("Estructura", () => {
    it('Debería renderizar un "button"', () => {
      expect(RecipeCard(recipes1).find("button")).toHaveLength(1);
    });

    it('Debería renderizar un tag "h3" que muestre lo que contiene el "name" de cada "recipes"', () => {
      expect(RecipeCard(recipes1).find("h3").at(0).text()).toBe("Ferrari");
      expect(RecipeCard(recipes2).find("h3").at(0).text()).toBe(
        "Oracle Red Bull"
      );
      expect(RecipeCard(recipes3).find("h3").at(0).text()).toBe("Mercedes");
    });

    it('Debería renderizar un tag "img" y utilizar como source la imagen de cada recipes', () => {
      expect(RecipeCard(recipes2).find("img").at(0).prop("src")).toEqual(
        recipes2.image
      );
      expect(RecipesCard(recipes3).find("img").at(0).prop("src")).toEqual(
        recipes3.image
      );
      expect(RecipesCard(recipes[3]).find("img").at(0).prop("src")).toEqual(
        recipes[3].image
      );
    });

    it('Debería renderizar un "p" que contenga el texto "Founder: " más el fundador de cada "recipes"', () => {
      expect(RecipeCard(recipes1).find("p").at(0).text()).toBe(
        "Founder: Enzo Ferrari"
      );
      expect(RecipeCard(recipes2).find("p").at(0).text()).toBe(
        "Founder: Dietrich Mateschitz"
      );
      expect(RecipeCard(recipes3).find("p").at(0).text()).toBe(
        "Founder: Norbert Haug"
      );
    });

    it('Debería renderizar un "p" que contenga el texto "Base: " más la prop base de cada "recipes"', () => {
      expect(RecipeCard(recipes1).find("p").at(1).text()).toBe(
        "Base: Maranello, Italy"
      );
      expect(recipesCard(recipes2).find("p").at(1).text()).toBe(
        "Base: Milton Keynes, United Kingdom"
      );
      expect(RecipesCard(recipes3).find("p").at(1).text()).toBe(
        "Base: Brackley, United Kingdom"
      );
    });

    it('Debería renderizar un componente <Link> que encierre el "name" de cada "recipes" y debería redirigir a "/Recipes/:recipesId"', () => {
      // El valor de "recipesId" lo tenes que sacar del objeto recipes, tiene una propiedad "id".
      expect(RecipeCard(recipes1).find(Link)).toHaveLength(1);
      expect(RecipeCard(recipes1).find(Link).at(0).prop("to")).toEqual(
        "/Recipes/1"
      );
    });
  });

  describe("connect redux", () => {
    if (typeof mapDispatchToProps === "function") {
      // ESTE TEST ES POR SI HACES EL MAPDISPATCHTOPROPS COMO UNA FUNCIÓN.
      it("Debería traer por props la funcion deleterecipes de Redux usando mapDispatchToProps", () => {
        // Usamos "mapDispatchToProps", pasamos a props la funcion deleterecipes.
        // Se debe llamar exactamente igual!
        const deleteRecipespy = jest.spyOn(actions, "deleterecipes");
        // expect(mapDispatchToProps.hasOwnProperty("deleterecipes")).toBeTruthy();
        mapDispatchToProps.deleterecipes = deleteRecipespy;
        mapDispatchToProps.deleterecipes(1);
        expect(deleteRecipespy).toHaveBeenCalled();
      });
    } else {
      // ESTE TEST ES POR SI HACES EL MAPDISPATCHTOPROPS COMO UN OBJETO.
      it("Debería traer por props la action creator deleterecipes de Redux usando mapDispatchToProps", () => {
        // Acá tesrecipesos que hagas todo el proceso. Utilizas connect y el objeto "mapDispatchToProps",
        // traes la acción 'deleterecipes' y la despachas.
        const deleteRecipespy = jest.spyOn(actions, "deleterecipes");
        deleteRecipespy(1);
        expect(mapDispatchToProps.hasOwnProperty("deleterecipes")).toBeTruthy();
        expect(deleteRecipespy).toHaveBeenCalled();
      });
    }
  });

  describe("Dispatch to store", () => {
    it('Debería hacer un dispatch al store utilizando la action "deleterecipes" al hacer click en el boton previamente creado. Debe pasarle el Id del recipes', () => {
      expect(mapDispatchToProps.hasOwnProperty("deleterecipes")).toBeTruthy();
      mapDispatchToProps.deleterecipes = actions.deleterecipes;
      recipesCard(recipes1).find("button").simulate("click");
      expect(store.getActions()).toEqual([
        { type: DELETE_recipes, payload: 1 },
      ]);
    });
  });
});
