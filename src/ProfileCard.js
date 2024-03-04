import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './App.css'
const ProfileCard = ({profile}) =>
    {
        const [expanded, setExpanded] = useState(false);

        const toggleExpand = () => {
          setExpanded(!expanded);
        };

        return ( <Card className="cardDiv">
        <Card.Body>
          <Card.Title>{profile.name}</Card.Title>
          <Card.Subtitle className="mb-2 ">{profile.email}</Card.Subtitle>
          <Card.Subtitle>{profile.phone}</Card.Subtitle>

          {expanded && (
            <div >
                <div>
              <Card.Text>Age: {profile.age}</Card.Text>
              <Card.Text>Skills: {profile.skills}</Card.Text>
              <Card.Text>Address: {profile.address}</Card.Text>
                </div>
                <div>
              <Card.Text>City: {profile.city}</Card.Text>
              <Card.Text>State: {profile.state}</Card.Text>
              <Card.Text>Country: {profile.country}</Card.Text>
                </div>
            </div>
          )}
          <Button variant="primary" onClick={toggleExpand}>
            {expanded ? 'Collapse' : 'Expand'}
          </Button>
        </Card.Body>
      </Card>)
    }

    export default ProfileCard;