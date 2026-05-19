// import { useState } from "react";

// const initialFriends = [
//   {
//     id: 118836,
//     name: "Clark",
//     image: "https://i.pravatar.cc/48?u=115436",
//     balance: -7,
//   },
//   {
//     id: 933372,
//     name: "Jonas",
//     image: "https://i.pravatar.cc/48?u=453472",
//     balance: 20,
//   },
//   {
//     id: 499476,
//     name: "Anthony",
//     image: "https://i.pravatar.cc/48?u=499476",
//     balance: 0,
//   },
// ];

// function Button({ children, onClick }) {
//   return (
//     <button className="button" onClick={onClick}>
//       {children}
//     </button>
//   );
// }

// export default function App() {
//   const [friends, setFriends] = useState(initialFriends);
//   const [showNewFriend, setShowNewFriend] = useState(false);
//   const [selectFriend, setSelectFriend] = useState(null);

//   function toggleShow() {
//     setShowNewFriend((s) => !s);
//   }

//   function AddNewFriend(friend) {
//     setFriends((fs) => [...fs, friend]);
//     setShowNewFriend(false);
//   }

//   function handleToggleSelect(friend) {
//     setSelectFriend((cur) => (cur?.id === friend.id ? null : friend));
//     // close the add new friend form
//     setShowNewFriend(false);
//   }

//   function handleBalance(balance, sel) {
//     setFriends((friends) =>
//       friends.map((friend) =>
//         friend.id === sel?.id
//           ? { ...friend, balance: friend.balance + balance }
//           : friend,
//       ),
//     );
//     setSelectFriend(null);
//   }

//   function deleteFriend(id) {
//     setFriends((friends) => friends.filter((friend) => friend.id !== id));
//   }

//   return (
//     <div className="app">
//       <Sidebar
//         friends={friends}
//         AddNewFriend={AddNewFriend}
//         showNewFriend={showNewFriend}
//         selectFriend={selectFriend}
//         toggleShow={toggleShow}
//         handleToggleSelect={handleToggleSelect}
//         deleteFriend={deleteFriend}
//       />
//       {selectFriend && (
//         <SplitForm
//           key={selectFriend?.id} // important to reset state
//           selectFriend={selectFriend}
//           handleBalance={handleBalance}
//         />
//       )}
//     </div>
//   );
// }

// function Sidebar({
//   friends,
//   AddNewFriend,
//   handleToggleSelect,
//   selectFriend,
//   showNewFriend,
//   toggleShow,
//   deleteFriend,
// }) {
//   return (
//     <div className="sidebar">
//       <ul>
//         {friends.map((friend) => (
//           <Friend
//             friend={friend}
//             key={friend.id}
//             selectFriend={selectFriend}
//             deleteFriend={deleteFriend}
//             handleToggleSelect={handleToggleSelect}
//           />
//         ))}
//       </ul>

//       {showNewFriend && <AddFriendForm AddNewFriend={AddNewFriend} />}

//       <Button onClick={toggleShow}>
//         {showNewFriend ? "Close" : "Add Friend"}
//       </Button>
//     </div>
//   );
// }

// function Friend({ friend, handleToggleSelect, selectFriend, deleteFriend }) {
//   let message;
//   let color;
//   if (friend.balance > 0) {
//     message = `${friend.name} owes you ${friend.balance}€`;
//     color = "green";
//   } else if (friend.balance === 0) {
//     message = `you and ${friend.name} are even`;
//     color = "";
//   } else {
//     message = `You Owe ${friend.name} ${-friend.balance}€`;
//     color = "red";
//   }

//   return (
//     <li className={selectFriend?.id === friend?.id ? "selected" : ""}>
//       <img src={friend.image} alt={friend.name} />
//       <h3>{friend.name}</h3>
//       <p className={color}>{message}</p>
//       <Button onClick={() => handleToggleSelect(friend)}>
//         {selectFriend?.id === friend?.id ? "Close" : "Select"}
//       </Button>
//       <button className="delBtn" onClick={() => deleteFriend(friend.id)}>
//         &times;
//       </button>
//     </li>
//   );
// }

// function AddFriendForm({ AddNewFriend }) {
//   const [name, setName] = useState("");
//   const [image, setImg] = useState("https://i.pravatar.cc/48");

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!name || !image) return;
//     const id = crypto.randomUUID();
//     const newFriend = {
//       name,
//       image: `${image}?=${id}`,
//       balance: 0,
//       id,
//     };
//     AddNewFriend(newFriend);
//   }
//   return (
//     <form className="form-add-friend" onSubmit={handleSubmit}>
//       <label>👫 Friend Name</label>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <label>🌄 Image URL</label>
//       <input
//         type="text"
//         value={image}
//         onChange={(e) => setImg(e.target.value)}
//       />
//       <Button>Add</Button>
//     </form>
//   );
// }

// function SplitForm({ selectFriend, handleBalance }) {
//   const [billVal, setBillVal] = useState("");
//   const [userVal, setUserVal] = useState("");
//   const friendVal = billVal ? billVal - userVal : "";
//   const [whoPays, setWhoPays] = useState("user");
//   let balance;

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!billVal || userVal === "") return;
//     balance = whoPays === "user" ? friendVal : -userVal;
//     handleBalance(balance, selectFriend);
//   }

//   return (
//     <form className="form-split-bill" onSubmit={handleSubmit}>
//       <h2>Split a bill with {selectFriend.name}</h2>

//       <label>💰 Bill value</label>
//       <input
//         type="text"
//         value={billVal}
//         onChange={(e) => setBillVal(+e.target.value)}
//       />

//       <label>🧍‍♀️ Your expense</label>
//       <input
//         type="text"
//         value={userVal}
//         onChange={(e) =>
//           setUserVal(+billVal >= +e.target.value ? +e.target.value : +userVal)
//         }
//       />

//       <label>👫 {selectFriend.name}'s expense</label>
//       <input type="text" disabled value={friendVal} />

//       <label>🤑 Who is paying the bill</label>
//       <select value={whoPays} onChange={(e) => setWhoPays(e.target.value)}>
//         <option value="user">You</option>
//         <option value="friend">{selectFriend.name}</option>
//       </select>

//       <Button>Split Bill</Button>
//       {/* handleSubmiting the form not click the button */}
//     </form>
//   );
// }

function App() {
  return <div>app</div>;
}

export default App;
