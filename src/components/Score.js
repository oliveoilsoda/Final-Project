import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Score({ APIData, score }) {
  let navigate = useNavigate();

  const onDelete = async (id) => {
    console.log('in delete function');
    try {
      const resp = await fetch(`https://631cbcad1b470e0e120961c6.mockapi.io/PromineoTechApi/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log('Delete resp:', resp)
      // return await resp.json();
    } catch (err) {
      console.log(
        "Oops, looks like onDelete had an issue.", err);
    }
    console.log('before navigate');
    navigate('/')
  };

  // function to hide edit button if not last comment
  const hideEdit = () => {
    if (score.id === APIData[APIData.length - 1].id) { //if comment id is equal to last comment id
      return true;
    } else {
      return false;
    }
  };

  const handleEdit = () => {
    navigate('/quiz-retake', {score: score})
  }


  return (
    <>
      <tr>
        <td>{score.id}</td>
        <td>{score.username}</td>
        <td>{score.score}</td>
        <td>
          {hideEdit() && 
            <Button variant='warning' onClick={handleEdit}>Retake</Button>}
          {hideEdit() && 
            <Button variant='danger' onClick={() => onDelete(score.id)}>Delete</Button>}
        </td>
      </tr>
    </>
  )
}

