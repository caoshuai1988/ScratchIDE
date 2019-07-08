import React, { Component } from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import asyncComponent from '../utils/asyncComponent'
const login = asyncComponent(() =>import ("../pages/login/login"))
const showVideo = asyncComponent(() =>import ("../pages/show-video/show-video"))
const display = asyncComponent(() =>import ("../pages/display/display"))
const index = asyncComponent(() =>import ("../pages/index/index"))
const video = asyncComponent(() =>import ("../pages/video/video"))

export default class RouteConfig extends Component {
    render() {
        return ( 
        <HashRouter >
           <Switch >
                <Route path = "/display"  component = { display }/>  
                <Route path = "/login"  component = { login }/>  
                <Route path = "/video"  component = { video }/>  
                <Route path = '/showVideo:url'  component = { showVideo }/> 
                <Redirect exact from = '/' to = '/index' />
                <Route component = { index }/>
           </Switch> 
        </HashRouter>
        )
    }
}