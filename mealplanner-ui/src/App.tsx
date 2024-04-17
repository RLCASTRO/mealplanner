import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Suspense, useEffect, useState } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./layouts/Layout";
import { LoggedIn } from "./LoggedIn";
import { Login } from "./pages/Login";
import { MealPlan } from "./pages/MealPlans/MealPlan";
import { MealPlans } from "./pages/MealPlans/MealPlans";
import { Meal } from "./pages/Meals/Meal";
import { Meals } from "./pages/Meals/Meals";
import { FavoriteMealPage } from "./pages/Meals/PersonFavoriteMeals";
import { ShoppingList } from "./pages/ShoppingList";
import environment from "./relay/environment";
import { fetchCurrentPerson, initState } from "./state/state";
import TermsAndConditions from './layouts/TermsAndConditions';

const theme = createTheme({
  palette: {
    primary: {
      light: "#8CD068",
      //light: "#E8F3DB",
      main: "#6AA64A",
      dark: "#436D2C",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    grey: {
      800: "#404040",
    },
    info: {
      main: "#ffffff",
    },
  },
});

//Initializing local state from state.ts
initState();

function App() {
  let [intialized, setInitialized] = useState(false);
  let [acceptedTermsAndConditions, setAcceptedTermsAndConditions] = useState(false);

  const handleTermsAndConditions = (accepted: boolean): void => {
    setAcceptedTermsAndConditions(accepted);
  }

  useEffect(() => {
    fetchCurrentPerson().then((data) => {
      // setAcceptedTermsAndConditions(!data?.currentPerson?.role) //update this line with whatever new field that is coming from the graphql query 
      setInitialized(true);
    });
  }, []);
  if (!intialized) {
    return <h1>loading...</h1>;
  }
  return (
    <RelayEnvironmentProvider environment={environment}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/mealplans/:id"
              element={
                <Suspense fallback={"loading inner..."}>
                  <LoggedIn>
                    <MealPlan />
                  </LoggedIn>
                </Suspense>
              }
            />
            <Route
              path="/mealplans/:id/shopping-list"
              element={
                <Suspense fallback={"loading inner..."}>
                  <LoggedIn>
                    <ShoppingList />
                  </LoggedIn>
                </Suspense>
              }
            />
            <Route
              path="/mealplans"
              element={
                <Suspense fallback={"loading Mealplans list..."}>
                  <LoggedIn>
                    {!acceptedTermsAndConditions ? (
                      <TermsAndConditions
                        acceptedTermsAndConditions={acceptedTermsAndConditions}
                        handleTermsAndConditions={handleTermsAndConditions}
                      />
                    ) : (
                      <MealPlans />
                    )}
                  </LoggedIn>
                </Suspense>
              }
            />
            <Route
              path="/meals"
              element={
                <Suspense fallback={"loading Meals list..."}>
                  {/* <LoggedIn> */}
                  <Meals />
                  {/* </LoggedIn> */}
                </Suspense>
              }
            />
            <Route
              path="/meals/:id"
              element={
                <Suspense fallback={"loading inner..."}>
                  {/* <LoggedIn> */}
                  <Meal />
                  {/* <LoggedIn> */}
                </Suspense>
              }
            />
            <Route
              path={`/meals/:slug/favorites`}
              element={
                <Suspense fallback={"loading favorite meals.."}>
                  <LoggedIn>
                    <FavoriteMealPage />
                  </LoggedIn>
                </Suspense>
              }
            />
            <Route
              path="/"
              element={
                <Suspense fallback={"loading Login..."}>
                  <Login />
                </Suspense>
              }
            >
              {" "}
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  );
}

export default App;
