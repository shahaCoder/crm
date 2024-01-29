"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { Cards } from "@/components/Cards";
export default function Home() {
  const [getFile, setGetFile] = useState<any>();
  const [file, setFile] = useState<any>(null);
  const [value, setValue] = useState<string>()
  const [value2, setValue2] = useState<string | any>()
  const [products, setProducts] = useState<any>();
  const [products2, setProducts2] = useState<any>();
  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };
   const search = (item: string) => {
     fetch(`https://back-mlli.onrender.com/api/products/title/${item == 'value' ? value : value2}`)
     .then((res) => res.json())
     .then((res) =>  item == 'value' ? setProducts(res) : setProducts2(res));
   }
   
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("img", file);

    try {
      const uploadResponse = await axios.post(
        "https://back-mlli.onrender.com/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadedFileName = uploadResponse.data.filename;

      const product: any = {};
      const fd = new FormData(event.target);
      fd?.forEach((key: any, value: any) => {
        product[value] = key;
      });
      const productData = {
        title: product?.title,
        price: product?.price,
        link: product?.link,
        lastPrice: +product?.lastPrice,
        uniCode: product?.uniCode,
        img: `/uploads/${uploadedFileName}`,
      };

      const productResponse = await axios.post(
        "https://back-mlli.onrender.com/api/products",
        productData
      );
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  return (
    <>
      <h1 className="text-center text-6xl">CRM</h1>
      <div className="w-full p-10 flex items-center justify-between gap-4">
        <div className="border-2 rounded-md p-4">
          <h1 className="text-4xl mb-4 text-center">POST</h1>
          <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
            <p className="">TITLE</p>
            <input
              type="text"
              id="title"
              className="w-[400px] h-[40px] rounded-md mb-10 text-black p-2 border-2 uppercase"
              placeholder="Title"
              name="title"
            />
            <p>PRICE</p>
            <input
              type="number"
              id="price"
              className="w-[400px] h-[40px] rounded-md mb-10 text-black p-2 border-2"
              placeholder="Price"
              name="price"
            />
            <p className="">LAST PRICE</p>
            <input
              type="number"
              id="price"
              className="w-[400px] h-[40px] rounded-md mb-10 text-black p-2 border-2 uppercase"
              placeholder="Last price"
              name="lastPrice"
            />
            <p>LINK</p>
            <input
              type="text"
              id="link"
              className="w-[400px] h-[40px] rounded-md mb-10 text-black p-2 border-2"
              placeholder="Link"
              name="link"
            />
            <p>UNICODE</p>
            <input
              type="text"
              id="unicode"
              className="w-[400px] h-[40px] rounded-md mb-10 text-black p-2 border-2"
              placeholder="%23"
              name="uniCode"
            />
            <br />
            <p>ATTACH IMG</p>
            <input
              type="file"
              id="file"
              name="img"
              className="mb-10"
              onChange={handleFileChange}
            />
            <br />
            <button
              type="submit"
              className="w-[100px] h-[50px] rounded-md bg-green-500"
            >
              POST
            </button>
          </form>
        </div>
        <div className="border-2 rounded-md p-4">
          <h1 className="text-4xl mb-4 text-center">DELETE</h1>
          <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
            <p className="">TITLE</p>
            <input
              type="text"
              id="title"
              className="w-[400px] h-[40px] rounded-md mb-10 text-black p-2 border-2"
              placeholder="Search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              type="submit"
              className="w-[100px] h-[50px] rounded-md  bg-red-500 mb-4"
              onClick={() => search('value')}
            >
              SEARCH
            </button>
            <div className="w-full">
              {
                products?.map((i: {title: string, link: string, img: string, price: number}) => <Cards i={i} value={'DELETE'} />)
              }
            </div>
          </form>
        </div>
        <div className="border-2 rounded-md p-4">
          <h1 className="text-4xl mb-4 text-center">UPDATE</h1>
            <p className="">TITLE</p>
            <input
              type="text"
              id="title"
              className="w-[400px] h-[40px] rounded-md mb-10 text-black p-2 border-2"
              placeholder="Search"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
            />
            <button
              type="submit"
              className="w-[100px] h-[50px] rounded-md bg-blue-500 mb-4"
              onClick={() => search('value2')}
            >
              SEARCH
            </button>
            <div className="w-full">
              {
                products2?.map((i: {title: string, link: string, img: string, price: number}) => <Cards i={i} value={'EDIT'} />)
              }
            </div>
        </div>
      </div>
    </>
  );
}
