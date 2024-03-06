import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { instance } from "../redux/service/InstanceHeader";
import url from "../asset/img/icon/url.svg";
import dotGray from "../asset/img/icon/dot.svg";
import search_logo from "../asset/img/search_page.png";
import favoriteGray from "../asset/img/icon/favoriteGray.svg";
import favoriteGold from "../asset/img/icon/favorite.svg";

const TestScroll = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(1);

  const [imageFavoriteSrc, setImageSrc] = useState(favoriteGray);
  const favoriteIconClickHandler = () => {
    if (imageFavoriteSrc === favoriteGray) {
      setImageSrc(favoriteGold);
    } else {
      setImageSrc(favoriteGray);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    if (!hasMore || isLoading) {
      return;
    }
    setIsLoading(true);
    await instance
      .get(`/all-info-project?pages=${page.current}&size=1`)
      .then((newItems) => {
        console.log("Page" + page.current);
        console.log(newItems.data.payload);
        if (newItems.data.payload.length === 0) {
          setHasMore(false);
        } else {
          setItems((prevItems) => [...prevItems, ...newItems.data.payload]);
          page.current += 1;
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });

    // fetch(`/api/items?page=${page.current}&limit=6`)
    //   .then(response => response.json())
    //   .then(newItems => {
    //     if (newItems.length === 0) {
    //       setHasMore(false);
    //     } else {
    //       setItems(prevItems => [...prevItems, ...newItems]);
    //       page.current += 1;
    //     }
    //     setIsLoading(false);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     setIsLoading(false);
    //   });
  };

  function handleObserver(entries) {
    const [entry] = entries;
    if (entry.isIntersecting) {
      loadItems();
    }
  }

  const threshold = 0.5;
  const observer = useRef(
    new IntersectionObserver(handleObserver, { threshold })
  );

  const loaderRef = useRef(null);
  useEffect(() => {
    observer.current.observe(loaderRef.current);
    return () => observer.current.disconnect();
  }, []);

  return (
    <div>
      <div className="flex 12pro:h-[500px] ipad-pro:h-[600px] justify-center">
        <div className="laptop:flex laptop:justify-center ipad-pro:flex ipad-pro:justify-center">
          <div className="laptop:flex laptop:my-5 laptop:w-[1000px] laptop:h-1/2 ipad-pro:flex ipad-pro:justify-center ipad-pro:w-[1000px] ipad-pro:h-1/2 ipad-pro:my-5 12pro:mt-[5px]">
            <div className="laptop:grid laptop:grid-cols-3 laptop:gap-7 laptop:w-full laptop:h-full ipad-pro:w-[650px] ipad-pro:grid ipad-pro:grid-cols-2 ipad-pro:gap-5">
              {/* card */}
              {items.map((project) => (
                <div className="laptop:h-[190px] laptop:w-full laptop:my-0 ipad-pro:w-full ipad-pro:h-[190px] ipad-pro:my-0 12pro:w-[300px] 12pro:my-5 bg-whitesmoke rounded-xl flex flex-col items-center drop-shadow-lg shadow-lg">
                  {/* profile user create project */}
                  <div className="flex h-1/3 w-[90%] justify-between">
                    {/* left */}
                    <div className="flex items-center">
                      {/* profile */}
                      <div>
                        <div className="laptop:mr-5 ipad-pro:mr-3">
                          <img
                            class="w-10 h-10 rounded-full"
                            src={search_logo}
                            alt="profile"
                          />
                        </div>
                      </div>
                      {/* fullname */}
                      <div className="flex flex-col">
                        <div className="font-poppins font-black">
                          <span>{project.info?.userInfo?.username}</span>
                        </div>
                        <div className="text-sm">
                          <span>
                            {/* {convertTimestampToDate(
                                  project.info?.projectInfo?.projectInfo?.createdDate
                                )} */}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* right */}
                    <div className="flex w-1/5 justify-evenly my-4">
                      {/* favorite icon */}
                      <div className="laptop:mx-2 ipad-pro:mx-1">
                        <button>
                          <img
                            onClick={favoriteIconClickHandler}
                            src={imageFavoriteSrc}
                            alt=""
                          />
                        </button>
                      </div>

                      {/* dot icon */}
                      <div>
                        <button>
                          <img className="my-1" src={dotGray} alt="" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* bottom lines */}
                  <div className="w-[90%] h-[2px] flex">
                    <div className="w-full h-full grid grid-cols-4">
                      <div className="w-full h-full bg-red-500"></div>
                      <div className="w-full h-full bg-yellow-400"></div>
                      <div className="w-full h-full bg-cyan-500"></div>
                      <div className="w-full h-full bg-green-400"></div>
                    </div>
                  </div>

                  {/* project name div */}
                  <div className="flex h-1/3 w-[90%] border-slate-400 justify-between my-3">
                    <div className="flex flex-col">
                      {/* project name */}
                      <div className="flex flex-col hover:underline decoration-purple-head hover:decoration-2 hover:underline-offset-4">
                        <div className="font-poppins font-black text-xl uppercase text-purple-head">
                          <Link to={""}>
                            <span>
                              {
                                project.info?.projectInfo?.projectInfo
                                  .projectName
                              }
                            </span>
                          </Link>
                        </div>
                      </div>
                      {/* url endpoints */}
                      <div className="flex w-full my-2 font-black text-lg items-center">
                        <div className="mr-2">
                          <img src={url} alt="" />
                        </div>
                        {/* number of url endpoints */}
                        <div>
                          <span>number of url endpoints</span>
                        </div>
                      </div>
                      {/* last update time */}
                      <div className="text-sm">
                        <span>last update time</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="loader">
        {isLoading && <div>Loading...</div>}
        {!isLoading && hasMore && <div ref={loaderRef}>Load more</div>}
        {!isLoading && !hasMore && <div>No more items</div>}
      </div>
    </div>
  );
};

export default TestScroll;
