import { UserChat } from "./userChat";

export class ShowingChatBoxProps {
	showingChatBoxArr: UserChat[] = [];
	deleteShowingChatBoxItem: (id: number) => void = () => {};
	hideChatBox: (user: UserChat) => void = () => {};
}
