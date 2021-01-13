import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { UserChat } from "./core/models/userChat";
import Axios from "axios";
import { Loader } from "./components/Loader";
import { ShowingChatBox } from "./components/ShowingChatBox";
import { HiddenChatBox } from "./components/HiddenChatBox";

const App: React.FC = () => {
	const [chatList, setChatList] = useState<UserChat[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [[showingChatBoxArr, hiddenChatBoxArr], setChatBox] = useState<
		[UserChat[], UserChat[]]
	>([[], []]);

	const deleteAnElementOfChatBoxArr = (
		array: UserChat[],
		id: number
	): UserChat[] => {
		const arr: UserChat[] = array.filter((item) => item.id !== id);
		return arr;
	};

	const handleOpenChat = (user: UserChat): void => {
		let hiddenArr: UserChat[] = [...hiddenChatBoxArr];
		let showArr: UserChat[] = [...showingChatBoxArr];
		if (hiddenChatBoxArr.some((item) => item.id === user.id)) {
			hiddenArr = deleteAnElementOfChatBoxArr(hiddenArr, user.id);
		}
		if (showArr.every((item) => item.id !== user.id) || showArr.length === 0) {
			if (showArr.length === 2) {
				// const deleteFirstElement = showArr.shift();
				// ham shift return 1 cai userChat hoac undefined nen no d cho chay...
				// hiddenArr = [...hiddenArr, deleteFirstElement];
				hiddenArr = [...hiddenArr, showArr[0]];
				showArr = deleteAnElementOfChatBoxArr(showArr, showArr[0].id);
			}
			showArr = [...showArr, user];
			console.log(showArr);
		}
		setChatBox([showArr, hiddenArr]);
	};

	const deleteShowingChatBoxItem = (id: number) => {
		const arr = deleteAnElementOfChatBoxArr(showingChatBoxArr, id);
		setChatBox([arr, hiddenChatBoxArr]);
	};

	const hideChatBox = (user: UserChat): void => {
		const arr = deleteAnElementOfChatBoxArr(showingChatBoxArr, user.id);
		setChatBox([arr, [...hiddenChatBoxArr, user]]);
	};

	const renderUserList = (): JSX.Element[] | undefined => {
		if (chatList && chatList.length > 0) {
			return chatList.map((user, index) => {
				return (
					<div key={index} className="mb-4">
						<button
							className="btn btn-info"
							key={user.id}
							onClick={() => handleOpenChat(user)}
						>
							{user.userName}
						</button>
					</div>
				);
			});
		}
	};

	useEffect(() => {
		setIsLoading(true);
		Axios.get(`https://5ff9505c17386d0017b51c24.mockapi.io/chatboxlist`)
			.then((result) => {
				setChatList(result.data);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	if (isLoading) {
		return <Loader></Loader>;
	}

	return (
		<div className="container">
			<div className="row">
				{renderUserList()}
				{showingChatBoxArr && (
					<ShowingChatBox
						showingChatBoxArr={showingChatBoxArr}
						deleteShowingChatBoxItem={deleteShowingChatBoxItem}
						hideChatBox={hideChatBox}
					></ShowingChatBox>
				)}
				{hiddenChatBoxArr && (
					<HiddenChatBox
						hiddenChatBoxArr={hiddenChatBoxArr}
						handleOpenChat={handleOpenChat}
					></HiddenChatBox>
				)}
			</div>
		</div>
	);
};

export default App;
