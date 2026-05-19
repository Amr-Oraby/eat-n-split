import { useState } from "react";
import Button from "./Button";
type Tfriend = {
  id: number;
  name: string;
  image: string;
  balance: number | string;
};

type SplitFormProps = {
  selectFriend: Tfriend;
  handleBalance(balance: number | string, selectFriend: Tfriend): void;
};

function SplitForm({ selectFriend, handleBalance }: SplitFormProps) {
  const [billVal, setBillVal] = useState<number | string>("");
  const [userVal, setUserVal] = useState<number | string>("");
  const friendVal = billVal ? Number(billVal) - Number(userVal) : "";
  const [whoPays, setWhoPays] = useState("user");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!billVal || userVal === 0) return;
    const balance = whoPays === "user" ? friendVal : -userVal;
    handleBalance(balance, selectFriend);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={billVal}
        onChange={(e) => setBillVal(+e.target.value)}
      />

      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={userVal}
        onChange={(e) =>
          setUserVal(+billVal >= +e.target.value ? +e.target.value : +userVal)
        }
      />

      <label>👫 {selectFriend.name}'s expense</label>
      <input type="text" disabled value={friendVal} />

      <label>🤑 Who is paying the bill</label>
      <select value={whoPays} onChange={(e) => setWhoPays(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
      {/* handleSubmiting the form not click the button */}
    </form>
  );
}

export default SplitForm;
