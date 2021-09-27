import React from 'react';

class Test extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            height: 100
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({[field]: e.currentTarget.value});
    }

    handleSubmit(e){
        e.preventDefault();
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.height} onChange={this.update("height")}/>
                    <input type="submit" value="Add Water"/>
                </form>
                <br></br>
                <div style={{height: this.state.height, width:"200px", backgroundColor: "red"}}>cup</div>
            </div>
        )
    }
}

export default Test;