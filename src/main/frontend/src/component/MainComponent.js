import React, {Component} from "react";
import {mainTest} from "../api/Api";

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
        mainTest()
            .then(response => {
                console.log(response);
                console.log("api/main")
                this.setState({
                    message: response.message
                })
            }).catch(error =>{
            console.log(error)
        });
    }





    render() {
        return (
            <div>
                {this.state.message}, 비로그인시 api 호출안함
                <br/>
                Main 페이지
            </div>
        )
    }
}

export default MainComponent ;