// import React, { useEffect, useState } from "react";
// import "./List.css";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";

// const List = () => {

//   const [list, setList] = useState([]);
//   // const url = "https://mern-project-backend-y6i5.onrender.com";
//   const url ="http://localhost:4001";
//   const fetchList = async () => {
//     const res = await axios.get(`${url}/api/food/foodlist`);
//     console.log("response:", res.data);
//     if (res.data.success) {
//       setList(res.data.data);
//     } else {
//       toast.error("Error");
//     }
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   // const removeFood = async (foodId)=>{
//   //     console.log("Id:",foodId);
//   //     const res = await axios.post(`${url}/api/food/remove`,{id:foodId});

//   //     await fetchList();

//   //     if(res.data.success){
//   //       toast.success(res.data.message);
//   //     }
//   //     else{
//   //       toast.error("Error");
//   //     }
//   // }
//   const removeFood = async (foodId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const res = await axios.post(`${url}/api/food/remove`, { id: foodId });

//         if (res.data.success) {
//           await fetchList();
//           Swal.fire({
//             title: "Deleted!",
//             text: "The item has been deleted.",
//             icon: "success"
//           });
//           toast.success(res.data.message);
//         } else {
//           toast.error("Error deleting item.");
//         }
//       }
//     });
//   };
//   const handleUpdate = (item) => {
//     // You can use React Router's useNavigate or pass the item data to a modal
//     console.log("Update clicked for:", item);
//     toast.info("Update feature coming soon!");
//   };

//   return (
//     <div className="list add flex-col">
//       <p>All Foods List</p>
//       <div className="list-table">
//         <div className="list-table-format title">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>
//         {list.map((item, index) => {
//           return (
//             <div className="list-table-format" key={index}>
//               <img src={`${url}/images/` + item.image}></img>
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>${item.price}</p>
//               <div className="list-actions">
//   <span onClick={() => removeFood(item._id)} className="cursor delete">🗑️</span>
//   <span onClick={() => handleUpdate(item)} className="cursor update">✏️</span>
// </div>
//               {/* <p onClick={()=>removeFood(item._id)} className="cursor" >x</p> */}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };
// export default List;



import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { url } from "../../../config";

const List = () => {
  const [list, setList] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  const fetchList = async () => {
    const res = await axios.get(`${url}/api/food/foodlist`);
    if (res.data.success) {
      setList(res.data.data);
    } else {
      toast.error("Error fetching food list");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.post(`${url}/api/food/remove`, { id: foodId });

        if (res.data.success) {
          await fetchList();
          Swal.fire("Deleted!", "The item has been deleted.", "success");
          toast.success(res.data.message);
        } else {
          toast.error("Error deleting item.");
        }
      }
    });
  };

  const handleUpdate = (item) => {
    setEditItem(item._id);
    setEditedData({
      name: item.name,
      price: item.price,
      category: item.category,
    });
    setIsChanged(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    
  if (name === "price" && Number(value) < 0) return;

    const updated = { ...editedData, [name]: value };
    setEditedData(updated);

    const original = list.find((f) => f._id === editItem);
    setIsChanged(
      updated.name !== original.name ||
      updated.price !== original.price.toString() ||
      updated.category !== original.category
    );
  };

  const handleCancelEdit = () => {
    setEditItem(null);
    setEditedData({});
    setIsChanged(false);
  };

  const saveUpdatedFood = async () => {
    try {
      const res = await axios.put(`${url}/api/food/update`, {
        id: editItem,
        ...editedData,
      });

      if (res.data.success) {
        toast.success("Food updated successfully!");
        await fetchList();
        handleCancelEdit();
      } else {
        toast.error("Failed to update food.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => {
          const isEditing = editItem === item._id;

          return (
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/` + item.image} alt={item.name} />

              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editedData.name}
                    onChange={handleEditChange}
                  />
                  <select
                    name="category"
                    value={editedData.category}
                    onChange={handleEditChange}
                  >
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                  </select>
                  <input
                    type="number"
                    name="price"
                    min="0"

                    value={editedData.price}
                    onChange={handleEditChange}
                  />
                </>
              ) : (
                <>
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>${item.price}</p>
                </>
              )}

              <div className="list-actions" >
                {isEditing ? (
                  <>
                    <button
                      onClick={saveUpdatedFood}
                      disabled={!isChanged}
                      className={isChanged ? "active" : "disabled"}
                    >
                      ✅
                    </button> 
                    <button onClick={handleCancelEdit}>❌</button>
                  </>
                ) : (
                  <>
                    
                    <span
                      onClick={() => handleUpdate(item)}
                      className="cursor update"
                    >
                      ✏️
                    </span>
                    <span
                      onClick={() => removeFood(item._id)}
                      className="cursor delete"
                    >
                      🗑️
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
