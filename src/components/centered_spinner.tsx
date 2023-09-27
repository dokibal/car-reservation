import { observer } from "mobx-react";
import { CommonStore } from "../stores/common_store";
import { Spinner } from "react-bootstrap";

interface CenteredSpinnerProps {
    commonStore: CommonStore;
}

const CenteredSpinner = ({ commonStore }: CenteredSpinnerProps) => {

    return (
        commonStore.loading ? <div className="centered-content"><Spinner animation="grow" variant="primary"/></div> : <div></div>
    )
}

export default observer(CenteredSpinner);