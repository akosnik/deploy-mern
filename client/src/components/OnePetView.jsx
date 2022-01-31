import io from 'socket.io-client'
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const OnePetView = () => {
  const { id } = useParams();
  const history = useHistory();

  const [pet, setPet] = useState({})
  const [likesDisabled, setLikesDisabled] = useState(true)

  // TODO SOCKETS
  // const [socket] = useState(() => io(':8000'));

  // useEffect(() => {
  //   console.log('is this running?');
  //   socket.on('welcome', data => console.log(data));

  //   return () => socket.disconnect(true);
  // }, [])



  useEffect(() => {

    axios.get(`http://localhost:8000/api/pets/${id}`)
      .then(res => {
        console.log(res);
        setPet(res.data.results);
      })
      .catch(err => {
        console.log("Something went wrong while sending api request", err)
      })
    setLikesDisabled(false)
  }, [])

  const handleDelete = (id) => {
    // TODO add in sockets
    axios.delete(`http://localhost:8000/api/pets/${id}`)
      .then(res => {
        console.log("Success message: ", res)
        history.push('/')
      })
      .catch(err => {
        console.log("Something went wrong while deleting pet", err)
      })
  }

  const handleLike = () => {
    setLikesDisabled(true)
    axios.put(`http://localhost:8000/api/pets/likes/${id}`)
      .then(res => {
        console.log('like response', res)
        setPet(res.data.results)
      })
      .catch(err => {
        console.log('Something went wrong while liking pet', err)
      })
  }

  return (
    <div>
      <h2 className='title'>Single pet View</h2>

      <div className="single-pet">
        <div className="sub-header">
          <h3>Details about: {pet?.name}</h3>
          <button className='btn btn-danger' onClick={() => handleDelete(pet?._id)}>Adopt!</button>
        </div>
        <p>Type: {pet?.type}</p>
        <p>Description: {pet?.description}</p>

        {pet?.skills?.length > 0 ? (
          <>
            <p className='pet-skills'>Skills:</p>
            <ul>
              {pet.skills.map((skill, idx) => {
                return (
                  <li key={idx}>{skill}</li>
                )
              })}
            </ul>
          </>
        ) : <></>}
        <div className="likes-group">
          <button className='btn btn-success' disabled={likesDisabled} onClick={handleLike}>Like</button>
          <div className="likes">{pet?.likes} like(s)</div>
        </div>
      </div>
    </div>
  );
}

export default OnePetView;
