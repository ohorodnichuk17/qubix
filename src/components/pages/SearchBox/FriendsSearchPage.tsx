import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiClient } from "../../../utils/api/apiClient";
import { Card, Avatar, Button, message } from "antd";
import { APP_ENV } from "../../../env";
import { avatar } from "../../../utils/images";

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
            users.map((user) => {
               const avatarUrl = user.avatar
                  ? `${APP_ENV.BASE_URL}/images/avatars/${user.avatar}`
                  : avatar;
               console.log('Avatar URL:', avatarUrl);

               return (
                  <Card
                     key={user.id}
                     style={{ maxWidth: "400px", margin: "10px auto" }}
                  >
                     <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar size={60} src={avatarUrl} />
                        <h3 style={{ marginLeft: "10px" }}>{`${user.firstName} ${user.lastName}`}</h3>
                     </div>
                     <div style={{ marginTop: "10px", textAlign: "center" }}>
                        <Button
                           type="primary"
                           style={{ backgroundColor: "orange", borderColor: "orange" }}
                        >
                           Add Friend
                        </Button>
                     </div>
                  </Card>
               );
            })
         ) : (
            <p>No friends found with the given name.</p>
         )}
      </div>
   );
};

export default FriendsSearchPage;
