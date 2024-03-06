import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CopyToClipboard from "react-copy-to-clipboard";
import { TextareaAutosize } from "@mui/material";
import copyIcon from "../asset/icon/copyIconDoc.svg";
import copiedIcon from "../asset/icon/copiedIcon.svg";

export default function DocumentationPage() {
  const [buttons, setButtons] = useState([
    { id: 1, text: "Show output" },
    { id: 2, text: "Show output" },
    { id: 3, text: "Show output" },
    { id: 4, text: "Show output" },
    { id: 5, text: "Show output" },
    { id: 6, text: "Show output" },
    { id: 7, text: "Show output" },
    { id: 8, text: "Show output" },
    { id: 9, text: "Show output" },
    { id: 10, text: "Show output" },
    { id: 11, text: "Show output" },
    { id: 12, text: "Show output" },
    { id: 13, text: "Show output" },
    { id: 14, text: "Show output" },
    { id: 15, text: "Show output" },
  ]);

  const [activeLink, setActiveLink] = useState("");

  const jsonHubDomain = "http://localhost:8080/api/v1";

  const jsonObjectPlayers = {
    id: 1,
    born: {
      day: "24",
      year: "1987",
      month: "June",
      place: {
        city: "Rosario",
        country: "Argentina",
      },
    },
    name: "Lionel Messi",
    team: "Paris Saint-Germain FC",
    shirt: "30",
    height: "1.70 m",
    parents: [
      {
        id: 1,
        name: "Jorge Messi",
        relation: "Father",
      },
      {
        id: 2,
        name: "Celia María Cuccittini",
        relation: "Mother",
      },
    ],
    position: "Forward",
    username: "Messi",
  };

  const jsonObjectProducts = {
    id: 1,
    name: "Samsung Galaxy S21 Ultra",
    price: "1199.99",
    stock: 100,
    reviews: [
      {
        user: "John",
        rating: 4,
        comment: "Great phone, but the camera could be better.",
      },
      {
        user: "Mary",
        rating: 5,
        comment:
          "This phone is amazing! The camera is the best I`ve ever used.",
      },
    ],
    category: "Electronics",
    currency: "USD",
    features: {
      RAM: "12 GB",
      Camera: "108 MP",
      Display: "6.8 inches",
      Storage: "128 GB",
    },
    description:
      "The Samsung Galaxy S21 Ultra is the ultimate smartphone experience......",
    manufacture: "Samsung",
  };

  const jsonObjectTrips = {
    id: 1,
    name: "Angkor wat",
    hotel: {
      name: "Sokha hotel",
      place: {
        city: "Krong Siem Reap",
        country: "Cambodia",
      },
      price: "20",
    },
    description:
      "Angkor is a standout amongst the most imperative archeological......",
  };

  const jsonTextPlayer = JSON.stringify(jsonObjectPlayers, null, 2);
  const jsonTextProduct = JSON.stringify(jsonObjectProducts, null, 2);
  const jsonTextTrip = JSON.stringify(jsonObjectTrips, null, 2);

  //url for players
  const textToCopyGetAllPlayer = `fetch('${jsonHubDomain}/predefine/get-all-players')
  .then(res => res.json())
  .then(json => console.log(json));`;

  const textToCopyGetASinglePlayer = `fetch('${jsonHubDomain}/predefine/get-player-by-id/1')
  .then(res => res.json())
  .then(json => console.log(json));`;

  const textToCopyAddAPlayer = `fetch('${jsonHubDomain}/predefine/insert/player', {
          method: "POST",
          body: JSON.stringify({
              key: value,
          }),
          headers: {'Content-Type':'application/json'}
  })
    .then(res => res.json())
    .then(json => console.log(json));`;

  const textToCopyUpdateAPlayer = `fetch('${jsonHubDomain}/predefine/update-player-id/1', {
          method: "PUT",
          body: JSON.stringify({
              key: value,
          }),
          headers: {'Content-Type':'application/json'}
  })
    .then(res => res.json())
    .then(json => console.log(json));`;

  const textToCopyDeleteAPlayer = `fetch('${jsonHubDomain}/predefine/delete-player-by-id/1', {
          method: "DELETE",
  })
    .then(res => res.json())
    .then(json => console.log(json));`;

  //url for products
  const textToCopyGetAllProduct = `fetch('${jsonHubDomain}/predefine/get-all-products')
  .then(res => res.json())
  .then(json => console.log(json));`;

  const textToCopyGetASingleProduct = `fetch('${jsonHubDomain}/predefine/get-products-by-id/1')
  .then(res => res.json())
  .then(json => console.log(json));`;

  const textToCopyAddAProduct = `fetch('${jsonHubDomain}/predefine/insert/products', {
          method: "POST",
          body: JSON.stringify({
              key: value,
          }),
          headers: {'Content-Type':'application/json'}
  })
    .then(res => res.json())
    .then(json => console.log(json));`;

  const textToCopyUpdateAProduct = `fetch('${jsonHubDomain}/predefine/products/1', {
          method: "PUT",
          body: JSON.stringify({
              key: value,
          }),
          headers: {'Content-Type':'application/json'}
  })
    .then(res => res.json())
    .then(json => console.log(json));`;

  const textToCopyDeleteAProduct = `fetch('${jsonHubDomain}/predefine/delete-products-by-id/1', {
          method: "DELETE",
  })
    .then(res => res.json())
    .then(json => console.log(json));`;

  //url for trips
  const textToCopyGetAllTrip = `fetch('${jsonHubDomain}/predefine/get-all-trip')
  .then(res => res.json())
  .then(json => console.log(json));`;

  const textToCopyGetASingleTrip = `fetch('${jsonHubDomain}/predefine/get-trip-by-id/1')
  .then(res => res.json())
  .then(json => console.log(json));`;

  const textToCopyAddATrip = `fetch('${jsonHubDomain}/predefine/insert/trip', {
          method: "POST",
          body: JSON.stringify({
              key: value,
          }),
          headers: {'Content-Type':'application/json'}
  })
    .then(res => res.json())
    .then(json => console.log(json));`;

  const textToCopyUpdateATrip = `fetch('${jsonHubDomain}/predefine/update-trip-by-id/1', {
          method: "PUT",
          body: JSON.stringify({
              key: value,
          }),
          headers: {'Content-Type':'application/json'}
  })
    .then(res => res.json())
    .then(json => console.log(json));`;

  const textToCopyDeleteATrip = `fetch('${jsonHubDomain}/predefine/delete-trip-by-id/1', {
          method: "DELETE",
  })
    .then(res => res.json())
    .then(json => console.log(json));`;

  const [urls, setUrls] = useState([
    {
      id: 1,
      url: textToCopyGetAllPlayer,
      isCopied: false,
      textRef: useRef(null),
    },
    {
      id: 2,
      url: textToCopyGetASinglePlayer,
      isCopied: false,
      textRef: useRef(null),
    },
    {
      id: 3,
      url: textToCopyAddAPlayer,
      isCopied: false,
      textRef: useRef(null),
    },
    {
      id: 4,
      url: textToCopyUpdateAPlayer,
      isCopied: false,
      textRef: useRef(null),
    },
    {
      id: 5,
      url: textToCopyDeleteAPlayer,
      isCopied: false,
      textRef: useRef(null),
    },
    {
      id: 6,
      url: textToCopyGetAllProduct,
      isCopied: false,
      textRef: useRef(null),
    },
    {
      id: 7,
      url: textToCopyGetASingleProduct,
      isCopied: false,
      textRef: useRef(null),
    },
    {
      id: 8,
      url: textToCopyAddAProduct,
      isCopied: false,
      textRef: useRef(null),
    },
    {
      id: 9,
      url: textToCopyUpdateAProduct,
      isCopied: false,
      textRef: useRef(null),
    },
    {
      id: 10,
      url: textToCopyDeleteAProduct,
      isCopied: false,
      textRef: useRef(null),
    },
    {
      id: 11,
      url: textToCopyGetAllTrip,
      isCopied: false,
      textRef: useRef(null),
    },
    {
      id: 12,
      url: textToCopyGetASingleTrip,
      isCopied: false,
      textRef: useRef(null),
    },
    {
      id: 13,
      url: textToCopyAddATrip,
      isCopied: false,
      textRef: useRef(null),
    },
    {
      id: 14,
      url: textToCopyUpdateATrip,
      isCopied: false,
      textRef: useRef(null),
    },
    {
      id: 15,
      url: textToCopyDeleteATrip,
      isCopied: false,
      textRef: useRef(null),
    },
  ]);

  const updateBtnHandler = (id) => {
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === id
          ? {
              ...button,
              text:
                button.text === "Show output" ? "Hide output" : "Show output",
            }
          : button
      )
    );
  };

  const handleClickActiveLink = (e) => {
    setActiveLink(e);
  };

  const copyTextHandler = (index) => {
    const updatedSetUrls = [...urls];
    const url = updatedSetUrls[index];
    const textRef = url.textRef;

    if (textRef.current) {
      textRef.current.select();
      document.execCommand("copy");
      url.isCopied = true;
      setTimeout(() => {
        url.isCopied = false;
      }, 500);
      setUrls(updatedSetUrls);
    }
  };

  function handleClickScroll(link, e) {
    const element = document.getElementById(link);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      AOS.init();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div className="12pro:w-[390px] ipad-pro:w-[1024px] laptop:w-[1536px]">
        {/* documentation page */}
        <div class=" grid grid-cols-3 12pro:px-10 laptop:px-40 px-32 12pro:w-full ipad-pro:w-[100%] justify-between mt-10">
          {/* sidebar */}
          <aside
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="600"
            id="default-sidebar"
            className=" overflow-y-auto max-h-screen 12pro:hidden ipad-pro:inline-flex laptop:inline-flex"
            aria-label="Sidebar"
          >
            <div className="h-full flex flex-col">
              <div className="mt-0">
                {/* sidebar players */}
                <ul className="space-y-2 w-full text-sm font-montserrat list-none">
                  <li className="">
                    <a
                      href="#players"
                      className={
                        activeLink === "players"
                          ? "px-[55.5px] text-newYellow rounded-full bg-dark-head flex items-center hover:text-white font-poppins text-lg font-extrabold"
                          : "nav-link rounded-full flex justify-center px-10 text-dark-head hover:text-white font-poppins text-lg font-extrabold"
                      }
                      onClick={(e) => {
                        handleClickScroll("players", e);
                        handleClickActiveLink("players");
                      }}
                    >
                      <span>Players</span>
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      href="#get-all-players"
                      className={
                        activeLink === "get-all-players"
                          ? "text-newYellow rounded-full bg-dark-head hover:text-white px-2 py-1"
                          : "nav-link rounded-full px-2 py-1"
                      }
                      onClick={(e) => {
                        handleClickScroll("get-all-players", e);
                        handleClickActiveLink("get-all-players");
                      }}
                    >
                      <span>Get all players</span>
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      href="#get-single-players"
                      className={
                        activeLink === "get-single-players"
                          ? "text-newYellow rounded-full bg-dark-head hover:text-white px-2 py-1 mt-10"
                          : "nav-link rounded-full px-2 py-1"
                      }
                      onClick={(e) => {
                        handleClickScroll("get-single-players", e);
                        handleClickActiveLink("get-single-players");
                      }}
                    >
                      <span>Get a single player</span>
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      href="#add-a-player"
                      className={
                        activeLink === "add-a-player"
                          ? "text-newYellow rounded-full bg-dark-head hover:text-white px-2 py-1 mt-10"
                          : "nav-link rounded-full px-2 py-1"
                      }
                      onClick={(e) => {
                        handleClickScroll("add-a-player", e);
                        handleClickActiveLink("add-a-player");
                      }}
                    >
                      <span>Add a player</span>
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      href="#update-a-player"
                      className={
                        activeLink === "update-a-player"
                          ? "text-newYellow rounded-full bg-dark-head hover:text-white px-2 py-1 mt-10"
                          : "nav-link rounded-full px-2 py-1"
                      }
                      onClick={(e) => {
                        handleClickScroll("update-a-player", e);
                        handleClickActiveLink("update-a-player");
                      }}
                    >
                      <span>Update a player</span>
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      href="#delete-a-player"
                      className={
                        activeLink === "delete-a-player"
                          ? "text-newYellow rounded-full bg-dark-head hover:text-white px-2 py-1 mt-10"
                          : "nav-link rounded-full px-2 py-1"
                      }
                      onClick={(e) => {
                        handleClickScroll("delete-a-player", e);
                        handleClickActiveLink("delete-a-player");
                      }}
                    >
                      <span>Delete a player</span>
                    </a>
                  </li>
                </ul>
                {/* sidebar products */}
                <ul className="space-y-2 w-full text-sm font-montserrat list-none mt-6">
                  <li>
                    <a
                      href="#Products"
                      className={
                        activeLink === "Products"
                          ? "px-12 text-newYellow rounded-full bg-dark-head flex items-center hover:text-white font-poppins text-lg font-extrabold"
                          : "nav-link rounded-full flex justify-center px-12 text-dark-head hover:text-white font-poppins text-lg font-extrabold"
                      }
                      onClick={(e) => {
                        handleClickScroll("Products", e);
                        handleClickActiveLink("Products");
                      }}
                    >
                      <span>Products</span>
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      href="#get-all-products"
                      className={
                        activeLink === "get-all-products"
                          ? "text-newYellow rounded-full bg-dark-head hover:text-white px-2 py-1 mt-10"
                          : "nav-link rounded-full px-2 py-1"
                      }
                      onClick={(e) => {
                        handleClickScroll("get-all-products", e);
                        handleClickActiveLink("get-all-products");
                      }}
                    >
                      <span>Get all products</span>
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      href="#get-single-products"
                      className={
                        activeLink === "get-single-products"
                          ? "text-newYellow rounded-full bg-dark-head hover:text-white px-2 py-1 mt-10"
                          : "nav-link rounded-full px-2 py-1"
                      }
                      onClick={(e) => {
                        handleClickScroll("get-single-products", e);
                        handleClickActiveLink("get-single-products");
                      }}
                    >
                      <span>Get a single product</span>
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      href="#add-a-product"
                      className={
                        activeLink === "add-a-product"
                          ? "text-newYellow rounded-full bg-dark-head hover:text-white px-2 py-1 mt-10"
                          : "nav-link rounded-full px-2 py-1"
                      }
                      onClick={(e) => {
                        handleClickScroll("add-a-product", e);
                        handleClickActiveLink("add-a-product");
                      }}
                    >
                      <span>Add a product</span>
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      href="#update-a-product"
                      className={
                        activeLink === "update-a-product"
                          ? "text-newYellow rounded-full bg-dark-head hover:text-white px-2 py-1 mt-10"
                          : "nav-link rounded-full px-2 py-1"
                      }
                      onClick={(e) => {
                        handleClickScroll("update-a-product", e);
                        handleClickActiveLink("update-a-product");
                      }}
                    >
                      <span>Update a product</span>
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      href="#delete-a-product"
                      className={
                        activeLink === "delete-a-product"
                          ? "text-newYellow rounded-full bg-dark-head hover:text-white px-2 py-1 mt-10"
                          : "nav-link rounded-full px-2 py-1"
                      }
                      onClick={(e) => {
                        handleClickScroll("delete-a-product", e);
                        handleClickActiveLink("delete-a-product");
                      }}
                    >
                      <span>Delete a product</span>
                    </a>
                  </li>
                </ul>
                {/* sidebar trips */}
                <ul className="space-y-2 w-full text-sm font-montserrat list-none mt-6">
                  <li>
                    <a
                      href="#Trips"
                      className={
                        activeLink === "Trips"
                          ? "px-[66.5px] text-newYellow rounded-full bg-dark-head flex items-center hover:text-white font-poppins text-lg font-extrabold"
                          : "nav-link rounded-full flex justify-center px-[30px] text-dark-head hover:text-white font-poppins text-lg font-extrabold"
                      }
                      onClick={(e) => {
                        handleClickScroll("Trips", e);
                        handleClickActiveLink("Trips");
                      }}
                    >
                      <span>Trips</span>
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      href="#get-all-trip"
                      className={
                        activeLink === "get-all-trip"
                          ? "text-newYellow rounded-full bg-dark-head hover:text-white px-2 py-1 mt-10"
                          : "nav-link rounded-full px-2 py-1"
                      }
                      onClick={(e) => {
                        handleClickScroll("get-all-trip", e);
                        handleClickActiveLink("get-all-trip");
                      }}
                    >
                      <span>Get all trips</span>
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      href="#get-single-trip"
                      className={
                        activeLink === "get-single-trip"
                          ? "text-newYellow rounded-full bg-dark-head hover:text-white px-2 py-1 mt-10"
                          : "nav-link rounded-full px-2 py-1"
                      }
                      onClick={(e) => {
                        handleClickScroll("get-single-trip", e);
                        handleClickActiveLink("get-single-trip");
                      }}
                    >
                      <span>Get a single trip</span>
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      href="#add-a-trip"
                      className={
                        activeLink === "add-a-trip"
                          ? "text-newYellow rounded-full bg-dark-head hover:text-white px-2 py-1 mt-10"
                          : "nav-link rounded-full px-2 py-1"
                      }
                      onClick={(e) => {
                        handleClickScroll("add-a-trip", e);
                        handleClickActiveLink("add-a-trip");
                      }}
                    >
                      <span>Add a trip</span>
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      href="#update-a-trip"
                      className={
                        activeLink === "update-a-trip"
                          ? "text-newYellow rounded-full bg-dark-head hover:text-white px-2 py-1 mt-10"
                          : "nav-link rounded-full px-2 py-1"
                      }
                      onClick={(e) => {
                        handleClickScroll("update-a-trip", e);
                        handleClickActiveLink("update-a-trip");
                      }}
                    >
                      <span>Update a trip</span>
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      href="#delete-a-trip"
                      className={
                        activeLink === "delete-a-trip"
                          ? "text-newYellow rounded-full bg-dark-head hover:text-white px-2 py-1 mt-10"
                          : "nav-link rounded-full px-2 py-1"
                      }
                      onClick={(e) => {
                        handleClickScroll("delete-a-trip", e);
                        handleClickActiveLink("delete-a-trip");
                      }}
                    >
                      <span>Delete a trip</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* content */}
          <div
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="600"
            id="default-sidebar"
            className=" overflow-y-auto max-h-screen h-full 12pro:w-full ipad-pro:w-full laptop:w-full col-span-2 py-3 font-montserrat"
          >
            <div className="">
              {/* how to use it texts */}
              <div className="flex flex-col 12pro:w-[310px] ipad-pro:w-full laptop:w-full">
                <span className="12pro:w-full ipad-pro:w-full laptop:w-full font-poppins text-newYellow text-xl font-black">
                  How to use it
                </span>
                <span className="text-sm mt-5 w-1/2 12pro:w-[300px] ipad-pro:w-[400px] laptop:w-[400px]">
                  <span className="font-black italic">JSONHub</span> can be used
                  with any type of front end project that needs sports,
                  products, trips data in JSON format. You can use examples
                  below to check how{" "}
                  <span className="font-black italic">JSONHub</span> works. Feel
                  free to enjoy it in your awesome projects!
                </span>
              </div>

              {/* players content */}
              <div className="mt-20 12pro:w-[310px] ipad-pro:w-[100%] laptop:w-[810px]">
                {/* title players */}
                <div>
                  <span
                    id="players"
                    className={`font-poppins text-xl font-black text-newYellow`}
                  >
                    Players
                    <div className="h-0.5 bg-document rounded-sm mt-1"></div>
                  </span>
                </div>

                {/* get all players content */}
                <div className="mt-10">
                  <span
                    id="get-all-players"
                    className="font-poppins italic font-black text-lg"
                  >
                    Get all players
                  </span>
                  {/* link url for fetch box  */}
                  <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain font-semibold">
                    <p className="12pro:w-[270px] ipad-pro:w-full laptop:w-full">
                      <p
                        key={urls[0].id}
                        className="12pro:w-[270px] ipad-pro:w-full laptop:w-full w-full flex"
                      >
                        <TextareaAutosize
                          className="w-full border-none bg-document focus:ring-0 text-sm resize-none"
                          ref={urls[0].textRef}
                          value={urls[0].url}
                          readOnly
                        />
                        <div className="">
                          <CopyToClipboard text={urls[0].url}>
                            <button onClick={() => copyTextHandler(0)}>
                              <img
                                src={urls[0].isCopied ? copiedIcon : copyIcon}
                                alt=""
                              />
                            </button>
                          </CopyToClipboard>
                        </div>
                      </p>
                    </p>
                  </div>

                  {/* button show output */}
                  <div className="mt-7">
                    <button
                      key={buttons[0].id}
                      name="status"
                      onClick={() => updateBtnHandler(1)}
                      type="button"
                      className="focus:outline-none ipad-pro:w-1/6 text-dark-head hover:bg-dark-head hover:text-newYellow bg-newYellow border-0 laptop:w-[13%] capitalize  btn btn-sm btn-primary delay-50 rounded-lg text-[12px] font-poppins mb-2"
                    >
                      {buttons[0].text}
                    </button>
                  </div>

                  {/* show response body when click button show output */}
                  <div
                    className={`${
                      buttons[0].text === "Show output" ? "hidden" : ""
                    }`}
                  >
                    <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain text-sm font-semibold">
                      <p className="w-full 12pro:w-[270px] ipad-pro:w-full laptop:w-[500px]">
                        <p className="text-newYellow">{`//output`}</p>
                        <p>{"{"}</p>
                        <p className="px-3 ">"data": [</p>
                        <p className="px-6">
                          <pre>{jsonTextPlayer},</pre>
                          <p className="text-newYellow">{`// 50 items`}</p>
                        </p>
                        <p className="px-3">]</p>
                        {"}"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* get a single player content */}
                <div className="mt-10">
                  <span
                    id="get-single-players"
                    className="font-poppins italic font-black text-lg"
                  >
                    Get a single player
                  </span>
                  {/* link url for fetch box  */}
                  <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain font-semibold">
                    <p className="12pro:w-[270px] ipad-pro:w-full laptop:w-full">
                      <p
                        key={urls[1].id}
                        className="12pro:w-[270px] ipad-pro:w-full laptop:w-full w-full flex"
                      >
                        <TextareaAutosize
                          className="w-full border-none bg-document focus:ring-0 text-sm resize-none"
                          ref={urls[1].textRef}
                          value={urls[1].url}
                          readOnly
                        />
                        <div className="">
                          <CopyToClipboard text={urls[1].url}>
                            <button onClick={() => copyTextHandler(1)}>
                              <img
                                src={urls[1].isCopied ? copiedIcon : copyIcon}
                                alt=""
                              />
                            </button>
                          </CopyToClipboard>
                        </div>
                      </p>
                    </p>
                  </div>

                  {/* button show output */}
                  <div className="mt-7">
                    <button
                      key={buttons[1].id}
                      name="status"
                      onClick={() => updateBtnHandler(2)}
                      type="button"
                      className="focus:outline-none ipad-pro:w-1/6 laptop:w-[13%] capitalize text-dark-head hover:bg-dark-head border-0 delay-50 hover:text-newYellow bg-newYellow btn btn-sm btn-primary  rounded-lg text-[12px] font-poppins mb-2"
                    >
                      {buttons[1].text}
                    </button>
                  </div>

                  {/* show response body when click button show output */}
                  <div
                    className={`${
                      buttons[1].text === "Show output" ? "hidden" : ""
                    }`}
                  >
                    <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain text-sm font-semibold">
                      <p className="w-1/2 12pro:w-[270px] ipad-pro:w-full  laptop:w-[500px]">
                        <p className="text-newYellow">{`//output`}</p>
                        <p>{"{"}</p>
                        <p className="px-3">"data":</p>
                        <p className="px-6 text-dark-head">
                          <pre>{jsonTextPlayer}</pre>
                        </p>
                        <p className="px-3 text-dark-head">{"}"}</p>
                      </p>
                    </div>
                  </div>
                </div>

                {/* add a player content */}
                <div className="mt-10">
                  <span
                    id="add-a-player"
                    className="font-poppins italic font-black text-lg"
                  >
                    Add a player
                  </span>
                  <p className="italic text-sm font-black text-dark-head">
                    Important :{" "}
                    <span className="text-dark-head font-montserrat font-normal">
                      resource will not be really added on the server but it
                      will be faked as if.
                    </span>
                  </p>
                  {/* link url for fetch box  */}
                  <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain font-semibold">
                    <p className="12pro:w-[270px] ipad-pro:w-full laptop:w-full">
                      <p
                        key={urls[2].id}
                        className="12pro:w-[270px] ipad-pro:w-full laptop:w-full w-full flex"
                      >
                        <TextareaAutosize
                          className="w-full border-none bg-document focus:ring-0 text-sm resize-none"
                          ref={urls[2].textRef}
                          value={urls[2].url}
                          readOnly
                        />
                        <div className="">
                          <CopyToClipboard text={urls[2].url}>
                            <button onClick={() => copyTextHandler(2)}>
                              <img
                                src={urls[2].isCopied ? copiedIcon : copyIcon}
                                alt=""
                              />
                            </button>
                          </CopyToClipboard>
                        </div>
                      </p>
                    </p>
                  </div>

                  {/* button show output */}
                  <div className="mt-7">
                    <button
                      key={buttons[2].id}
                      name="status"
                      onClick={() => updateBtnHandler(3)}
                      type="button"
                      className="focus:outline-none ipad-pro:w-1/6 laptop:w-[13%] capitalize text-dark-head hover:bg-dark-head border-0 delay-50 hover:text-newYellow bg-newYellow btn btn-sm btn-primary rounded-lg text-[12px] font-poppins mb-2"
                    >
                      {buttons[2].text}
                    </button>
                  </div>

                  {/* show response body when click button show output */}
                  <div
                    className={`${
                      buttons[2].text === "Show output" ? "hidden" : ""
                    }`}
                  >
                    <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain text-sm font-semibold">
                      <p className="w-1/2 12pro:w-[270px] ipad-pro:w-full laptop:w-[500px]">
                        <p className="text-newYellow">{`//output`}</p>
                        <p>{"{"}</p>
                        <p className="px-3">"data": {"{"}</p>
                        <p className="px-6 text-dark-head">
                          <p className="px-3 text-dark-head">
                            {" "}
                            "id": 51, <br />
                            key: value, <br />
                          </p>
                        </p>
                        <p className="px-3 text-dark-head">{"}"}</p>
                        {"}"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* update a player content */}
                <div className="mt-10">
                  <span
                    id="update-a-player"
                    className="font-poppins italic text-dark-head font-black text-lg"
                  >
                    Update a player
                  </span>
                  <p className="italic text-sm font-black text-dark-head">
                    Important :{" "}
                    <span className="text-dark-head font-montserrat font-normal">
                      resource will not be really updated on the server but it
                      will be faked as if.
                    </span>
                  </p>
                  {/* link url for fetch box  */}
                  <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain font-semibold">
                    <p className="12pro:w-[270px] ipad-pro:w-full laptop:w-full">
                      <p
                        key={urls[3].id}
                        className="12pro:w-[270px] ipad-pro:w-full laptop:w-full w-full flex"
                      >
                        <TextareaAutosize
                          className="w-full border-none bg-document focus:ring-0 text-sm resize-none"
                          ref={urls[3].textRef}
                          value={urls[3].url}
                          readOnly
                        />
                        <div className="">
                          <CopyToClipboard text={urls[3].url}>
                            <button onClick={() => copyTextHandler(3)}>
                              <img
                                src={urls[2].isCopied ? copiedIcon : copyIcon}
                                alt=""
                              />
                            </button>
                          </CopyToClipboard>
                        </div>
                      </p>
                    </p>
                  </div>

                  {/* button show output */}
                  <div className="mt-7">
                    <button
                      key={buttons[3].id}
                      name="status"
                      onClick={() => updateBtnHandler(4)}
                      type="button"
                      className="focus:outline-none ipad-pro:w-1/6 laptop:w-[13%] capitalize text-dark-head hover:bg-dark-head border-0 delay-50 hover:text-newYellow bg-newYellow btn btn-sm btn-primary rounded-lg text-[12px] font-poppins mb-2"
                    >
                      {buttons[3].text}
                    </button>
                  </div>

                  {/* show response body when click button show output */}
                  <div
                    className={`${
                      buttons[3].text === "Show output" ? "hidden" : ""
                    }`}
                  >
                    <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain text-sm font-semibold">
                      <p className="w-1/2 12pro:w-[270px] ipad-pro:w-full laptop:w-[500px]">
                        <p className="text-newYellow">{`//output`}</p>
                        <p className="text-dark-head">{"{"}</p>
                        <p className="px-3 text-dark-head">"data": {"{"}</p>
                        <p className="px-6 text-dark-head">
                          <p className="px-3 text-dark-head">
                            {" "}
                            "id": 1, <br />
                            key: value,
                          </p>
                        </p>
                        <p className="px-3 text-dark-head">{"}"}</p>
                        {"}"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* delete a player content */}
                <div className="mt-10">
                  <span
                    id="delete-a-player"
                    className="font-poppins text-dark-head italic font-black text-lg"
                  >
                    Delete a player
                  </span>
                  <p className="italic text-sm font-black text-dark-head">
                    Important :{" "}
                    <span className="text-dark-head font-montserrat font-normal">
                      resource will not be really deleted on the server but it
                      will be faked as if.
                    </span>
                  </p>
                  {/* link url for fetch box  */}
                  <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain font-semibold">
                    <p className="12pro:w-[270px] ipad-pro:w-full laptop:w-full">
                      <p
                        key={urls[4].id}
                        className="12pro:w-[270px] ipad-pro:w-full laptop:w-full w-full flex"
                      >
                        <TextareaAutosize
                          className="w-full border-none bg-document focus:ring-0 text-sm resize-none"
                          ref={urls[4].textRef}
                          value={urls[4].url}
                          readOnly
                        />
                        <div className="">
                          <CopyToClipboard text={urls[4].url}>
                            <button onClick={() => copyTextHandler(4)}>
                              <img
                                src={urls[4].isCopied ? copiedIcon : copyIcon}
                                alt=""
                              />
                            </button>
                          </CopyToClipboard>
                        </div>
                      </p>
                    </p>
                  </div>

                  {/* button show output */}
                  <div className="mt-7">
                    <button
                      key={buttons[4].id}
                      name="status"
                      onClick={() => updateBtnHandler(5)}
                      type="button"
                      className="focus:outline-none ipad-pro:w-1/6 laptop:w-[13%] capitalize text-dark-head hover:bg-dark-head border-0 delay-50 hover:text-newYellow bg-newYellow btn btn-sm btn-primary rounded-lg text-[12px] font-poppins mb-2"
                    >
                      {buttons[4].text}
                    </button>
                  </div>

                  {/* show response body when click button show output */}
                  <div
                    className={`${
                      buttons[4].text === "Show output" ? "hidden" : ""
                    }`}
                  >
                    <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain text-sm font-semibold">
                      <p className="w-1/2 12pro:w-[270px] ipad-pro:w-full laptop:w-[500px]">
                        <p className="text-newYellow">{`//output`}</p>
                        <p>{"{"}</p>
                        <p className="px-3 text-dark-head">"data": {"{"}</p>
                        <p className="px-6 text-dark-head">
                          <p className="px-3 text-dark-head">
                            {" "}
                            "id": 1, <br />
                            key: value,
                          </p>
                        </p>
                        <p className="px-3 text-dark-head">{"}"}</p>
                        {"}"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* products content */}
              <div className="mt-20 12pro:w-[310px] ipad-pro:w-[100%] laptop:w-[810px]">
                {/* title product */}
                <div>
                  <span
                    id="Products"
                    className="font-poppins text-xl font-black text-newYellow"
                  >
                    Products
                    <div className="h-0.5 bg-document rounded-sm mt-1"></div>
                  </span>
                </div>

                {/* get all products content */}
                <div className="mt-10">
                  <span
                    id="get-all-products"
                    className="font-poppins italic text-dark-head font-black text-lg"
                  >
                    Get all products
                  </span>
                  {/* link url for fetch box  */}
                  <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg text-dark-head font-jetbrain font-semibold">
                    <p className="12pro:w-[270px] ipad-pro:w-full laptop:w-full">
                      <p
                        key={urls[5].id}
                        className="12pro:w-[270px] ipad-pro:w-full laptop:w-full w-full flex"
                      >
                        <TextareaAutosize
                          className="w-full border-none bg-document focus:ring-0 text-sm resize-none"
                          ref={urls[5].textRef}
                          value={urls[5].url}
                          readOnly
                        />
                        <div className="">
                          <CopyToClipboard text={urls[5].url}>
                            <button onClick={() => copyTextHandler(5)}>
                              <img
                                src={urls[5].isCopied ? copiedIcon : copyIcon}
                                alt=""
                              />
                            </button>
                          </CopyToClipboard>
                        </div>
                      </p>
                    </p>
                  </div>

                  {/* button show output */}
                  <div className="mt-7">
                    <button
                      key={buttons[5].id}
                      name="status"
                      onClick={() => updateBtnHandler(6)}
                      type="button"
                      className="focus:outline-none ipad-pro:w-1/6 laptop:w-[13%] capitalize text-dark-head hover:bg-dark-head border-0 delay-50 hover:text-newYellow bg-newYellow btn btn-sm btn-primary  rounded-lg text-[12px] font-poppins mb-2"
                    >
                      {buttons[5].text}
                    </button>
                  </div>

                  {/* show response body when click button show output */}
                  <div
                    className={`${
                      buttons[5].text === "Show output" ? "hidden" : ""
                    }`}
                  >
                    <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain text-sm font-semibold">
                      <p className="w-full 12pro:w-[270px] ipad-pro:w-full laptop:w-[500px]">
                        <p className="text-newYellow">{`//output`}</p>
                        <p>{"{"}</p>
                        <p className="px-3 ">"data": [</p>
                        <p className="px-6">
                          <pre>{jsonTextProduct},</pre>
                          <p className="text-newYellow">{`// 50 items`}</p>
                        </p>
                        <p className="px-3">]</p>
                        {"}"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* get a single product content */}
                <div className="mt-10">
                  <span
                    id="get-single-products"
                    className="font-poppins italic text-dark-head font-black text-lg"
                  >
                    Get a single product
                  </span>
                  {/* link url for fetch box  */}
                  <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain font-semibold">
                    <p className="12pro:w-[270px] ipad-pro:w-full laptop:w-full">
                      <p
                        key={urls[6].id}
                        className="12pro:w-[270px] ipad-pro:w-full laptop:w-full w-full flex"
                      >
                        <TextareaAutosize
                          className="w-full border-none bg-document focus:ring-0 text-sm resize-none"
                          ref={urls[6].textRef}
                          value={urls[6].url}
                          readOnly
                        />
                        <div className="">
                          <CopyToClipboard text={urls[6].url}>
                            <button onClick={() => copyTextHandler(6)}>
                              <img
                                src={urls[6].isCopied ? copiedIcon : copyIcon}
                                alt=""
                              />
                            </button>
                          </CopyToClipboard>
                        </div>
                      </p>
                    </p>
                  </div>

                  {/* button show output */}
                  <div className="mt-7">
                    <button
                      key={buttons[6].id === 7}
                      name="status"
                      onClick={() => updateBtnHandler(7)}
                      type="button"
                      className="focus:outline-none ipad-pro:w-1/6 laptop:w-[13%] capitalize text-dark-head hover:bg-dark-head border-0 delay-50 hover:text-newYellow bg-newYellow btn btn-sm btn-primary  rounded-lg text-[12px] font-poppins mb-2"
                    >
                      {buttons[6].text}
                    </button>
                  </div>

                  {/* show response body when click button show output */}
                  <div
                    className={`${
                      buttons[6].text === "Show output" ? "hidden" : ""
                    }`}
                  >
                    <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain text-sm font-semibold">
                      <p className="w-1/2 12pro:w-[270px] ipad-pro:w-full  laptop:w-[500px]">
                        <p className="text-newYellow">{`//output`}</p>
                        <p>{"{"}</p>
                        <p className="px-3">"data":</p>
                        <p className="px-6 text-dark-head">
                          <pre>{jsonTextProduct}</pre>
                        </p>
                        <p className="px-3 text-dark-head">{"}"}</p>
                      </p>
                    </div>
                  </div>
                </div>

                {/* add a product content */}
                <div className="mt-10">
                  <span
                    id="add-a-product"
                    className="font-poppins italic font-black text-lg"
                  >
                    Add a product
                  </span>
                  <p className="italic text-sm font-black text-dark-head">
                    Important :{" "}
                    <span className="text-dark-head font-montserrat font-normal">
                      resource will not be really added on the server but it
                      will be faked as if.
                    </span>
                  </p>
                  {/* link url for fetch box  */}
                  <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain font-semibold">
                    <p className="12pro:w-[270px] ipad-pro:w-full laptop:w-full">
                      <p
                        key={urls[7].id}
                        className="12pro:w-[270px] ipad-pro:w-full laptop:w-full w-full flex"
                      >
                        <TextareaAutosize
                          className="w-full border-none bg-document focus:ring-0 text-sm resize-none"
                          ref={urls[7].textRef}
                          value={urls[7].url}
                          readOnly
                        />
                        <div className="">
                          <CopyToClipboard text={urls[7].url}>
                            <button onClick={() => copyTextHandler(7)}>
                              <img
                                src={urls[7].isCopied ? copiedIcon : copyIcon}
                                alt=""
                              />
                            </button>
                          </CopyToClipboard>
                        </div>
                      </p>
                    </p>
                  </div>

                  {/* button show output */}
                  <div className="mt-7">
                    <button
                      key={buttons[7].id}
                      name="status"
                      onClick={() => updateBtnHandler(8)}
                      type="button"
                      className="focus:outline-none ipad-pro:w-1/6 laptop:w-[13%] capitalize text-dark-head hover:bg-dark-head border-0 delay-50 hover:text-newYellow bg-newYellow btn btn-sm btn-primary  rounded-lg text-[12px] font-poppins mb-2"
                    >
                      {buttons[7].text}
                    </button>
                  </div>

                  {/* show response body when click button show output */}
                  <div
                    className={`${
                      buttons[7].text === "Show output" ? "hidden" : ""
                    }`}
                  >
                    <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain text-sm font-semibold">
                      <p className="w-1/2 12pro:w-[270px] ipad-pro:w-full laptop:w-[500px]">
                        <p className="text-newYellow">{`//output`}</p>
                        <p>{"{"}</p>
                        <p className="px-3">"data": {"{"}</p>
                        <p className="px-6 text-dark-head">
                          <p className="px-3 text-dark-head">
                            {" "}
                            "id": 51, <br />
                            key: value, <br />
                          </p>
                        </p>
                        <p className="px-3 text-dark-head">{"}"}</p>
                        {"}"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* update a product content */}
                <div className="mt-10">
                  <span
                    id="update-a-product"
                    className="font-poppins italic font-black text-lg"
                  >
                    Update a product
                  </span>
                  <p className="italic text-sm font-black text-dark-head">
                    Important :{" "}
                    <span className="text-dark-head font-montserrat font-normal">
                      resource will not be really updated on the server but it
                      will be faked as if.
                    </span>
                  </p>
                  {/* link url for fetch box  */}
                  <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain font-semibold">
                    <p className="12pro:w-[270px] ipad-pro:w-full laptop:w-full">
                      <p
                        key={urls[8].id}
                        className="12pro:w-[270px] ipad-pro:w-full laptop:w-full w-full flex"
                      >
                        <TextareaAutosize
                          className="w-full border-none bg-document focus:ring-0 text-sm resize-none"
                          ref={urls[8].textRef}
                          value={urls[8].url}
                          readOnly
                        />
                        <div className="">
                          <CopyToClipboard text={urls[8].url}>
                            <button onClick={() => copyTextHandler(8)}>
                              <img
                                src={urls[8].isCopied ? copiedIcon : copyIcon}
                                alt=""
                              />
                            </button>
                          </CopyToClipboard>
                        </div>
                      </p>
                    </p>
                  </div>

                  {/* button show output */}
                  <div className="mt-7">
                    <button
                      key={buttons[8].id}
                      name="status"
                      onClick={() => updateBtnHandler(9)}
                      type="button"
                      className="focus:outline-none ipad-pro:w-1/6 laptop:w-[13%] capitalize text-dark-head hover:bg-dark-head border-0 delay-50 hover:text-newYellow bg-newYellow btn btn-sm btn-primary  rounded-lg text-[12px] font-poppins mb-2"
                    >
                      {buttons[8].text}
                    </button>
                  </div>

                  {/* show response body when click button show output */}
                  <div
                    className={`${
                      buttons[8].text === "Show output" ? "hidden" : ""
                    }`}
                  >
                    <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain text-sm font-semibold">
                      <p className="w-1/2 12pro:w-[270px] ipad-pro:w-full laptop:w-[500px]">
                        <p className="text-newYellow">{`//output`}</p>
                        <p className="text-dark-head">{"{"}</p>
                        <p className="px-3 text-dark-head">"data": {"{"}</p>
                        <p className="px-6 text-dark-head">
                          <p className="px-3 text-dark-head">
                            {" "}
                            "id": 1, <br />
                            key: value,
                          </p>
                        </p>
                        <p className="px-3 text-dark-head">{"}"}</p>
                        {"}"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* delete a product content */}
                <div className="mt-10">
                  <span
                    id="delete-a-product"
                    className="font-poppins italic font-black text-lg"
                  >
                    Delete a product
                  </span>
                  <p className="italic text-sm font-black text-dark-head">
                    Important :{" "}
                    <span className="text-dark-head font-montserrat font-normal">
                      resource will not be really deleted on the server but it
                      will be faked as if.
                    </span>
                  </p>
                  {/* link url for fetch box  */}
                  <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain font-semibold">
                    <p className="12pro:w-[270px] ipad-pro:w-full laptop:w-full">
                      <p
                        key={urls[9].id}
                        className="12pro:w-[270px] ipad-pro:w-full laptop:w-full w-full flex"
                      >
                        <TextareaAutosize
                          className="w-full border-none bg-document focus:ring-0 text-sm resize-none"
                          ref={urls[9].textRef}
                          value={urls[9].url}
                          readOnly
                        />
                        <div className="">
                          <CopyToClipboard text={urls[9].url}>
                            <button onClick={() => copyTextHandler(9)}>
                              <img
                                src={urls[9].isCopied ? copiedIcon : copyIcon}
                                alt=""
                              />
                            </button>
                          </CopyToClipboard>
                        </div>
                      </p>
                    </p>
                  </div>

                  {/* button show output */}
                  <div className="mt-7">
                    <button
                      key={buttons[9].id}
                      name="status"
                      onClick={() => updateBtnHandler(10)}
                      type="button"
                      className="focus:outline-none ipad-pro:w-1/6 laptop:w-[13%] capitalize text-dark-head hover:bg-dark-head border-0 delay-50 hover:text-newYellow bg-newYellow btn btn-sm btn-primary  rounded-lg text-[12px] font-poppins mb-2"
                    >
                      {buttons[9].text}
                    </button>
                  </div>

                  {/* show response body when click button show output */}
                  <div
                    className={`${
                      buttons[9].text === "Show output" ? "hidden" : ""
                    }`}
                  >
                    <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain text-sm font-semibold">
                      <p className="w-1/2 12pro:w-[270px] ipad-pro:w-full laptop:w-[500px]">
                        <p className="text-newYellow">{`//output`}</p>
                        <p className="text-dark-head">{"{"}</p>
                        <p className="px-3 text-dark-head">"data": {"{"}</p>
                        <p className="px-6 text-dark-head">
                          <p className="px-3 text-dark-head">
                            {" "}
                            "id": 1, <br />
                            key: value,
                          </p>
                        </p>
                        <p className="px-3 text-dark-head">{"}"}</p>
                        {"}"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* trips content */}
              <div className="mt-20 12pro:w-[310px] ipad-pro:w-[100%] laptop:w-[810px]">
                {/* title trips */}
                <div>
                  <span
                    id="Trips"
                    className="font-poppins text-xl font-black text-newYellow"
                  >
                    Trips
                    <div className="h-0.5 bg-document  text-dark-head rounded-sm mt-1"></div>
                  </span>
                </div>

                {/* get all trips content */}
                <div className="mt-10">
                  <span
                    id="get-all-trip"
                    className="font-poppins italic font-black text-lg"
                  >
                    Get all trips
                  </span>
                  {/* link url for fetch box  */}
                  <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain font-semibold">
                    <p className="12pro:w-[270px] ipad-pro:w-full laptop:w-full">
                      <p
                        key={urls[10].id}
                        className="12pro:w-[270px] ipad-pro:w-full laptop:w-full w-full flex"
                      >
                        <TextareaAutosize
                          className="w-full border-none bg-document focus:ring-0 text-sm resize-none"
                          ref={urls[10].textRef}
                          value={urls[10].url}
                          readOnly
                        />
                        <div className="">
                          <CopyToClipboard text={urls[10].url}>
                            <button onClick={() => copyTextHandler(10)}>
                              <img
                                src={urls[10].isCopied ? copiedIcon : copyIcon}
                                alt=""
                              />
                            </button>
                          </CopyToClipboard>
                        </div>
                      </p>
                    </p>
                  </div>

                  {/* button show output */}
                  <div className="mt-7">
                    <button
                      key={buttons[10].id}
                      name="status"
                      onClick={() => updateBtnHandler(11)}
                      type="button"
                      className="focus:outline-none ipad-pro:w-1/6 laptop:w-[13%] capitalize text-dark-head hover:bg-dark-head border-0 delay-50 hover:text-newYellow bg-newYellow btn btn-sm btn-primary  rounded-lg text-[12px] font-poppins mb-2"
                    >
                      {buttons[10].text}
                    </button>
                  </div>

                  {/* show response body when click button show output */}
                  <div
                    className={`${
                      buttons[10].text === "Show output" ? "hidden" : ""
                    }`}
                  >
                    <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain text-sm font-semibold">
                      <p className="w-full 12pro:w-[270px] ipad-pro:w-full laptop:w-[500px]">
                        <p className="text-newYellow">{`//output`}</p>
                        <p>{"{"}</p>
                        <p className="px-3 ">"data": [</p>
                        <p className="px-6">
                          <pre>{jsonTextTrip},</pre>
                          <p className="text-newYellow">{`// 50 items`}</p>
                        </p>
                        <p className="px-3">]</p>
                        {"}"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* get a single trip content */}
                <div className="mt-10">
                  <span
                    id="get-single-trip"
                    className="font-poppins italic font-black text-lg"
                  >
                    Get a single trip
                  </span>
                  {/* link url for fetch box  */}
                  <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain font-semibold">
                    <p className="12pro:w-[270px] ipad-pro:w-full laptop:w-full">
                      <p
                        key={urls[11].id}
                        className="12pro:w-[270px] ipad-pro:w-full laptop:w-full w-full flex"
                      >
                        <TextareaAutosize
                          className="w-full border-none bg-document focus:ring-0 text-sm resize-none"
                          ref={urls[11].textRef}
                          value={urls[11].url}
                          readOnly
                        />
                        <div className="">
                          <CopyToClipboard text={urls[11].url}>
                            <button onClick={() => copyTextHandler(11)}>
                              <img
                                src={urls[11].isCopied ? copiedIcon : copyIcon}
                                alt=""
                              />
                            </button>
                          </CopyToClipboard>
                        </div>
                      </p>
                    </p>
                  </div>

                  {/* button show output */}
                  <div className="mt-7">
                    <button
                      key={buttons[11].id}
                      name="status"
                      onClick={() => updateBtnHandler(12)}
                      type="button"
                      className="focus:outline-none ipad-pro:w-1/6 laptop:w-[13%] capitalize text-dark-head hover:bg-dark-head border-0 delay-50 hover:text-newYellow bg-newYellow btn btn-sm btn-primary  rounded-lg text-[12px] font-poppins mb-2"
                    >
                      {buttons[11].text}
                    </button>
                  </div>

                  {/* show response body when click button show output */}
                  <div
                    className={`${
                      buttons[11].text === "Show output" ? "hidden" : ""
                    }`}
                  >
                    <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain text-sm font-semibold">
                      <p className="w-1/2 12pro:w-[270px] ipad-pro:w-full  laptop:w-[500px]">
                        <p className="text-newYellow">{`//output`}</p>
                        <p>{"{"}</p>
                        <p className="px-3">"data":</p>
                        <p className="px-6 text-dark-head">
                          <pre>{jsonTextTrip}</pre>
                        </p>
                        <p className="px-3 text-dark-head">{"}"}</p>
                      </p>
                    </div>
                  </div>
                </div>

                {/* add a trip content */}
                <div className="mt-10">
                  <span
                    id="add-a-trip"
                    className="font-poppins italic font-black text-lg"
                  >
                    Add a trip
                  </span>
                  <p className="italic text-sm font-black text-dark-head">
                    Important :{" "}
                    <span className="text-dark-head font-montserrat font-normal">
                      resource will not be really added on the server but it
                      will be faked as if.
                    </span>
                  </p>
                  {/* link url for fetch box  */}
                  <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain font-semibold">
                    <p className="12pro:w-[270px] ipad-pro:w-full laptop:w-full">
                      <p
                        key={urls[12].id}
                        className="12pro:w-[270px] ipad-pro:w-full laptop:w-full w-full flex"
                      >
                        <TextareaAutosize
                          className="w-full border-none bg-document focus:ring-0 text-sm resize-none"
                          ref={urls[12].textRef}
                          value={urls[12].url}
                          readOnly
                        />
                        <div className="">
                          <CopyToClipboard text={urls[12].url}>
                            <button onClick={() => copyTextHandler(12)}>
                              <img
                                src={urls[12].isCopied ? copiedIcon : copyIcon}
                                alt=""
                              />
                            </button>
                          </CopyToClipboard>
                        </div>
                      </p>
                    </p>
                  </div>

                  {/* button show output */}
                  <div className="mt-7">
                    <button
                      key={buttons[12].id}
                      name="status"
                      onClick={() => updateBtnHandler(13)}
                      type="button"
                      className="focus:outline-none ipad-pro:w-1/6 laptop:w-[13%] capitalize text-dark-head hover:bg-dark-head border-0 delay-50 hover:text-newYellow bg-newYellow btn btn-sm btn-primary  rounded-lg text-[12px] font-poppins mb-2"
                    >
                      {buttons[12].text}
                    </button>
                  </div>

                  {/* show response body when click button show output */}
                  <div
                    className={`${
                      buttons[12].text === "Show output" ? "hidden" : ""
                    }`}
                  >
                    <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain text-sm font-semibold">
                      <p className="w-1/2 12pro:w-[270px] ipad-pro:w-full laptop:w-[500px]">
                        <p className="text-newYellow">{`//output`}</p>
                        <p>{"{"}</p>
                        <p className="px-3">"data": {"{"}</p>
                        <p className="px-6 text-dark-head">
                          <p className="px-3 text-dark-head">
                            {" "}
                            "id": 51, <br />
                            key: value, <br />
                          </p>
                        </p>
                        <p className="px-3 text-dark-head">{"}"}</p>
                        {"}"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* update a trip content */}
                <div className="mt-10">
                  <span
                    id="update-a-trip"
                    className="font-poppins italic font-black text-lg"
                  >
                    Update a trip
                  </span>
                  <p className="italic text-sm font-black text-dark-head">
                    Important :{" "}
                    <span className="text-dark-head font-montserrat font-normal">
                      resource will not be really updated on the server but it
                      will be faked as if.
                    </span>
                  </p>
                  {/* link url for fetch box  */}
                  <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain font-semibold">
                    <p className="12pro:w-[270px] ipad-pro:w-full laptop:w-full">
                      <p
                        key={urls[13].id}
                        className="12pro:w-[270px] ipad-pro:w-full laptop:w-full w-full flex"
                      >
                        <TextareaAutosize
                          className="w-full border-none bg-document focus:ring-0 text-sm resize-none"
                          ref={urls[13].textRef}
                          value={urls[13].url}
                          readOnly
                        />
                        <div className="">
                          <CopyToClipboard text={urls[13].url}>
                            <button onClick={() => copyTextHandler(13)}>
                              <img
                                src={urls[13].isCopied ? copiedIcon : copyIcon}
                                alt=""
                              />
                            </button>
                          </CopyToClipboard>
                        </div>
                      </p>
                    </p>
                  </div>

                  {/* button show output */}
                  <div className="mt-7">
                    <button
                      key={buttons[13].id}
                      name="status"
                      onClick={() => updateBtnHandler(14)}
                      type="button"
                      className="focus:outline-none ipad-pro:w-1/6 laptop:w-[13%] capitalize text-dark-head hover:bg-dark-head border-0 delay-50 hover:text-newYellow bg-newYellow btn btn-sm btn-primary  rounded-lg text-[12px] font-poppins mb-2"
                    >
                      {buttons[13].text}
                    </button>
                  </div>

                  {/* show response body when click button show output */}
                  <div
                    className={`${
                      buttons[13].text === "Show output" ? "hidden" : ""
                    }`}
                  >
                    <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain text-sm font-semibold">
                      <p className="w-1/2 12pro:w-[270px] ipad-pro:w-full laptop:w-[500px]">
                        <p className="text-newYellow">{`//output`}</p>
                        <p className="text-dark-head">{"{"}</p>
                        <p className="px-3 text-dark-head">"data": {"{"}</p>
                        <p className="px-6 text-dark-head">
                          <p className="px-3 text-dark-head">
                            {" "}
                            "id": 1, <br />
                            key: value,
                          </p>
                        </p>
                        <p className="px-3 text-dark-head">{"}"}</p>
                        {"}"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* delete a trip content */}
                <div className="mt-10">
                  <span
                    id="delete-a-trip"
                    className="font-poppins italic font-black text-lg"
                  >
                    Delete a trip
                  </span>
                  <p className="italic text-sm font-black text-dark-head">
                    Important :{" "}
                    <span className="text-dark-head font-montserrat font-normal">
                      resource will not be really deleted on the server but it
                      will be faked as if.
                    </span>
                  </p>
                  {/* link url for fetch box  */}
                  <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain font-semibold">
                    <p className="12pro:w-[270px] ipad-pro:w-full laptop:w-full">
                      <p
                        key={urls[14].id}
                        className="12pro:w-[270px] ipad-pro:w-full laptop:w-full w-full flex"
                      >
                        <TextareaAutosize
                          className="w-full border-none bg-document focus:ring-0 text-sm resize-none"
                          ref={urls[14].textRef}
                          value={urls[14].url}
                          readOnly
                        />
                        <div className="">
                          <CopyToClipboard text={urls[14].url}>
                            <button onClick={() => copyTextHandler(14)}>
                              <img
                                src={urls[14].isCopied ? copiedIcon : copyIcon}
                                alt=""
                              />
                            </button>
                          </CopyToClipboard>
                        </div>
                      </p>
                    </p>
                  </div>

                  {/* button show output */}
                  <div className="mt-7">
                    <button
                      key={buttons[14].id}
                      name="status"
                      onClick={() => updateBtnHandler(15)}
                      type="button"
                      className="focus:outline-none ipad-pro:w-1/6 laptop:w-[13%] capitalize text-dark-head hover:bg-dark-head border-0 delay-50 hover:text-newYellow bg-newYellow btn btn-sm btn-primary  rounded-lg text-[12px] font-poppins mb-2"
                    >
                      {buttons[14].text}
                    </button>
                  </div>

                  {/* show response body when click button show output */}
                  <div
                    className={`${
                      buttons[14].text === "Show output" ? "hidden" : ""
                    }`}
                  >
                    <div className="h-30 12pro:w-[310px] ipad-pro:w-full laptop:w-[810px] p-5 bg-document mt-3 rounded-lg font-jetbrain text-sm font-semibold">
                      <p className="w-1/2 12pro:w-[270px] ipad-pro:w-full laptop:w-[500px]">
                        <p className="text-newYellow">{`//output`}</p>
                        <p className="text-dark-head">{"{"}</p>
                        <p className="px-3 text-dark-head">"data": {"{"}</p>
                        <p className="px-6 text-dark-head">
                          <p className="px-3 text-dark-head">
                            {" "}
                            "id": 1, <br />
                            key: value,
                          </p>
                        </p>
                        <p className="px-3 text-dark-head">{"}"}</p>
                        {"}"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
