import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import { Icon } from 'react-icons-kit';
import { sendO } from 'react-icons-kit/fa/sendO';
import { messageGetbyId, proposalGetbyId, messageAdd, messageDelete, messageRead } from "../../actions/proposalAndContract";
import './chat.css';
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import { filePdfO } from 'react-icons-kit/fa/filePdfO';
import { fileWordO } from 'react-icons-kit/fa/fileWordO';
import { fileExcelO } from 'react-icons-kit/fa/fileExcelO';
import { filePowerpointO } from 'react-icons-kit/fa/filePowerpointO';
import { fileImageO } from 'react-icons-kit/fa/fileImageO';
import { ic_folder } from 'react-icons-kit/md/ic_folder';
import { upload } from 'react-icons-kit/fa/upload';
import { trashO } from 'react-icons-kit/fa/trashO'
import { fileDownload, uploadFile } from "../../actions/file-crud";
import { checkSquareO } from 'react-icons-kit/fa/checkSquareO';
import { check } from 'react-icons-kit/fa/check';
import moment from "moment";
import Highlighter from "react-highlight-words";

const Chat = ({ socket, founds, pagination, setFounds, username, searchString, room, proposal_id, freelancer_id, hire_manager_id, auth: { user }, proposalAndContract: { MessagesItemData, ProposalsItemData }, messageGetbyId, proposalGetbyId, messageAdd }) => {
  const dispatch = useDispatch();
  const [currentMessage, setCurrentMessage] = useState("");
  const [MessagesItems, setMessageList] = useState([]);
  const [ProposalItem, setProposalItemData] = useState([]);
  const [file, setFile] = useState(null);
  const [attach, setAttach] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const fileTypes = ["JPEG", "PNG", "JPG", "PDF", "DOC", "DOCX", "XLS", "XLSX", "PPT", "PPTX"];
  
  const handleChange = (file) => {
    setFile(file);
  };
  
  useEffect(() => {
    if (searchString.length > 0) {
      setFounds(MessagesItems.filter(item => item.message_text?.toLowerCase()?.includes(searchString?.toLowerCase())).reverse());
    } else {
      setFounds([])
    }
  }, [searchString])
  
  
  const sendMessage = async () => {
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file);
      Promise.all([setLoading(true), dispatch(uploadFile(formData))]).then(async (res) => {
        var message_type = "file";
        var message_file_properties = {
          file_name: res[1].key,
          file_url: res[1].location,
          file_type: res[1].mimetype
        }
        const messageData = {
          room: room,
          user_name: username,
          read: false,
          message_text: currentMessage,
          message_type,
          message_file_properties,
          message_time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        };
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        var proposal_catalog_status_id = "";
        var user_name = username;
        var message_text = currentMessage;
        messageAdd({
          freelancer_id,
          hire_manager_id,
          user_name,
          message_type,
          message_file_properties,
          message_text,
          proposal_id,
          proposal_catalog_status_id
        })
        setCurrentMessage("");
        setAttach(false);
        setFile(null);
        setLoading(false);
      })
    } else {
      if (currentMessage !== "") {
        setLoading(true);
        const messageData = {
          room: room,
          user_name: username,
          message_text: currentMessage,
          message_type: 'text',
          read: false,
          message_time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        var proposal_catalog_status_id = "";
        var user_name = username;
        var message_text = currentMessage;
        messageAdd({
          freelancer_id,
          hire_manager_id,
          user_name,
          message_type: 'text',
          message_text,
          proposal_id,
          proposal_catalog_status_id
        })
        setAttach(false);
        setCurrentMessage("");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setMessageList([]);
    messageGetbyId(proposal_id);
    proposalGetbyId(proposal_id);
  }, []);

  useEffect(() => {
    setMessageList(MessagesItemData);
  }, [MessagesItemData]);

  useEffect(() => {
    setProposalItemData(ProposalsItemData);
  }, [ProposalsItemData]);

  useEffect(() => {
    socket.on("receive_message", async (data) => {
      setMessageList((list) => [...list, data]);
      dispatch(messageRead(proposal_id, async () => await socket.emit("receive_message_successfull", data)));

    });
    socket.on("receive_message_successfull_done", async () => {
      messageGetbyId(proposal_id)
    });
  }, [socket]);

  function IconType(type) {
    if (type.includes("jpg") || type.includes("jpeg") || type.includes("png")) {
      return fileImageO
    } else if (type.includes("spreadsheet")) {
      return fileExcelO
    } else if (type.includes("pdf")) {
      return filePdfO
    } else if (type.includes(".doc")) {
      return fileWordO
    } else if (type.includes("presentation")) {
      return filePowerpointO
    } else {
      return ic_folder
    }
  }

  return (
    <>
        <div className="messages-box--chat-box p-3 border-bottom bg-light">
          <ScrollToBottom className="message-container">
            <>{ProposalItem.freelancer_comment||ProposalItem.client_comment &&
              <div className="d-flex align-items-center osahan-post-header" id={username === ProposalItem.user_name ? "you" : "other"}>
                <p className="p-2 bg-white rounded"><span className="messageSize">{ProposalItem.freelancer_comment||ProposalItem.client_comment}</span>  <span className="text-right text-muted pt-1 small">{ProposalItem.proposal_time}</span></p>
              </div>
              }
            </>
            {MessagesItems.length > 0 && [...MessagesItems].map((messageContent, index) => {
              return (
                <div key={messageContent?._id || `message${index}`} id={messageContent?._id || `message${index}`} className="chat-area">
                  
                  {moment(MessagesItems[index - 1]?.message_date || 0).format('MM-DD-YYYY') !== moment(messageContent.message_date).format('MM-DD-YYYY') && <div className="text-center chat-area--main-date">
                  <span> {moment(messageContent.message_date).format('MM-DD-YYYY') === moment().format('MM-DD-YYYY') ? 'Today' : moment(messageContent.message_date).format('MMM-DD-YYYY')}
                    </span></div>}
                  <div className={`chat-area--${username === messageContent.user_name ? 'you' : 'other'}`} id={username === messageContent.user_name ? 'you'+messageContent?._id : "other"+messageContent?._id}>
                    {messageContent.message_type === "file" ? <p className="chat-area--bubble">
                      <Icon className="mr-2 cursor" icon={IconType(messageContent.message_file_properties.file_type)} onClick={() => fileDownload(messageContent.message_file_properties.file_url, messageContent.message_file_properties.file_name)} />
                      {username === messageContent.user_name && <Icon className="mr-2 cursor" icon={trashO} onClick={() => dispatch(messageDelete(messageContent._id))} />}

                      <span className="chat-area--bubble-text">
                        <Highlighter
                          highlightClassName="YourHighlightClass"
                          searchWords={[searchString]}
                          autoEscape={true}
                          textToHighlight={messageContent.message_text}
                        />
                      </span>
                      <span className="chat-area--bubble-time">
                        {messageContent.message_time}
                      </span>
                    </p>
                      :
                      <p className="chat-area--bubble">
                        <span className="chat-area--bubble-text">
                          <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={[searchString]}
                            autoEscape={true}
                            textToHighlight={messageContent.message_text}
                          /></span>
                        <span className="chat-area--bubble-time">
                          {messageContent.message_time}</span>
                        {username === messageContent.user_name && (messageContent.read ? <Icon className="chat-area--bubble-icon" color="green" icon={checkSquareO} /> : <Icon className="chat-area--bubble-icon" icon={check} />)}
                      </p>
                    }
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="w-100 border-top border-bottom text-area">
          <textarea
            name="message_text"
            value={currentMessage}
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
            placeholder="Write a message…" className="form-control border-0 p-3 shadow-none" rows="2"></textarea>
          <FileUploader
            classes={`drag-drop ${attach ? "d-flex" : "d-none"}`}
            multiple={false}
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
        </div>
        <div className="p-3 d-flex align-items-center">
          <span className="mr-auto">
            <button onClick={() => setAttach(!attach)} className="btn btn-default btn-sm mr-2">
              <i className="mdi mdi-paperclip"></i>
              {/* <Icon className="mr-2" icon={upload} />
              Attachments */}
            </button>
          </span>
          <span className="ml-auto">            
            <button onClick={sendMessage} disabled={loading} className="btn btn-primary">
              {loading ? <div class="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div> :
                <Icon className="mr-2" icon={sendO} />}
              Send
            </button>
          </span>
        </div>
    </>
  );
}

const mapStateToProp = (state) => ({
  proposalAndContract: state.proposalAndContract,
  auth: state.auth,
});

export default connect(mapStateToProp, { messageGetbyId, proposalGetbyId, messageAdd })(Chat);