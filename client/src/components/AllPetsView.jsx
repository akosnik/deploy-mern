import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllPetsView = () => {

  const [petList, setPetList] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:8000/api/pets')
      .then(res => {
        setPetList(res.data.results);
        console.log(res.data.results)
      })
      .catch(err => {
        console.log("Something went wrong while sending api request", err)
      })
  }, [])


  const sortResults = (results) => {
    results.sort((a, b) => {
      var textA = a.type.toUpperCase();
      var textB = b.type.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }


  return (
    <div>
      <h2 className='title'>All Pets</h2>
      <div className="pets">
        {sortResults(petList)}
        {petList.map((pet, idx) => {
          return (
            <div key={idx} className="pet">

              <h3 className='pet-name'><Link to={`/pets/view/${pet._id}`}>{pet.name}</Link></h3>
              <p>Type: {pet.type}</p>
              <p>Description: {pet.description}</p>

              {pet.skills.length > 0 ? (
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

              <span className='buttons'>
                <Link to={`/pets/view/${pet._id}`} className='btn btn-primary'>View</Link>
                <Link to={`/pets/edit/${pet._id}`} className='btn btn-warning'>Edit</Link>
              </span>

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default AllPetsView;
