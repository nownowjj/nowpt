import React, {Component} from "react";
import axios from "axios";

class MainComponent  extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ""
        }
    }

    componentDidMount() {
        this.getApi();
    }

    getApi = () => {
        axios.get("http://localhost:8123/api")
            .then(res => {
                console.log(res);
                this.setState({
                    message: res.data.message
                })
            })
            .catch(res => console.log(res))
    }






    render() {
        return (
            <div>
                {this.state.message}, api
                <br/>
                Dashboard 페이지 dd
            </div>
        )
    }
}

export default MainComponent ;