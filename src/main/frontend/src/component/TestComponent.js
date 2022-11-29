import React, {Component} from "react";
import axios from "axios";
import {fetchTest} from "../api/Api";

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
        fetchTest()
            .then(response => {
                console.log(response)
                this.setState({
                    test:response.test
                })
            })
            .catch(response => console.log(response))
        // axios.get("/api/test")
        // axios.get("http://localhost:8123/api/test")
        //     .then(res => {
        //         console.log(res);
        //         this.setState({
        //             test: res.data.test
        //         })
        //     })
        //     .catch(res => console.log(res))
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