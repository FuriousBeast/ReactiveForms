import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Form, InputGroup} from 'react-bootstrap';
import ProfileCard from './ProfileCard';
import axios from "axios";

const ProfileDetails = () =>
{
    const [searchTerm, setSearchTerm] = useState('');
    const [hasMore, setHasMore] = useState(false);
    const [page, setPage] = useState(1);

    const [profiles, setProfiles] = useState([]);
  
    const serverUrl = "http://localhost:3001"

    useEffect(() =>
    {
        fetchProfiles();
    }, []);


    const fetchProfiles = () => {
        axios.get(serverUrl + "/profiles?page=${page}").then((res)=>
        {
            console.log("Response size ", res.data.length)
            if (res.data.length > 0) {
                setProfiles([...profiles, ...res.data]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false); // No more data available
            }
        })
    };
    
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProfiles = profiles.filter(
        (profile) =>
            profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            profile.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
    <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by Name or Email"
          value={searchTerm}
          onChange={handleSearch}
        />
        
      </InputGroup>
            <InfiniteScroll
                dataLength={profiles.length}
                next={fetchProfiles}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>No more profiles</p>}        
            >
                {filteredProfiles.map((profile, index) => (
                    <div key={index}> 
                        <ProfileCard key={index} profile={profile} />
                    </div>
                ))}
            </InfiniteScroll>
            </div>
    )
}

export default ProfileDetails