import { Status } from "tweeter-shared";
import { Link } from "react-router-dom";
import Post from "../statusItem/Post";
import useNavigation from "../userInfo/UseNavigationHook";

interface Props {
    value: Status;
}

const StatusItem = (props: Props) => {
    const navigateToUser = useNavigation();

    return (
        <div className="col bg-light mx-0 px-0">
            <div className="container px-0">
                <div className="row mx-0 px-0">
                    <div className="col-auto p-3">
                        <img
                            src={props.value.user.imageUrl}
                            className="img-fluid"
                            width="80"
                            alt="Posting user"
                        />
                    </div>
                    <div className="col">
                        <h2>
                            <b>
                                {props.value.user.firstName}{" "}
                                {props.value.user.lastName}
                            </b>{" "}
                            -{" "}
                            <Link
                                to={props.value.user.alias}
                                onClick={(event) => navigateToUser(event)}
                            >
                                {props.value.user.alias}
                            </Link>
                        </h2>
                        {props.value.formattedDate}
                        <br />
                        <Post status={props.value} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusItem;
