import React, { useEffect, useState } from 'react'
import './App.css'
import User from './user';

const App = () => {

  const pagegingSize = 20
  const [arrAPIUsers, setAPIUsers] = useState([]);
  const [arrUsers, setUsers] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    getUsers();
  }, [pageIndex]);

  const getUsers = async () => {
    const APIResponse = await fetch(`https://api.github.com/users?since=${pageIndex}`);
    const data = await APIResponse.json();
    console.log(data);
    setUsers(data);
    setAPIUsers(data);
  }

  const setSearch = (e) => {
    // O_Array = arrUsers;
    var filteredusers = arrAPIUsers.filter(user => user.login.includes(e.target.value));
    setUsers(filteredusers)
  }

  const getPaggingButtons = (nos) => {
    const arrButtons = []
    for (let index = 0; index < nos; index++) {
      arrButtons.push(<button key={index} onClick={btnPaggingClick} value={index + 1} className="btn btn-primary">{index + 1}</button>);
    }

    return arrButtons.map((i) => {
      return i
    })
  }

  const btnPaggingClick = (e) => {
    setPageIndex(e.target.value - 1)
  }

  return (
    <div>



      <div className="header">
        <div style={{ padding: "10px" }}>
          <input type="text" onChange={setSearch} className="form-control" placeholder="Search here..." ></input>
        </div>
      </div>

      <div className="row">
        
          {
            arrUsers.map(u => (
              <User
                key={u.id}
                followerURL={u.followers_url}
                login={u.login}
                avatar={u.avatar_url}
              />
            ))
          }
        
      </div>
      <div className="footer">
        {
          getPaggingButtons(pagegingSize)
        }
      </div>
    </div>
  );

}

export default App;