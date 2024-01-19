import { useEffect, useState, useRef } from "react";
import { Producto } from "./components/Producto";
import { db } from "./firebase/BaseConfig";
import { collection, deleteDoc, onSnapshot, query, doc, addDoc, updateDoc } from "firebase/firestore";

export interface ProductType {
  id: string
  name?: string
}

function App() {

  const [products, setProducts] = useState<ProductType[]>([])
  const [selectedProduct, setSelectedProduct] = useState("none")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedProduct == "none" && inputRef.current?.value != "") {

      await addDoc(collection(db, "products"),
        {
          name: inputRef.current?.value
        })
      inputRef.current.value = ""
    } else {

      await updateDoc(doc(db, "products", selectedProduct.id),
        {
          name: inputRef.current.value
        })

      setSelectedProduct("none")
    }

    console.log("Input value:", inputRef.current.value);

  }

  useEffect(() => {
    console.log(products);


  }, [products])


  useEffect(() => {
    const q = query(collection(db, "products"))
    const unsubscribe = onSnapshot(q,
      (QuerySnapshot) => {
        const productsArray: Array<ProductType> = []
        QuerySnapshot.forEach(doc => {
          productsArray.push({ ...doc.data(), id: doc.id })
        })
        setProducts(productsArray)

      }
    )
    return () => unsubscribe
  }, [])





  const onDeleteProduct = async () => {

    await deleteDoc(doc(db, "products", selectedProduct.id))
    setSelectedProduct("none")
  };

  const onCancel = () => {

    setSelectedProduct("none")
  };

  useEffect(() => {
    selectedProduct !== "none" ? inputRef.current.value = selectedProduct.name : inputRef.current.value = ""
  }, [selectedProduct])


  return (
    <>
      <div className="flex justify-center items-start w-screen h-screen bg-slate-100 font-Poppins">
        <div className="flex flex-col w-[50%]  items-center mt-12">
          <img src="/skart-sm.png" className="md:w-[200px]" />
          <form onSubmit={handleSubmit} className="flex flex-col  mt-5">
            <input placeholder="Product name" type="text" ref={inputRef} className="bg-[#FFE4F7] rounded-lg w-72 h-12 text-[#BA678C] text-[1.2rem] px-5 focus:outline-[#fdd9f2] "></input>
            {selectedProduct == "none" ? <button type="submit" className="bg-[#BA678C] rounded-lg w-72 mt-3 h-12 text-[#FFF5FB] text-[1.2rem] hover:bg-[#CB779C]" >Add to cart</button> :
              (<div className="flex justify-between">
                <button type="submit" className="bg-[#BA678C] rounded-lg w-auto px-3 mt-3 h-12 text-[#FFF5FB] text-[1.2rem] hover:bg-[#CB779C]" >Update</button>
                <button type="button" onClick={onCancel} className="bg-[#faeff6] rounded-lg w-auto px-3 mt-3 h-12 text-[#BA678C] text-[1.2rem] hover:bg-[#FFF5FB] border border-[#BA678C]" >Cancel</button>
                <button type="button" onClick={onDeleteProduct} className="bg-[#D8546D] rounded-lg w-auto px-3 mt-3 h-12 text-[#FFF5FB] text-[1.2rem] hover:bg-[#df5e76]" >Delete</button>
              </div>)}

          </form>
          <div className="flex justify-center flex-wrap my-5">
            {products ? products.map(product => (
              <Producto key={product.id} product={product} setSelectedProduct={setSelectedProduct} />
            )) : null}
          </div>
        </div>
      </div>


    </>
  )
}

export default App
