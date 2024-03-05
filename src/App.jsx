import {renderComponent} from "./UIComponent";
import React, {useEffect, useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import InfiniteScroll from "react-infinite-scroll-component";
import ProfileCard from "./ProfileCard";
import './App.css'
const App = () =>
{
    const [profileList, setProfileList] = useState([]);
    const [profile, setProfile] = new useState({});
    const [searchTerm, setSearchTerm] = new useState({});
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const serverUrl = "http://localhost:3001";

    useEffect(() => {
        fetchProfiles();
        console.log("profileList", profileList)
    }, []);


    function removeDuplicates(inputArray) {
        const uniqueArray = [];
        const seenIds = new Set();

        for (const item of inputArray) {
            const itemId = item.name;

            if (!seenIds.has(itemId)) {
                uniqueArray.push(item);
                seenIds.add(itemId);
            }
        }

        return uniqueArray;
    }
    const fetchProfiles =async () =>
    {
      await axios.get(serverUrl + `/profiles?page=${page}`)
            .then((res) =>
            {
                let data = res.data;
                console.log("data.length", data)
                setProfileList(prev =>{
                    let newList = [...removeDuplicates(prev), ...data];
                    return removeDuplicates(newList)
                })
                console.log("before page", page)
                setPage(prevPage =>  {
                    console.log("prevPage", prevPage)
                    return prevPage + 0.5
                } )
                console.log("after page", page)
                setHasMore(data.length > 0);
            })
            .catch(err =>
            {
            console.error("error", err)
            return [];
            });
    }
    const fetchMoreProfiles = () =>
    {
        // if(!hasMore)
        //     return;
        fetchProfiles();
    }

    const filteredProfiles = (Object.keys(searchTerm).length !== 0) ? profileList.filter(
        (profile) =>
            profile.name.toLowerCase().includes(searchTerm ? searchTerm.searchItem.toLowerCase() : "") ||
            profile.email.toLowerCase().includes(searchTerm ? searchTerm.searchItem.toLowerCase() : "")
    ) : profileList;

    const handleSubmit = () =>
    {
        if(Object.keys(profile).length === 0)
        {
            alert("Fill all fields");
            return;
        }
        if(profile.name === "" || profile.email === "")
        {
            alert("Name/Email is must");
            return;
        }
        axios.post(serverUrl + "/profiles", profile)
            .then((res)=>{
                alert(res.data)
                if(res.status === 200)
                    setProfileList(prevProfile => ([...prevProfile, profile]));
            })
            .catch((err) => console.error(err))
    }

    const props = [{
        label: 'Name',
        type: 'text',
        name: 'name'
    },{
        label: 'Age',
        type: 'number',
        name: 'age'
    },{
        label: 'Email',
        type: 'email',
        name: 'email'
    },{
        label: 'Phone',
        type: 'number',
        name: 'phone'
    },{
        label: 'Skills',
        type: 'text',
        name: 'skills'
    },{
        label: 'Address',
        type: 'text',
        name: 'address'
    },{
        label: 'City',
        type: 'text',
        name: 'city'
    },{
        label: 'State',
        type: 'text',
        name: 'state'
    },{
        label: 'Country',
        type: 'text',
        name: 'country'
    }]


    return (
        <>
            <div className='parentDiv'>
            <h1 style={{textAlign : "center"  , color : "white"}}>Profile Form</h1>
                <div className="container" style={{height : "100%" , width : "100%"}}>
            <div className='midPanel'>
                <div className=' formDiv'>
                    {renderComponent(props, setProfile)}
                    <button className={"btn-primary btn"} onClick={handleSubmit}>Submit</button>
                </div>
                <div className=' listOfCards'>
                     {renderComponent([{label: "Filter by name or email", type: 'text', name: 'searchItem'}], setSearchTerm)}
                    <div className="infinite-scroll-parent" id='infinite-scroll-parent' >
                    <InfiniteScroll
                        dataLength={profileList.length}
                        next={fetchMoreProfiles}
                        hasMore={hasMore}
                        // loader={<h4>Loading...</h4>}
                        scrollableTarget="infinite-scroll-parent"
                    >
                        {filteredProfiles.length !== 0 ?
                            filteredProfiles.map((profile, index) =>
                                (
                                    <div className='parentProfileCard' key={index}>
                                        <ProfileCard key={index} profile={profile}/>
                                    </div>
                                )
                            ): <p style={{color: 'white'}}>No matching profiles found</p>
                        }
                    </InfiniteScroll>
                    </div>
                </div>
            </div>
                </div>
            </div>
        </>
    )
}

export default App;