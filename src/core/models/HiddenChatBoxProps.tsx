import { UserChat } from "./userChat";

export class HiddenChatBoxProps {
	hiddenChatBoxArr: UserChat[] = [];
	handleOpenChat: (user: UserChat) => void = () => {};
}
