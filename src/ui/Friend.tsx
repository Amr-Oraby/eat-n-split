import Button from "./Button";

type Tfriend = { id: number; name: string; image: string; balance: number };

type FriendProps = {
  friend: Tfriend;
  selectFriend: Tfriend | null;
  handleToggleSelect(friend: Tfriend): void;
  deleteFriend(id: number): void;
};

function Friend({
  friend,
  handleToggleSelect,
  selectFriend,
  deleteFriend,
}: FriendProps) {
  let message;
  let color;
  if (friend.balance > 0) {
    message = `${friend.name} owes you ${friend.balance}€`;
    color = "green";
  } else if (friend.balance === 0) {
    message = `you and ${friend.name} are even`;
    color = "";
  } else {
    message = `You Owe ${friend.name} ${-friend.balance}€`;
    color = "red";
  }

  return (
    <li className={selectFriend?.id === friend?.id ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p className={color}>{message}</p>
      <Button onClick={() => handleToggleSelect(friend)}>
        {selectFriend?.id === friend?.id ? "Close" : "Select"}
      </Button>
      <button className="delBtn" onClick={() => deleteFriend(friend.id)}>
        &times;
      </button>
    </li>
  );
}

export default Friend;
