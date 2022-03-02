import React, { useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { render } from "react-dom";
import { useDispatch } from "react-redux";
import { 
	ENCRYPTION_KEY, 
	COOKIE_AT,
	COOKIE_UT,
	COOKIE_HA,
	GOOGLE_GA_EMPTY,
	api, 
	debug,
	apiTimeout
} from "../config";
import { DialogBox } from "./ui";

const AES_METHOD = 'aes-256-cbc';
const IV_LENGTH = 16;
let shakeout = null;

const focus = (id, shake) => {
	try{
		document.querySelector(id).focus();
		shake && Shake(id);
	}catch(e){}
}

const setCookie = (key, value) => {
	return localStorage.setItem(key, value);
}

const Shake = (ID, sec) => {
	document.querySelector(ID).classList.add("_shake");
    shakeout && clearTimeout(shakeout);
    shakeout = setTimeout(()=>{
        document.querySelector(ID).classList.remove("_shake");
    }, (sec || 0.25) * 1000); 
}

const getCookie = (key) => {
	try{
		return localStorage.getItem(key) || null;
	}catch(e){
		return null;
	}
}

const removeCookie = (key) => {
	try{
		localStorage.removeItem(key);
	}catch(e){}
}

const randit = (len) => {	
	var text = ""; var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";	
	for (var i = 0; i < len; i++){ 
		text += possible.charAt(Math.floor(Math.random() * possible.length)); 
	}
	return text;    
}

const Dialog = (title, content, close, action, extra) => {
	var ID = nanoid();
	var div = document.createElement('div');
	div.id = ID;
	document.body.appendChild(div);
	try{
	  var els = document.getElementsByClassName("dialogbox");
	  if(els.length > 0){
		for(var i = 0; i < els.length; i++){
		  els[i].classList.add('blur');
		}
	  }
	}catch(e){}
	if(!window.__modals){ window.__modals = []; }
	render(<DialogBox ref={(ref)=>(window.__modals[ID] = ref)} ID={ID} title={title} content={content} action={action} close={close} extra={extra} />, document.getElementById(ID));
	return ID;
}

const grab = async (uri, params, timeOut) => {
	const at = await getCookie(COOKIE_AT) || "__";
    const ut = await getCookie(COOKIE_UT) || "__";
    const ha = await getCookie(COOKIE_HA) || "__";
	const Bearer =  window.___ha || ha;
	if(debug){
		uri += uri.indexOf("?") > -1 ? "&__debug=true" : "?__debug=true";
	}
	params = params || {};
	return new Promise((resolve, reject) => {
		axios.post(
			`${api}${uri}`,
			{
				ut: ut,
				at: at,
				...params
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${Bearer}`
				},
				timeout: 1000 * (params.timeOut || timeOut || apiTimeout)
			},
		)
		.then(resp => {
			if("kind" in resp.data){
				resolve(resp.data)
			}else{
				if(resp.data.reason == "oauth" || resp.data.reason == "sessionExpired" || resp.data.reason == "invalidAuthToken"){
					sessionExpired(resp.data.reason == "oauth");
				}else{
					reject(resp.data);
				}
			}
			
		})
		.catch(err => {
			reject(err);
		});
	})
}

const sessionExpired = () => {
	Dialog(
		"Session Expired",
		<h2>Your Session is expired. Reload your page!</h2>,
		{
			label: "Reload",
			onClose: ()=>{
				window.location = window.location.href;
			}
		}
	);
}

const isValidEmail = (e) => {
	let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
	return reg.test(e);
}

const isValidPassword = str => {
	var worriedLetters = ['�'];
	return worriedLetters.some(v => str.includes(v)) ? false : true;
}

const scrollTo = (element, to, duration) => {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

const sendGA = ID => {
	if(window.gtag){
		window.gtag('config', 'G-BGW2MS3JBY')
		ID && ID != GOOGLE_GA_EMPTY && window.gtag('config', ID)
	}
}

const urlencode = str => encodeURIComponent(str);
const urldecode = str => decodeURIComponent(str);

const isValidUri = str => {
	var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
	  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
	  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
	  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
	  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
	  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	return !!pattern.test(str);
}

const formatSize = (bytes) => {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024))),
	nx = bytes / Math.pow(1024, i);
	return  nx.toFixed(2) + ' ' + sizes[i];
}

const formatTime = (millisSinceEpoch) => {
	var secondsSinceEpoch = (millisSinceEpoch / 1000) | 0;
	var secondsInDay = ((secondsSinceEpoch % 86400) + 86400) % 86400;
	var seconds = secondsInDay % 60;
	var minutes = ((secondsInDay / 60) | 0) % 60;
	var hours = (secondsInDay / 3600) | 0;
	if(hours<10){ hours = '0'+hours; }
	return hours + (minutes < 10 ? ":0" : ":")
		+ minutes + (seconds < 10 ? ":0" : ":")
		+ seconds;
}

const slugit = (str, lower) => {
	str = str.replace(/\s+/g, '-');
	str = str.replace(/-{2,}/g, '-');
	return lower ? str.toLowerCase() : str;
}

const copyToClipboard = (str) => {
	const el = document.createElement('textarea');
	let storeContentEditable = el.contentEditable;
	let storeReadOnly = el.readOnly;
	el.value = str;
	el.contentEditable = true;
	el.readOnly = false;
	el.setAttribute('readonly', false);
	el.setAttribute('contenteditable', true);
	el.style.position = 'absolute';
	el.style.left = '-999999999px';
	document.body.appendChild(el);
	const selected =
		document.getSelection().rangeCount > 0
			? document.getSelection().getRangeAt(0)
			: false;
	el.select();
	el.setSelectionRange(0, 999999);
	document.execCommand('copy');
	document.body.removeChild(el);
	if (selected) {
		document.getSelection().removeAllRanges();
		document.getSelection().addRange(selected);
	}
	el.contentEditable = storeContentEditable;
	el.readOnly = storeReadOnly;
	return true;
}

const useForceUpdate = () => {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const Circle = ({
	radius, percent, stroke, color
}) => {
	var ringRadius = (radius/2) - ((stroke || 2) * 2);
	var c = Math.PI * (ringRadius * 2);
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className="progress abs abc" width={radius} height={radius} version="1.1">
			<circle className="ring line" 
				strokeWidth={stroke} 
				fill="transparent"
				stroke="#eeeeee" r={ringRadius} cx={radius/2} cy={radius/2} />
			<circle className="ring" 
				strokeWidth={stroke} fill="transparent"
				stroke={color} r={ringRadius} cx={radius/2} cy={radius/2} 
				style={{
					strokeDasharray: `${c}, ${c}`,
					strokeDashoffset: `${c - Math.floor(percent) / 100 * c}`
				 }} />	
		</svg>
	)
}

const getUriParams = () => {
	var search = window.location.search.substring(1);
	if(search=='') return JSON.parse('{}');	
	var xny = {};
	if("URLSearchParams" in window){
		var items = new URLSearchParams(search);
		for(const [k, v] of items){
			xny[k] = v || ``;
		}
	}else{	
		try{
			xny = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
		}catch(e){
			xny = {};
		}
	}
	return xny;
}

const ucfirst = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const moment = stamp => {
	const now = new Date().getFormated();
	const dt = new Date(stamp).getFormated();
	const time = dt.hours + ":" + dt.minutes + " " + dt.ampm.toUpperCase();	
	if(dt.day == now.day){
		return 'Today, ' + time;
	}else if(now.year > dt.year){
		return now.year - dt.year > 1 ? (now.year-dt.year) + ' years ago' : 'Last year';
	}else{
		return dt.month + "/" + dt.day + (dt.year == now.year ? "" : "/" + dt.year) + " " + time;
	}	 
}

const Logout = async () => {
	return new Promise((resolve, reject) => {
		removeCookie(COOKIE_HA); //Hash
		removeCookie(COOKIE_UT); //UT
		removeCookie(COOKIE_AT); //AT
		resolve()
	})
}

export {
	moment,
	ucfirst,
	getUriParams,
	Circle,
	useForceUpdate,
	copyToClipboard,
    focus,
    setCookie,
    getCookie,
    removeCookie,
	Shake,
    randit,
    grab,
	sessionExpired,
	isValidEmail,
	isValidPassword,
	scrollTo,
	sendGA,
	urlencode,
	urldecode,
	isValidUri,
	formatSize,
	formatTime,
	slugit,
	Dialog,
	Logout
}