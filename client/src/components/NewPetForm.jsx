import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const PetForm = () => {
  const history = useHistory();


  const [name, setName] = useState('');
  const [type, setType] = useState('Dog');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [likes, setLikes] = useState(0);
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault();

    const PetFormObj = { name, type, description, skills, likes }

    axios.post('http://localhost:8000/api/pets', PetFormObj)
      .then(res => {
        console.log("Post response:", res)
        if (res.data.error) {
          setErrors(res.data.error.errors)
          console.log('ERRORS', res.data.error.errors)
        } else {
          console.log('New Pet created successfully!')
          history.push('/')
        }
      })
      .catch(err => {
        console.log("There was an error while posting:", err)
      })
  }


  const addSkill = (skill, idx) => {
    const skillsCopy = skills
    skillsCopy[idx] = skill;
    setSkills(skillsCopy);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='form new-pet-form'>
        <h2>Know a pet needing a home?</h2>

        <div className="form-group">
          <label >Name</label>
          <input className='input name-input' type="text" name="name" onChange={(e) => setName(e.target.value)} />
          <p className='text-danger'>{errors.name?.message}</p>
        </div>
        <div className="form-group">
          <label >Type</label>
          <select name="type" onChange={(e) => setType(e.target.value)}>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
          </select>
          <p className='text-danger'>{errors.type?.message}</p>
        </div>
        <div className="form-group">
          <label >Description</label>
          <textarea className='input description-input' type="textField" name="description" onChange={(e) => setDescription(e.target.value)} />
          <p className='text-danger'>{errors.description?.message}</p>
        </div>

        <div className="skills-group">

          <div className="form-group">
            <label >Skill 1</label>
            <input className='input skill-input' type="text" name="0" onChange={(e) => addSkill(e.target.value, e.target.name)} />
            <p className='text-danger'>{errors.skill1?.message}</p>
          </div>
          <div className="form-group">
            <label >Skill 2</label>
            <input className='input skill-input' type="text" name="1" onChange={(e) => addSkill(e.target.value, e.target.name)} />
            <p className='text-danger'>{errors.skill2?.message}</p>
          </div>
          <div className="form-group">
            <label >Skill 3</label>
            <input className='input skill-input' type="text" name="2" onChange={(e) => addSkill(e.target.value, e.target.name)} />
            <p className='text-danger'>{errors.skill3?.message}</p>
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default PetForm;
