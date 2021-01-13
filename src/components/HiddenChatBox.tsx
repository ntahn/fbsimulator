import { HiddenChatBoxProps } from "../core/models/HiddenChatBoxProps";

export const HiddenChatBox: React.FC<HiddenChatBoxProps> = ({
	hiddenChatBoxArr,
	handleOpenChat,
}) => {
	const renderHiddenChatBox = () => {
		if (hiddenChatBoxArr && hiddenChatBoxArr.length > 0) {
			return hiddenChatBoxArr.map((user, index) => {
				return (
					<div key={index} className="card">
						<button
							className="btn btn-success"
							onClick={() => handleOpenChat(user)}
						>
							{user.userName}
						</button>
					</div>
				);
			});
		}
	};

	return <div className="col-6">{renderHiddenChatBox()}</div>;
};
