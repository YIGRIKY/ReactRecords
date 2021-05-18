import React, {Component} from 'react';
import './post-add-form.css';

export default class PostAddForm extends Component {
    state = {
        text: ''
    }
    onValueChanged = (e) => {
        this.setState({
            text: e.target.value
        })  
    }

    onSubmit = (e) =>{
        e.preventDefault();
        if (this.state.text.trim()) {
            this.props.onAdd(this.state.text);
            this.setState({
                text: ''
            })
        }
    }

    render(){
        return (
            <form
            className="bottom-pannel d-flex"
            onSubmit={this.onSubmit}>
                <input
                    id="inputPostTitle"
                    type="text"
                    placeholder="О чем вы думаете сейчас?"
                    className="form-control new-post-label"
                    onChange={this.onValueChanged}
                    value={this.state.text}
                />
                <button
                    type="submit"
                    className="btn btn-outline-secondary">
                    Добавить
                </button>
            </form>
        );
    }
}
