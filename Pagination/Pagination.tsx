import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight, faCircleLeft } from "@fortawesome/free-solid-svg-icons";

const Pagination: React.FC = () => {
  const [resData, setResData] = React.useState<any>(null);
  const [totalPages, setTotalPages] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [chunkArr, setChunkArr] = React.useState<number[]>(
    Array(5)
      .fill(pageNumber)
      .map((val, index) => val + index),
  );

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${pageNumber * 10}`,
      );
      const result = await response.json();
      setResData(result);
      setTotalPages(Math.floor(result.total / 10));
      console.log(result);
      if (pageNumber === chunkArr[chunkArr.length - 1]) {
        setChunkArr(
          Array(5)
            .fill(pageNumber)
            .map((val, index) => val + index),
        );
      } else if (pageNumber === chunkArr[0] && pageNumber > 1) {
        setChunkArr(
          Array(5)
            .fill(pageNumber - 4)
            .map((val, index) => val + index),
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data or perform any side effects here
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [pageNumber]);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    console.log("Clicked page:", e.currentTarget.textContent);
    // Implement pagination logic here, e.g., fetch data for the selected page
    const pageNumber = parseInt(e.currentTarget.textContent || "1");
    setPageNumber(pageNumber);
  };

  return (
    <div className="flex flex-col gap-2 p-4 items-start justify-start w-full">
      <div className="flex flex-col gap-1 items-start justify-start w-full border bg-gray-50 p-4">
        <span className="text-2xl font-bold">Products</span>
        {resData &&
          resData?.products.map((item: any) => (
            <div key={item.id}>{item.title}</div>
          ))}
      </div>
      <div
        className="flex gap-2 w-full border p-4 align-center justify-center"
        style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon
          icon={faCircleLeft}
          style={{
            cursor: "pointer",
            marginTop: "8px",
            opacity: pageNumber === 1 ? 0.5 : 1,
            pointerEvents: pageNumber === 1 ? "none" : "auto",
          }}
          onClick={() => setPageNumber((prev) => prev - 1)}
        />
        {chunkArr.map((page, index) => {
          return (
            <div
              key={index}
              className={`border rounded-full p-2 w-8 h-8 flex items-center justify-center hover:bg-gray-200 ${pageNumber === page ? "bg-gray-300" : ""}`}
              onClick={(e) => handleClick(e)}
            >
              {page}
            </div>
          );
        })}
        <FontAwesomeIcon
          icon={faCircleRight}
          style={{
            cursor: "pointer",
            marginTop: "8px",
            opacity: pageNumber === totalPages ? 0.5 : 1,
            pointerEvents: pageNumber === totalPages ? "none" : "auto",
          }}
          onClick={() => setPageNumber((prev) => prev + 1)}
        />
      </div>
    </div>
  );
};

export default Pagination;
