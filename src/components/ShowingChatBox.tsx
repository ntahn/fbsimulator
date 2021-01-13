import { ShowingChatBoxProps } from "../core/models/ShowingChatBoxProps";

export const ShowingChatBox: React.FC<ShowingChatBoxProps> = ({
	showingChatBoxArr,
	deleteShowingChatBoxItem,
	hideChatBox,
}) => {
	const renderDisplayingChatBox = (): JSX.Element[] => {
		return showingChatBoxArr.map((user, index) => {
			return (
				<div key={index} className="card">
					<div className="card-body">
						<h4 className="card-title">{user.userName}</h4>
						<p className="card-text">{user.content}</p>
						<button
							className="btn btn-danger"
							onClick={() => {
								deleteShowingChatBoxItem(user.id);
							}}
						>
							delete Chat
						</button>
						<button
							className="btn btn-secondary"
							onClick={() => hideChatBox(user)}
						>
							hide Chat
						</button>
					</div>
				</div>
			);
		});
	};
	return <div className="col-6">{renderDisplayingChatBox()}</div>;
};
