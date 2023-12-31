import React, { useState } from "react";
import { useAddProductMutation, useGetGoodsQuery } from "../../../redux";
import {  useNavigate , useParams, Link } from "react-router-dom";


import TopBar from "../../../components/topBar/topBar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { ImList2 } from "react-icons/im";
import LabTabsForProductCard from "../../../components/Labs/LabTabsForProductCard";



//  Тут живут ОБЩИЕ стили дизайна.
const btnSubmitStyle =
  "hover:bg-green-400 hover:text-white border-[#002060] border-[1px] text-[#002060] first-line:font-bold py-1 px-6 rounded-lg inline-flex items-center";
const btnSaveStyle =
  "hover:bg-gray-400 hover:text-white border-[#002060] border-[1px] text-[#002060] first-line:font-bold py-1 px-6 rounded-lg inline-flex items-center";
const btnCancelStyle =
  "hover:bg-red-400 hover:text-white border-[#002060] border-[1px] text-[#002060] first-line:font-bold py-1 px-6 rounded-lg inline-flex items-center";

////////////////////////////////////

const listURL = "/products";
//////////////////////////////////

const ProductCard = () => {
  ////** Сохранение данных. Метод POST на API внешнего сервера. */
  const [addProduct] = useAddProductMutation();
  const [productName, setProductName] = useState();
  const navigate = useNavigate();

  const handleAddProduct = async () =>{
    if(productName){
      await addProduct({name: productName}).unwrap();
      // Закрытие текущей страницы
    
    }
    navigate("/products");
  }



/////////////////////////////////////////////////////////////////////


  //  const [file, setFile] = useState(null); //**Это для загрузки картинок. */

  ///// Получаем ID элемента, при открытии страницы.
  const { productID } = useParams();
  


  

  //////////////////////////////////////////////////////////////////////////
  //**"Получаем все товары из базы." */

  const [limitPerPage] = useState(null);
  const { data = [], isLoading } = useGetGoodsQuery(limitPerPage);

  //**Показываем что идет загрузка, пока получаем все товары из базы." */
  if (isLoading) return <h1>Loading....</h1>;

  const dataFromApi = [...data];

  //** Это получение данных из API файла с Goods. */
  let findedGoodData = dataFromApi.find((item) => item.code === productID);
  function returndataFromGoodsApi() {
    if (findedGoodData) {
      return findedGoodData;
    }
    return "";
  }

  //**Проставляем заголовок страницы. */
  function h1Title(productID) {
    if (productID === undefined) {
      return (
        <h1 className="title pl-4 pt-4 font-bold text-[#002060]">
          "New goods * (Creating)"
        </h1>
      );
    }
    return (
      <h1 className="title pl-4 pt-4 font-bold text-[#002060]">
        ({returndataFromGoodsApi().code}) {returndataFromGoodsApi().name} *
        (Редактирование)
      </h1>
    );
  }

  // const handleProductPictureChange = (event) => {
  //   setFile(event.target.files[0]);
  // };
  // const readFile = () => {
  //   const reader = new FileReader();
  //   reader.onload = () => console.log(reader.result);
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <>
      <TopBar className="sticky" />

      <div className="flex flex-1">
        <div className=" w-[10%] ">
          <Sidebar />
        </div>

        <form className="p-4 flex w-[90%] min-w-[90%]">
          <div className="border text-gray-600 rounded-md w-full min-w-full">
            {h1Title(productID)}

            {/* //*************** Это кнопки Формы */}
            <div className=" bg-white flex p-4 border-b-2 ">
              <div className="pr-2 ">
                <button  className={btnSubmitStyle}
                onClick={handleAddProduct}>
                  OK
                </button>
              </div>

              <div className="pr-2 ">
                <button type="save" id="btnSave" className={btnSaveStyle}>
                  Save
                </button>
              </div>

              <div className="pr-2 ">
              <Link to={listURL} rel="stylesheet">
                <button
                  type="cancel"
                  id="btnCancel"
                  className={btnCancelStyle}>
                 Cancel
                </button>
                </Link>
              </div>
            </div>
            {/* //////////////////////////////////////////////// */}
            <div className="grid grid-cols-3 p-4 justify-between">
              <div className="flex flex-col">
                <div>
                  <span className="text-[#002060] mr-2 ">Name: </span>
                  <input
                    type="text"
                    name="ProductName"
                    id="ProductName"
                    placeholder="Good or service name...."
                    className="text-amber-900 border rounded-md w-[100%] pl-1 focus:outline-none  focus:border-blue-900 laceholder:font-thin italic"
                    defaultValue={returndataFromGoodsApi().name}//{}
                    onChange={(event) => setProductName(event.target.value)}
                  />
                </div>

                <div className="pt-4">
                  <span className="text-[#002060] mr-2">Name for print: </span>
                  <input
                    type="text"
                    name="ProductNameForPrint"
                    id="ProductNameForPrint"
                    placeholder="Good or service name...."
                    className="text-amber-900 border rounded-md w-[100%] pl-1 focus:outline-none  focus:border-blue-900 laceholder:font-thin italic"
                    value={returndataFromGoodsApi().name}
                  />
                </div>

                <div className="pt-2">
                  <span className="text-[#002060]">Növü: </span>
                  <select
                    name="typeOfProduct"
                    id="typeOfProduct"
                    className=" text-amber-900 border rounded-md w-[100%] pl-1 
                      focus:outline-none  focus:border-blue-900 placeholder:font-thin italic "
                  >
                    <option className="text-[#002060]">
                      {returndataFromGoodsApi().type}
                    </option>

                    <option className="text-[#002060]"></option>
                  </select>
                </div>
                <div flex className="pt-2">
                  <span className="text-[#002060] mt-4 ">
                    Единица измерения:{" "}
                  </span>
                  <div
                    className="w-[100%] justify-between text-amber-900 first-line:font-bold 
                 border rounded-md   focus:border-blue-900
                 inline-flex items-center  placeholder:font-thin italic"
                  >
                    <input
                      name="searchInputName"
                      className="ml-1 w-full focus:outline-none 
                    focus:border-blue-900"
                      placeholder="Выберите единицу измерения..."
                      value={returndataFromGoodsApi().unit_of_measurement}
                      // onChange={(event) => setSearchInput(event.target.value)}
                    ></input>

                    <button
                      type="button"
                      className=" text-gray-900  hover:text-[#002060] "
                      // onClick={(event) => setSearchInput((event.target.value = ""))}
                    >
                      <ImList2 className="mr-2 w-4 h-4  text-gray-500" />
                    </button>
                  </div>
                </div>

                <div flex className="pt-2">
                  <span className="text-[#002060] mt-4 ">Артикул: </span>
                  <div
                    className="w-[100%] justify-between text-amber-900 first-line:font-bold 
                 border rounded-md   focus:border-blue-900
                 inline-flex items-center  placeholder:font-thin italic"
                  >
                    <input
                      name="searchInputName"
                      className="ml-1 w-full focus:outline-none 
                    focus:border-blue-900"
                      placeholder="Выберите артикул измерения..."
                      // value={searchInput}
                      // onChange={(event) => setSearchInput(event.target.value)}
                    ></input>

                    <button
                      type="button"
                      className=" text-gray-900  hover:text-[#002060] "
                      // onClick={(event) => setSearchInput((event.target.value = ""))}
                    >
                      <ImList2 className="mr-2 w-4 h-4  text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col pl-4"></div>

              <div className="flex flex-col">
                <div>
                  <span className="text-[#002060]">Code: </span>
                  <input
                    type="number"
                    disabled
                    name="productId"
                    id="productId"
                    className="ml-2 pl-1 text-amber-900 border rounded-md w-[10rem] 
                    focus:outline-none  focus:border-blue-900 placeholder:font-thin italic "
                    value={returndataFromGoodsApi().code}
                  />
                </div>

                <div className="pt-2">
                  <span className="text-[#002060] pr-1">Группа:</span>
                  <div
                    className="w-[83%] justify-between text-amber-900 first-line:font-bold 
                 border rounded-md   focus:border-blue-900
                 inline-flex items-center  placeholder:font-thin italic"
                  >
                    <input
                      name="searchInputName"
                      className="ml-1 w-full focus:outline-none 
                    focus:border-blue-900"
                      placeholder="Родитель номенклатуры..."
                      // value={searchInput}
                      // onChange={(event) => setSearchInput(event.target.value)}
                    ></input>

                    <button
                      type="button"
                      className=" text-gray-900  hover:text-[#002060] "
                      // onClick={(event) => setSearchInput((event.target.value = ""))}
                    >
                      <ImList2 className="mr-2 w-4 h-4  text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Kartinka tovara */}
                <div className="mt-5 bg-gray-100 h-48 flex justify-center items-center rounded-md">
                  <div>
                    <MdOutlineAddAPhoto className="h-28 w-28 border-1 rounded-xl cursor-pointer text-gray-300" />
                    <input
                      type="file"
                      // onChange={handleProductPictureChange}
                    />
                  </div>
                </div>
                {/* <button onClick={readFile}>Загрузить изображение</button> */}
                {/* /////////////////////////// */}
              </div>
            </div>

            {/* Это закладки"*/}

            <LabTabsForProductCard dataOfProduct={returndataFromGoodsApi()} />
            {/* /////////////////////////// */}
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductCard;
