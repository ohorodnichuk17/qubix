import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiClient } from "../../../utils/api/apiClient";
import { Card, Avatar, Button, message } from "antd";

interface IUser {
   id: number;
   firstName: string;
   lastName: string;
   avatar: string | null;
}

const FriendsSearchPage = () => {
   const [users, setUsers] = useState<IUser[]>([]);
   const location = useLocation();

   useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const firstName = queryParams.get("firstName");
      const lastName = queryParams.get("lastName");

      if (firstName && lastName) {
         console.log(
            `Searching for friends with first name: ${firstName} and last name: ${lastName}`
         );

         apiClient
            .post(`/api/friends/search-friends-by-first-and-last-names`, {
               firstName,
               lastName,
            })
            .then((res) => {
               console.log("API response:", res.data);
               setUsers(res.data.$values || res.data);
            })
            .catch((error) => {
               console.error("Error fetching friends by name:", error);
            });
      } else {
         message.error("Both first name and last name are required.");
      }
   }, [location.search]);

   return (
      <div>
         {users.length > 0 ? (
            users.map((user) => (
               <Card
                  key={user.id}
                  style={{ maxWidth: "400px", margin: "10px auto" }}
               >
                  <Avatar
                     size={60}
                     src={
                        user.avatar
                           ? `${process.env.REACT_APP_BASE_URL}/images/avatars/${user.avatar}`
                           : "/default-avatar.png"
                     }
                  />
                  <h3>{`${user.firstName} ${user.lastName}`}</h3>
                  <Button
                     type="primary"
                     style={{ backgroundColor: "orange", borderColor: "orange" }}
                  >
                     Add Friend
                  </Button>
               </Card>
            ))
         ) : (
            <p>No friends found with the given name.</p>
         )}
      </div>
   );
};

export default FriendsSearchPage;
