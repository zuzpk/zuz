import React, { Component } from 'react';
import Cover from "./cover";

class DialogBox extends Component{

    constructor(props){
      super(props);
      this.state = {
        loading: false,
        success: false
      }
      this.shakeout = null;
    }

    componentDidMount(){
      var self = this;
      var ID = this.props.ID;
      setTimeout(()=>{
          document.querySelector(".dialogbox-" + ID).classList.add("visible");
          document.getElementById("msgbox-" + ID).classList.add("visible");
          self.switchBlur(true);
      }, 50);
    }

    switchBlur(mod){
      var els = document.querySelectorAll(".blurify");
      for(let i = 0; i < els.length; i++){
        mod ? els[i]?.classList?.add("blur") : els[i]?.classList?.remove("blur");
      }
    }

    setLoading(mod){
      var self = this;
      self.setState({loading: mod});
    }
    
    Hide(){
      var self = this,
      ID = self.props.ID,
      box = document.getElementById(ID),
      els = document.querySelectorAll(".blurify");
      document.querySelector(".dialogbox-" + ID).classList.remove("visible");
      document.getElementById("msgbox-" + ID).classList.remove("visible");
      setTimeout(()=>{
        self.switchBlur(false);
        box.parentNode.removeChild(box);
        try{
          var __ = document.querySelectorAll(".dialogbox:last-child")[0];
          __ && __.classList.remove('blur');
        }catch(e){}          
      }, 200);
    }

    Shake(sec){
      var self = this;
      var ID = self.props.ID;      
      document.querySelector("#msgbox-" + ID).classList.add("shake");
      this.shakeout && clearTimeout(this.shakeout);
      this.shakeout = setTimeout(()=>{
        document.querySelector("#msgbox-" + ID).classList.remove("shake");
      }, (sec || 0.25) * 1000);        
    }

    SwitchActions(mod){
      var self = this;
      var ID = self.props.ID;
      try{ document.querySelector(".msgbtn-cancel-" + ID).setAttribute("disabled", mod); }catch(e){}
      try{ document.querySelector(".msgbtn-action-" + ID).setAttribute("disabled", mod); }catch(e){}
    }

    render(){

      const { 
          ID,
          title,
          content,
          action,
          close,
          extra
      } = this.props;
      const { onClose } = close;
      const { loading, success } = this.state;

      return (
          <div className={"dialogbox fill dialogbox-" + ID + " fixed"} onClick={e=>{
            if(e.target.classList.contains("dialogbox-" + ID)){
              this.Shake(0.3);
            }
          }}>
              <div className="msgbox abs anim" id={"msgbox-" + ID}>
                  {loading && <Cover success={success} />}
                  <div className="msgbox-blur">
                      <div className="msgbox-head rel">
                          <h2 className="label fonta s18 nous">{title || "Alert"}</h2>
                          <button className="abs cross font" onClick={e=>{ this.Hide(); onClose && onClose(); }}>&times;</button>
                      </div>
                      <div className="msgbox-content fontn s15 rel">
                          {content || <span className="fontn s15">Unable to process request!</span>}
                      </div>
                      <div className="msgbox-footer rel flex aic je">
                        <div className="msgbox-footer-extra">
                            {extra}
                        </div>
                        <div className="msgbox-footer-btns">
                          {action == null && <div className="no-button" />}
                          <button className={"anim button msgbox-close s16 nous font" + (null == action ? " msgbox-action cfff" : "") + " msgbtn-cancel-" + ID} onClick={e=>{ this.Hide(); onClose && onClose(); }}>{close.label || "Close"}</button>
                          {action != null && <button className={"nous button cfff anim msgbox-action s16 font msgbtn-action-" + ID} onClick={e=>{ action.on(); }}>{action.label || "OK"}</button>}
                        </div>
                      </div>
                  </div>
              </div>
          </div>
      )
    }
}

export default DialogBox;