import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const ProfileCard = ({profile}) =>
    {
        const [expanded, setExpanded] = useState(false);

        const toggleExpand = () => {
          setExpanded(!expanded);
        };

        return ( <Card style={{ width: '18rem', marginBottom: '10px' }}>
        <Card.Body>
          <Card.Title>{profile.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{profile.email}</Card.Subtitle>
          {expanded && (
            <div>
              <Card.Text>Age: {profile.age}</Card.Text>
              <Card.Text>Phone: {profile.phone}</Card.Text>
              <Card.Text>Skills: {profile.skills}</Card.Text>
              <Card.Text>Address: {profile.address}</Card.Text>
              <Card.Text>City: {profile.city}</Card.Text>
              <Card.Text>State: {profile.state}</Card.Text>
              <Card.Text>Country: {profile.country}</Card.Text>
            </div>
          )}
          <Button variant="primary" onClick={toggleExpand}>
            {expanded ? 'Collapse' : 'Expand'}
          </Button>
        </Card.Body>
      </Card>)
    }

    export default ProfileCard;