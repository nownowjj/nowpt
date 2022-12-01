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
            }).catch(error =>{
              console.log(error);
        });
    }
    render() {
        return (
            <div>
                {this.state.test}, api2
                <br/>
                 Test 페이지
            </div>
        )
    }
}

export default TestComponent ;