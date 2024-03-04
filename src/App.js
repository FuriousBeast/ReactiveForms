import React, { useState, useEffect } from 'react';
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Form, Button, InputGroup, Row, Col, Card } from 'react-bootstrap';
import './App.css'
import ProfileCard from './ProfileCard'
import ToastComponent from './ToastComponent';
function App() {

    const handleShowToast = () => {
        ToastComponent.showToastWithMessage('Your custom message here');
      };
    const serverUrl = "http://localhost:3001"
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        phone: '',
        skills: '',
        address: '',
        city: '',
        state: '',
        country: ''
    });
    const [profiles, setProfiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [hasMore, setHasMore] = useState(false);
    const [page, setPage] = useState(1);
    
    const [expanded, setExpanded] = useState(false);
    
    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    useEffect(() =>
    {
        // axios.get(serverUrl +"/profiles").then((res) =>
        // {
        //     setProfiles(res.data);
        // })
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


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProfile = { ...formData };

        for (const field in newProfile) {
            if (!formData[field]) {
            //   alert(`Please fill out ${field}`);
              handleShowToast()
              return;
            }
          }
        
        const duplicatedProfile = profiles.find(profile => profile.name === newProfile.name || profile.email === newProfile.email);

        if(duplicatedProfile)
        {
            alert("Profile already exists")
            return; 
        }

        setProfiles((prevProfiles) => [...prevProfiles, newProfile]);
        
        axios.post('http://localhost:3001/profiles', newProfile).then((response) => {
            console.log(response.data); // Log the response from the server
          })
          .catch((error) => {
            console.error('Error:', error);
          });
          
        clearForm()
        
    };

    const clearForm = () =>
    {
        setFormData({
            name: '',
            email: '',
            age: '',
            phone: '',
            skills: '',
            address: '',
            city: '',
            state: '',
            country: ''
        });
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
        <div className="App">
      <h1>Profile Form</h1>
      <ToastComponent />
      <Row>
       <Col sm={4} className="form-column">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formAge">
          <Form.Control
            type="number"
            placeholder="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Control
            type="number"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formSkills">
          <Form.Control
            as="textarea"
            placeholder="Skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Control
            as="textarea"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formCity">
          <Form.Control
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formState">
          <Form.Control
            type="text"
            placeholder="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formCountry">
          <Form.Control
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Profile
        </Button>
      </Form>
      </Col>
      <Col sm={8} className="scrollable-column">
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
            </Col>
            </Row>
        </div>
    );
}



export default App;
