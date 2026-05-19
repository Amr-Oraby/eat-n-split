import { useState } from "react";
import Button from "./Button";
type Tfriend = {
  id: number | string;
  name: string;
  image: string;
  balance: number;
};

type AddFriendFormProps = {
  AddNewFriend(newFriend: Tfriend): void;
};
function AddFriendForm({ AddNewFriend }: AddFriendFormProps) {
  const [name, setName] = useState("");
  const [image, setImg] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    AddNewFriend(newFriend);
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImg(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

export default AddFriendForm;
