import axios from "axios";
import * as React from "react";

export interface IAppProps {}

export function Cards({ i, value }: any) {
   const [modal, setModal] = React.useState<boolean>(false)
   const deleteProduct = (id: number) => {
      axios.delete(`https://back-mlli.onrender.com/api/products/${id}`)
   }
   const handleSubmit = async (event: any, id: number) => {
      event.preventDefault();
      
  
      try {
        const product: any = {};
        const fd = new FormData(event.target);
        fd?.forEach((key: any, value: any) => {
          product[value] = key;
        });
        console.log(product);
        
        const productData = {
          title: product?.title.length > 0 ? product?.title : i.title,
          price: product?.price.legth > 0 ? product?.price : i.price,
          link: product?.link.length > 0  ? product?.link : i.link ,
          uniCode: product?.uniCode.length > 0 ? product?.uniCode : i.uniCode
        };
  
        const productResponse = await axios.put(
          `https://back-mlli.onrender.com/api/products/${id}`,
          productData
        );
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      
      
    };
  return (
    <>
    <div className="w-full p-2 flex items-center justify-between border-2 mb-2">
      <div className="flex flex-col gap-2">
      <img src={`https://back-mlli.onrender.com` + i?.img} className="w-[100px]" />
      <button
      type="button"
              className="w-[100px] h-[50px] rounded-md bg-green-500"
              onClick={() => { value === 'EDIT' ? setModal(true) : deleteProduct(i.id)}}
            >
              {value == 'EDIT' ? 'EDIT' : 'DELETE' }
            </button>
      </div>
      <div className="">
        <h1>{i?.title}</h1>
        <p>${i?.price}</p>
      </div>
    </div>
    {
      modal ? <div className="w-full h-[100vh] fixed top-0 left-0 bg-[rgba(0,0,0,0.5)]" onClick={() => setModal(false)}>
         <div onClick={(e: any) => e.stopPropagation()} className="w-fit bg-white p-6 border-2 shadow-md fixed left-1/2 top-1/2 rounded-md -translate-x-1/2 -translate-y-1/2">
      <form onSubmit={(e) => handleSubmit(e, i.id)} encType="multipart/form-data">
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
              <p>LINK</p>
              <input
                type="text"
                id="link"
                className="w-[400px] h-[40px] rounded-md mb-10 text-black p-2 border-2"
                placeholder="Link"
                name="link"
              />
              <br />
              <p>UNICODE</p>
              <input
                type="text"
                id="uniCode"
                className="w-[400px] h-[40px] rounded-md mb-10 text-black p-2 border-2"
                placeholder="%23"
                name="uniCode"
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
      </div> :  null
    }
    </>
  );
}
