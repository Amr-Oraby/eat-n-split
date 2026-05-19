import AddFriendForm from "./AddFriendForm";
import Button from "./Button";
import Friend from "./Friend";

type Tfriend = {
  id: number;
  name: string;
  image: string;
  balance: number;
};

type SidebarProps = {
  friends: Tfriend[];
  selectFriend: Tfriend | null;
  showNewFriend: boolean;
  AddNewFriend(newFriend: Tfriend): void;
  toggleShow(): void;
  handleToggleSelect(friend: Tfriend): void;
  deleteFriend(id: number): void;
};

function Sidebar({
  friends,
  AddNewFriend,
  handleToggleSelect,
  selectFriend,
  showNewFriend,
  toggleShow,
  deleteFriend,
}: SidebarProps) {
  return (
    <div className="sidebar">
      <ul>
        {friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            selectFriend={selectFriend}
            deleteFriend={deleteFriend}
            handleToggleSelect={handleToggleSelect}
          />
        ))}
      </ul>

      {showNewFriend && <AddFriendForm AddNewFriend={AddNewFriend} />}

      <Button onClick={toggleShow}>
        {showNewFriend ? "Close" : "Add Friend"}
      </Button>
    </div>
  );
}

export default Sidebar;
