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
  handleAddFriend(newFriend: Tfriend): void;
  toggleShow(): void;
  handleToggleSelect(friend: Tfriend): void;
  handleDelete(id: number): void;
};

function Sidebar({
  friends,
  handleAddFriend,
  handleToggleSelect,
  selectFriend,
  showNewFriend,
  toggleShow,
  handleDelete,
}: SidebarProps) {
  return (
    <div className="sidebar">
      <ul>
        {friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            selectFriend={selectFriend}
            handleDelete={handleDelete}
            handleToggleSelect={handleToggleSelect}
          />
        ))}
      </ul>

      {showNewFriend && <AddFriendForm handleAddFriend={handleAddFriend} />}

      <Button onClick={toggleShow}>
        {showNewFriend ? "Close" : "Add Friend"}
      </Button>
    </div>
  );
}

export default Sidebar;
