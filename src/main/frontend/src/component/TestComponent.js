import React, {Component} from "react";
import axios from "axios";

class TestComponent  extends Component {
    constructor(props) {
        super(props)
        this.state = {
            test: ""
        }
    }

    componentDidMount() {
        this.getApi();
    }

    getApi = () => {
        axios.get("http://localhost:8123/api/test")
            .then(res => {
                console.log(res);
                this.setState({
                    test: res.data.test
                })
            })
            .catch(res => console.log(res))
    }






    render() {
        return (
            <div>
                {this.state.test}, api2
                <br/>
                Main > Test 페이지
            </div>
        )
    }
}

export default TestComponent ;