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
                console.log(response);
                console.log("api/home")
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
                {this.state.message}, api
                <br/>
                Home 페이지
                <br/>
                <img src={mguImg}/>

            </div>
        )
    }
}

export default HomeComponent ;