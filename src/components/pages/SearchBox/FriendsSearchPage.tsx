import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiClient } from "../../../utils/api/apiClient";
import { message } from "antd";
import SearchFriendResultCard from "./components/SearchFriendResultCard";
import type { ISearchUserResult } from "./types";

const FriendsSearchPage = () => {
	const [users, setUsers] = useState<ISearchUserResult[]>([]);
	const location = useLocation();

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const firstName = queryParams.get("firstName");
		const lastName = queryParams.get("lastName");

		if (!firstName || !lastName) {
			message.error("Both first name and last name are required.");
			return;
		}

		apiClient
			.post("/api/friends/search-friends-by-first-and-last-names", {
				firstName,
				lastName,
			})
			.then((res) => {
				setUsers(res.data);
			})
			.catch((error) => {
				console.error("Error fetching friends by name:", error);
			});
	}, [location.search]);

	return (
		<>
			{users.length > 0 ? (
				users.map((user) => (
					<SearchFriendResultCard key={user.id} friend={user} />
				))
			) : (
				<p>No friends found with the given name.</p>
			)}
		</>
	);
};

export default FriendsSearchPage;
