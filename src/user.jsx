import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

import "bootstrap/dist/css/bootstrap.min.css";


const User = ({ login, avatar, followerURL }) => {


    const [arrFollowers, setFollowers] = useState([]);
    const [isOpen, setIsOpen] = React.useState(false);

    const linkclick = async () => {
        console.log(`https://api.github.com/users/${login}/followers`);
        const APIResponse = await fetch(`https://api.github.com/users/${login}/followers`);
        const data = await APIResponse.json();
        setFollowers(data);
        showModal();
    }

    const getFollowerList = () => {
        return (


            arrFollowers.map(f => (
                <div key={f.login} className="col-md-12">
                    <h2>{f.login}</h2>
                    <img src={f.avatar_url} alt={f.avatar_url}  className="responsive" />
                </div>
            ))


        )
    }

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="column">
            <div onClick={() => linkclick()} style={{ cursor:"pointer" }}>
                <h2>{login}</h2>
                <img src={avatar} alt={login} height="200" width="200" />
            </div>
            <Modal show={isOpen} className="modal">
                <Modal.Header>
                    <Modal.Title>Follower List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        {getFollowerList()}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => hideModal()} className="btn btn-danger">Cancel</button>
                </Modal.Footer>
            </Modal>
        </div>
        // <UserFollowers/>
    )
}

export default User;