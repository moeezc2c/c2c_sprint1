import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { messageRead, proposalGetByClient } from "../../actions/proposalAndContract";
import "./chat.css";
import "../../App.css";
import io from "socket.io-client";
import Chat from "./chat";
import { SETCONTRACTINFORMATION } from "../../actions/types";
import { toast } from "react-toastify";
import useWindowSize from "../../customHooks/windowResize";
import { Icon } from 'react-icons-kit';
import {arrowLeft2} from 'react-icons-kit/icomoon/arrowLeft2';

const socket = io.connect("http://localhost:5000");


const Messages = ({ auth: { isAuthenticated, user }, proposalAndContract: { ProposalsGetByClient }, proposalGetByClient }) => {
  
  
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [count, setCount] = useState(0);
  const [proposal_id, setProposalId] = useState("");
  const [freelancer_id, setfreelancer_id] = useState("");
  const [hire_manager_id, sethire_manager_id] = useState("");
  const [search, setSearch] = useState(false);
  const [activeProposal, setActiveProposal] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const winSize = useWindowSize();

  // Search Messages Funtionalty
  const [searchString, setSearchString] = useState("")
  const [founds, setFounds] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [toggleChat, setToggleChat] = useState(false);

  useEffect(()=>{
    if(winSize.width <= 767){
      setToggleChat(false);
    }else{
      setToggleChat(true);
    }
  }, [winSize])

  useEffect(() => {
    if (founds.length > 0) {
      document?.getElementById(founds[pagination - 1]._id)?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  }, [pagination])

  useEffect(() => {
    setPagination(1);
    if (founds.length > 0) {
      const regex = new RegExp(searchString, 'gi');
      let element = document.getElementById(founds[0]._id);
      element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  }, [founds])

  const joinRoom = async (e) => {
    dispatch(messageRead(e.proposal_id))
    setActiveProposal(e);
    // setShowChat(false);
    setUsername(user.user_name);
    var RoomName = e.freelancer_id + e.hire_manager_id;
    setRoom(RoomName);
    setProposalId(e.proposal_id);
    setfreelancer_id(e.freelancer_id);
    sethire_manager_id(e.hire_manager_id);
    setCount(1);
  };

  useEffect(() => {
    socket.emit("join_room", room);
    if (count == 1) {
      setShowChat(true);
    }
  }, [username, room]);

  useEffect(() => {
    proposalGetByClient(user,()=>{
      if(ProposalsGetByClient.length > 0){
        document.getElementById(ProposalsGetByClient.reverse()[0]._id).click()
      }
    });
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  function Incremnent() {
    if (pagination < founds.length) {
      setPagination(pagination + 1)
    }
  }

  function Decrement() {
    if (pagination > 1) {
      setPagination(pagination - 1)
    }
  }

  const hireFunction = () => {
    if(!activeProposal.proposal_id || !activeProposal.freelancer_id._id || !activeProposal.hire_manager_id || !activeProposal.job_id){
      toast.error("Something went wrong, please try again later");
    }
    let data = {
      proposal_id: activeProposal.proposal_id,
      freelancer_id: activeProposal.freelancer_id._id,
      hire_manager_id: activeProposal.hire_manager_id,
      job_id: activeProposal.job_id,
    };
    dispatch({
      type: SETCONTRACTINFORMATION,
      payload: data,
    })
    history.push("/startcontract");
  }

  return (
    <>
      <div className="main-page page-dashboard">
        <div className="container">

          <main className="panel-box">
            <div className="panel-box--wrap">

              <section className="messages-box">

                <main className="messages-box--body">

                  {ProposalsGetByClient.length == 0 ?
                    <div className="mt-5 border border-primary p-5">
                      <h6 className="text-primary text-center mb-0">You have no messages</h6>
                    </div>
                    : <>
                      <aside className="messages-box--body-left">
                        <header className="messages-box--search-area">
                          <h3 className="title">
                            {/* {(winSize.width <= 767) && <button className="btn btn-sm btn-back">{'<<'}</button>} */}
                            Messaging</h3>

                        </header>
                        <main className="messages-box--list-area">
                        {
                          ProposalsGetByClient.length > 0 && [...ProposalsGetByClient].reverse().map(Item => (
                            <div key={Item._id} className="messages-box--chat-list-item">
                              <div className="p-3 d-flex align-items-center overflow-hidden" onClick={() => {joinRoom(Item); setToggleChat(true);}}>
                                <div className="dropdown-list-image mr-3">
                                  <img className="rounded-circle" src="assets/images/user/s1.png" alt="" />
                                </div>
                                <div className="font-weight-bold mr-1 overflow-hidden">
                                  <h6 className="text-truncate">{Item.username}</h6>
                                </div>
                                <span className="ml-auto mb-auto">
                                  <div className="text-right text-muted pt-1 small">{Item.proposal_time}</div>
                                </span>
                              </div>
                            </div>
                          ))
                        }
                        </main>
                      </aside>
                      {toggleChat &&
                      <aside className="messages-box--body-right">
                        <header className="messages-box--selected-header">
                          <div className="row justify-content-md-center">
                            <div className="col"><h5>{(winSize.width <= 767) && <button className="btn btn-sm btn-back" onClick={()=>setToggleChat(false)}><Icon icon={arrowLeft2} /></button>}{activeProposal?.username}</h5></div>
                             {showChat &&
                              <><div className="col text-right">
                                <div className="d-flex">
                                  <button className="btn btn-primary mr-1" type="button" onClick={()=>hireFunction()}>
                                    Hire
                                  </button>
                                  <div className="input-group justify-content-end">
                                    <input type="text" value={searchString} onChange={(e) => setSearchString(e.target.value)} className={`form-control searchInput ${search ? 'active' : 'active'}`} placeholder="Search..." />
                                    <div className="input-group-append">
                                      <button className="btn btn-secondary" onClick={() => setSearch(!search)} type="button">
                                        <i className="fa fa-search"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div></>
                            }
                          </div>
                        </header>
                        <main className="messages-box--chat-area">
                          {showChat &&
                            <Chat socket={socket} pagination={pagination} setFounds={setFounds} founds={founds} searchString={searchString} username={username} room={room} proposal_id={proposal_id} freelancer_id={freelancer_id} hire_manager_id={hire_manager_id} />
                          }
                        </main>
                      </aside>
                      }
                    </>}
                </main>

              </section>
            </div>
          </main>

        </div>
      </div>
    </>
  );
};


const mapStateToProp = (state) => ({
  auth: state.auth,
  proposalAndContract: state.proposalAndContract
});

export default connect(mapStateToProp, { proposalGetByClient })(Messages);