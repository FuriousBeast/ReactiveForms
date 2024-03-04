import express from 'express'
import cors from 'cors'
import fs from 'fs'

const app = express();
const port = 3001; 

app.use(cors())
app.use(express.json());

app.get("/profiles", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 5; 

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    let profiles = [];
    fs.readFile('profiles.json', (err, jsonData) =>
    {
        if(err)
        {
         console.log('error reading file', err);
         res.status(500).send('Internal Server Error');
        }

        try
        {  
            profiles = JSON.parse(jsonData);
            const pageProfiles = profiles.slice(startIndex, endIndex);
            console.log("returning size ", pageProfiles.length)
            res.status(200).json(pageProfiles);
        }
        catch(error)
        {
            console.error("Error parsing JSon data:", error)
            res.status(500).send('Intenal Server Error')
        }
    })
    
});

app.post("/profiles",(req, res) =>
{
    const newProfile = req.body;
    fs.readFile('profiles.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            res.status(500).send('Internal Server Error');
            return;
        }

        let profiles = [];
        if (data) {
            profiles = JSON.parse(data);
        }
        profiles.push(newProfile);

        fs.writeFile('profiles.json', JSON.stringify(profiles, null, 2), (err) => {
            if (err) {
                console.error("Error writing file:", err);
                res.status(500).send('Internal Server Error');
                return;
            }
            console.log('Data stored to file');
            res.status(200).send('Profile created successfully');
        });
    });
} )


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});