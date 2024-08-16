type UserType = "admin" | "editor" | "user"| "default";

type User = { name: string; type: UserType };

const users: User[] = [
  { name: "john", type: "admin" },
  { name: "mike", type: "editor" },
  { name: "abdelrahman", type: "user" },
  {name:"default case", type:"default"}
];

const userActionsStates: Record<UserType, string[]> = {
  admin: ["create-", "read-", "update-", "delete"],
  editor: ["create-", "read-", "update"],
  user: ["read-", "update"],
  default:["read"]
};



export default function Test() {
  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.name}>
            {/* we need to render actions depending on user type */}
            <p>{user.name}</p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              user actions :
              {(userActionsStates[user.type] ?? userActionsStates["default"]).map((a) => {
                return <div key={a} style={{display:"flex", gap:"10px", border: "1px solid #eeeee", padding:"3px, 7px"}}>{a}</div>;})}
            </div>
          </div>
        );
      })}
    </div>
  );
}



// function Action({a}:IA) {
//   // const { a } = props;
//   console.log(a, "a");
//   return <div style={{display:"flex", gap:"10px", border: "1px solid #eeeee", padding:"3px, 7px"}}>{a}</div>;
// }
