import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPannel from '../search-pannel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form'

import './app.css';
import styled from 'styled-components';


export default class App extends Component {
    maxId = 4;
    AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
    `;

    state = {
        data : [
            {label : "Goind to learn React", important : true, like : false, id : 1},
            {label : "That is so good", important : false, like : false, id : 2},
            {label : "I need a break...", important : false, like : false, id : 3},
        ],
        term: '',
        filter: 'all',
    }   

    deleteItem = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];
            return {
                data : newArr
            }
        })
    }
    addItem = (body) => {
        if (body.trim !== '') {
            const newItem = {
                label : body,
                important : false,
                id: this.maxId++
            }
            this.setState(({data}) => {
                const newArr = [...data, newItem];
                return {
                    data: newArr
                }
            })
        }
        
    }

    onToggleImportant = (id) =>{
        this.setState(({data}) => {
            return {
                data: this.editStatus(id, data, 'important')
            }
        }); 
    }
    onToggleLike = (id) =>{
         this.setState(({data}) => {
            return {
                data: this.editStatus(id, data, 'like')
            }
        }); 
    }

    editStatus(id, data, param) {
        const index = data.findIndex(elem => elem.id === id);
        const old = data[index];

        let newItem;

        if (param === 'like')
            newItem = {...old, like: !old.like};     
        else
            newItem = {...old, important: !old.important};

        return [...data.slice(0, index), newItem, ...data.slice(index + 1)];
    }

    searchPost = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        if (filter === 'like') {
            return items.filter((item) => item.like)
        } else {
            return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;  
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);
        return(
        <this.AppBlock>
            <AppHeader
            liked={liked}
            allPosts={allPosts}/>
            <div className="search-pannel d-flex mt-3">
                <SearchPannel
                onUpdateSearch={this.onUpdateSearch}/>
                <PostStatusFilter
                filter = {filter}
                onFilterSelect={this.onFilterSelect}/>
            </div>
            <PostList posts={visiblePosts}
            onDelete={this.deleteItem}
            onToggleImportant={this.onToggleImportant}
            onToggleLike={this.onToggleLike}/>
            <PostAddForm
            onAdd={this.addItem}/>
        </this.AppBlock>)
    }
}
