import { useState } from "react";
import { initialFriends } from "./data/initialFriends";
import Sidebar from "./ui/Sidebar";
import SplitForm from "./ui/SplitForm";

type Tfriend = {
  id: number;
  name: string;
  image: string;
  balance: number;
};

export function App() {
  const [friends, setFriends] = useState<Tfriend[]>(initialFriends);
  const [showNewFriend, setShowNewFriend] = useState(false);
  const [selectFriend, setSelectFriend] = useState<null | Tfriend>(null);

  function toggleShow() {
    setShowNewFriend((s) => !s);
  }

  function AddNewFriend(friend: Tfriend) {
    setFriends((fs) => [...fs, friend]);
    setShowNewFriend(false);
  }

  function handleToggleSelect(friend: Tfriend) {
    setSelectFriend((cur) => (cur?.id === friend.id ? null : friend));
    // close the add new friend form
    setShowNewFriend(false);
  }

  function handleBalance(balance: number, sel: Tfriend) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === sel?.id
          ? { ...friend, balance: friend.balance + balance }
          : friend,
      ),
    );
    setSelectFriend(null);
  }

  function deleteFriend(id: number) {
    setFriends((friends) => friends.filter((friend) => friend.id !== id));
  }

  return (
    <div className="app">
      <Sidebar
        friends={friends}
        AddNewFriend={AddNewFriend}
        showNewFriend={showNewFriend}
        selectFriend={selectFriend}
        toggleShow={toggleShow}
        handleToggleSelect={handleToggleSelect}
        deleteFriend={deleteFriend}
      />
      {selectFriend && (
        <SplitForm
          key={selectFriend?.id} // important to reset state
          selectFriend={selectFriend}
          handleBalance={handleBalance}
        />
      )}
    </div>
  );
}

export default App;
