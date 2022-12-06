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
                api : {this.state.message}, 홈,메인은 로그인을 하지 않아도 api를 호출 합니다.
                <br/>
                Main 페이지
            </div>
        )
    }
}

export default MainComponent ;