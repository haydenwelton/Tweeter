import useUserInfo from "./UserInfoHook";
import useToastListener from "../toaster/ToastListenerHook";
import {
    NavigationPresenter,
    NavigationView,
} from "../../presenter/NavigationPresenter";

const useNavigation = () => {
    const { displayErrorMessage } = useToastListener();
    const { setDisplayedUser, currentUser, authToken } = useUserInfo();

    const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
        event.preventDefault();
        presenter.loadUser(event, authToken!, currentUser!);
    };

    const listener: NavigationView = {
        displayErrorMessage: displayErrorMessage,
        setDisplayedUser: setDisplayedUser,
    };

    //might need this in useState but I don't think so
    const presenter = new NavigationPresenter(listener);

    return navigateToUser;
};

export default useNavigation;
