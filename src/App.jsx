import { useEffect, useState } from "react";
import FilmsData from "./filmData";

function App() {
  const [data, setData] = useState(FilmsData);
  const [favIsOpen, setFavIsOpen] = useState(false);
  const [favData, setFavData] = useState(
    JSON.parse(localStorage.getItem("favData")) || []
  );
  const [currentOption, setCurrentOption] = useState(FilmsData[0]);
  const [isOptionOpne, setIsOptionOpne] = useState(false);

  //

  const handleChange = (e) => {
    console.log(e.target.value);

    let filteredArr = [];

    for (let element of FilmsData) {
      let title = element.title.toLowerCase().replaceAll(" ", "");

      if (title.slice(0, e.target.value.length) == e.target.value) {
        filteredArr.push(element);
      }
    }

    console.log(filteredArr);
    setData(filteredArr);
  };

  const openFavorites = () => {
    setFavIsOpen(!favIsOpen);
    console.log(favIsOpen);
  };

  const heart = (e) => {
    const filmId = Number(e.target.id);
    const film = FilmsData.find((f) => f.id === filmId);

    setFavData((prev) => {
      const isAlreadyInFavorites = prev.some((f) => f.id === filmId);

      if (isAlreadyInFavorites) {
        return prev.filter((f) => f.id !== filmId);
      } else {
        // return [...prev, FilmsData[e.target.id]]
        return [...prev, film];
      }
    });

    console.log(favData);
  };

  useEffect(() => {
    localStorage.setItem("favData", JSON.stringify(favData));
  }, [favData]);

  const clickPhoto = (e) => {
    setCurrentOption(FilmsData[e.target.id]);
    setIsOptionOpne(true);
  };

  return (
    <>
      <header className="flex justify-around p-2">
        <div className="flex gap-10 max-sm:flex-col max-sm:gap-5">
          <h1 className="text-3xl">MyFilms</h1>

          <input
            type="text"
            className="border p-2 rounded-sm"
            placeholder="search"
            onChange={handleChange}
          />

        </div>

        <i
          onClick={openFavorites}
          className="fa-solid fa-basket-shopping text-2xl cursor-pointer"
        ></i>
      </header>

      <aside
        className={`${
          favIsOpen ? "visible" : "hidden"
        } h-full w-100   bg-amber-100 fixed right-0 max-sm:w-full max-sm:mt-3 p-2  z-50`}
      >
        <ul className="flex flex-col gap-3">
          {favData.map((item, index) => {
            return (
              <li key={index} className="flex gap-2  items-center">
                <img src={item.img} className="w-[50px]" alt="" />
                <p>{item.title}</p>
              </li>
            );
          })}
        </ul>
      </aside>

      <main>

          <section className="w-full h-screen mt-5 relative flex justify-center items-center ">
            <img className="absolute top-0 brightness-50 h-screen w-full object-cover " src="https://daily.kellogg.edu/wp-content/uploads/2018/08/film-interpretation.jpg" alt="" />
            <h2 className="text-7xl text-white z-10 relative tracking-wide text-center max-sm:text-5xl">Welcome our Film industry</h2>

          </section>








        <section className="grid grid-cols-4 p-11 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 mt-20">
          {data.map((item, index) => {
            return (
              <div className="p-4" id={item.id} key={index}>
                <h2>{item.title}</h2>
                <img 
                  id={item.id}
                  className="w-56"
                  src={item.img}
                  alt=""
                  onClick={clickPhoto}
                />
                <p>Rating: {item.rating} / 10</p>
                <i
                  id={item.id}
                  className={`fa-solid fa-heart cursor-pointer ${
                    favData.some((f) => f.id === item.id) ? "text-red-500" : ""
                  }`}
                  onClick={heart}
                ></i>
              </div>
            );
          })}
        </section>

        <section
          className={`fixed z-50 w-full h-full  top-0  ${
            isOptionOpne ? "visible" : "hidden"
          }   `}
        >
          <div className="flex max-lg:flex-col ">
            <img
              className="h-screen max-lg:w-full object-cover"
              src={currentOption.img}
              alt=""
            />
            <div className="p-5 pt-20 text-white bg-[#0000007a]  backdrop-blur-sm">
              <h2 className="text-5xl">{currentOption.title} <span className="text-sm">year: <b>{currentOption.year}</b></span></h2>
              <p className="mt-3">{currentOption.desc}</p>
              <p className="mt-10">
                Rating <b>{currentOption.rating}/10</b>
              </p>
              <i
                id={currentOption.id}
                className={`fa-solid fa-heart cursor-pointer ${
                  favData.some((f) => f.id === currentOption.id)
                    ? "text-red-500"
                    : ""
                }`}
                onClick={heart}
              ></i>
            </div>
          </div>
          <i
            className="fa-solid fa-xmark absolute top-[20px] right-[20px] text-3xl cursor-pointer text-white"
            onClick={() => {
              setIsOptionOpne(false);
              console.log(isOptionOpne);
            }}
          ></i>
        </section>
      </main>



      <footer className="w-full h-64 bg-black flex items-center p-6 text-white flex-col gap-4">
            <h2 className="text-3xl">MyFilms</h2>
            <p>ფილმები</p>
            <p>email@gmail.com</p>
      </footer>
    </>
  );
}

export default App;
