import React, {Component} from "react";
import {homeTest} from "../api/Api";
import mguImg from "../assets/mgu.jpg"

class HomeComponent  extends Component {
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
        // axios.get("/api/main")
        homeTest()
            .then(response => {
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
                api : {this.state.message}
                <br/>
                Home 페이지
                <br/>
                <img src={mguImg} alt="img"/>


            </div>
        )
    }
}

export default HomeComponent ;