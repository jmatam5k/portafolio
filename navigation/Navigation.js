/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component} from 'react';
import './Navigation.scss';
import Link from '../Link';
import cx from 'classnames';
import { slide as Menu } from 'react-burger-menu';
import { menuStyle, linkStyle } from './MobileMenuStyle';


class Navigation extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      mobMenu: false,
      submenu: false
    };
  }
  toggleMenu(){
    this.setState({open: !this.state.open,opensub:false})
  }
  toggleMobileMenu(){
    this.setState({mobMenu: !this.state.mobMenu});
  }
  toggleSubmenu(){
    this.setState({
      submenu: !this.state.submenu
    });
  }
  isMobMenuOpen(state) {
    if(!state.isOpen){
      setTimeout(()=>{this.toggleMobileMenu()}, 100);
    }
  }
  doBottom(e){
    e.preventDefault();
    this.scrollTo(document.body, 650, 500,this);
  }

  scrollTo(element, to, duration,este) {
    var start = element.scrollTop,
        change = to - start,
        increment = 20;

    var animateScroll = function(elapsedTime) {
        elapsedTime += increment;
        var position = este.easeInOut(elapsedTime, start, change, duration);
        element.scrollTop = position;
        if (elapsedTime < duration) {
            setTimeout(function() {
                animateScroll(elapsedTime);
            }, increment);
        }
    };

    animateScroll(0);
  }

  easeInOut(currentTime, start, change, duration) {
    currentTime /= duration / 2;
    if (currentTime < 1) {
        return change / 2 * currentTime * currentTime + start;
    }
    currentTime -= 1;
    return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
  }
  displaySub(is,e){

    e.stopPropagation();
    this.setState({opensub: is})
  }
  releaseSub(e){
    e.stopPropagation();
    this.setState({opensub: false})
  }
  subBlock(e){
    e.stopPropagation();
  }
  render(){
    var nav = cx("Navigation");
    const mobLink = cx('mobile-link', 'menu-item');
    if(this.state.open){
      //nav = cx("Navigation","shownNav");
    }
    let hclass = "";

     if(this.props.is_inicio){
      hclass="img_header"
     }
     let este = this;

    return (

      <header className={hclass}>
        <div className="navbar-header">
          {
            function(){
              if(!this.state.mobMenu) {
                return(
                  <button type="button" className="navbar navbar-toggle collapsed" onClick={this.toggleMobileMenu.bind(this)} data-toggle="collapse" data-target="#menu-ecomas" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                );
              }
            }.call(this)
          }
        </div>

        <Menu right
              styles={menuStyle}
              isOpen={ this.state.mobMenu }
              width={ 280 }
              customBurgerIcon={ false }
              onStateChange={ this.isMobMenuOpen.bind(this) }
              pageWrapId={ "page-wrap" }>

            <a id="inicio" className="mobile-link" href="/">Inicio</a>
            <a id="nosotros" className="mobile-link" href="/nosotros">Nosotros</a>
            <span onClick={this.toggleSubmenu.bind(this)} style={linkStyle} id="productos" className="mobile-link">
              Productos
            </span>
            {
              function(){
                if(this.state.submenu){
                  return (
                    <ul className="productList">
                      <li className="product">
                        <a  className="mobile-sublink" href="/productos">Todos los productos</a>
                      </li>
                      <li className="product">
                        <a className="mobile-sublink" href="/maquina_wl3">Máquina de agua WL3</a>
                      </li>
                      <li className="product">
                        <a className="mobile-sublink" href="/maquina_wl3000">Máquina de agua WL 3000</a>
                      </li>
                      <li className="product">
                        <a className="mobile-sublink" href="/maquina_wl1000gf">Máquina de agua WL 1000GF</a>
                      </li>
                      <li className="product">
                        <a className="mobile-sublink" href="/maquina_2000mostrador">Máquina de agua WL 2000IT Mostrador</a>
                      </li>
                      <li className="product">
                        <a className="mobile-sublink" href="/maquina_wl2000it">Máquina de agua WL 2000IT</a>
                      </li>
                    </ul>
                  );
                }
              }.call(this)
            }

            <a id="beneficios" className="mobile-link" href="/beneficios">Beneficios</a>
            <a id="servicios" className="mobile-link" href="/servicios">Servicios</a>
            <a id="clientes" className="mobile-link" href="/clientes">Clientes</a>
            <a id="certificaciones" className="mobile-link" href="/certificaciones">Certificaciones</a>
            <a id="pago_online" className="mobile-link txt_calipso" href="http://pagos.qualitywater.cl/" target="_blank">Pago online</a>
            <a id="contacto" className="mobile-link" href="/contacto">Contacto</a>
        </Menu>

        <div className="container-fluid">
          <a className="navbar-brand nopad" href="/">
            <img src={require('./logo_qw.png')} className="img-responsive" />
          </a>
          <ul className={nav} role="menu" id="menu-qw">
            <li className="btn_fono_top hidden-xs">
              <a href="tel:+56223785466">
                +562 2378 54 66
              </a>
            </li>
            <li className="Navigation-item">
              <a className="Navigation-link" href="/" onClick={function(e){Link.handleClick(e);este.props.toggleMenu(); }}>Inicio </a>
            </li>
            <li className="Navigation-item">
              <a className="Navigation-link" href="/nosotros" onClick={function(e){Link.handleClick(e);este.props.toggleMenu(); }}>Nosotros</a>
            </li>
            <li className="Navigation-item" ref="productos" onMouseOver={this.displaySub.bind(this,'productos')} onMouseLeave={this.releaseSub.bind(this)}>
              <a className="Navigation-link" href="/productos" onClick={function(e){Link.handleClick(e);este.props.toggleMenu(); }} onMouseOver={this.subBlock.bind(this)} >Productos</a>
              <div className={cx("subheader",{"open": this.state.opensub == 'productos'})} onMouseOver={this.subBlock.bind(this)}>
                <ul className="container">
                  <li><a className="" href="/maquina_wl3">Máquina de agua WL3</a></li>
                  <li><a className="" href="/maquina_wl3000">Máquina de agua WL 3000</a></li>
                  <li><a className="" href="/maquina_wl1000gf">Máquina de agua WL 1000GF</a></li>
                  <li><a className="" href="/maquina_2000mostrador">Máquina de agua WL 2000IT Mostrador</a></li>
                  <li><a className="" href="/maquina_wl2000it">Máquina de agua WL 2000IT</a></li>
                </ul>
              </div>
            </li>
            <li className="Navigation-item">
              <a className="Navigation-link" href="/beneficios" onClick={function(e){Link.handleClick(e);este.props.toggleMenu(); }}>Beneficios</a>
            </li>
            <li className="Navigation-item">
              <a className="Navigation-link" href="/servicios" onClick={function(e){Link.handleClick(e);este.props.toggleMenu(); }}>Servicios</a>
            </li>
            <li className="Navigation-item">
              <a className="Navigation-link" href="/clientes" onClick={function(e){Link.handleClick(e);este.props.toggleMenu(); }}>Clientes</a>
            </li>
            <li className="Navigation-item">
              <a className="Navigation-link" href="/certificaciones" onClick={function(e){Link.handleClick(e);este.props.toggleMenu(); }}>Certificaciones</a>
            </li>
            <li className="Navigation-item">
              <a className="Navigation-link txt_calipso" href="http://pagos.qualitywater.cl/" target="_blank" >Pago online</a>
            </li>
            <li className="Navigation-item">
              <a className="Navigation-link" href="/contacto" onClick={function(e){Link.handleClick(e);este.props.toggleMenu(); }}>Contacto</a>
            </li>
          </ul>


        </div>
      </header>
    );
  }
}

export default Navigation;
