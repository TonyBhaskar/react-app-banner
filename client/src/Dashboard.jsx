

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [banner, setBanner] = useState({});
    const [isVisible, setIsVisible] = useState(true);
    const [description, setDescription] = useState('');
    const [timer, setTimer] = useState(10);
    const [link, setLink] = useState('');

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await axios.get('http://localhost:3000/');
                if (response.data.length > 0) {
                    const fetchedBanner = response.data[0];
                    setBanner(fetchedBanner);
                    setIsVisible(fetchedBanner.is_visible || true);
                    setDescription(fetchedBanner.banner_desc || '');
                    setTimer(fetchedBanner.banner_timer || 10);
                    setLink(fetchedBanner.banner_link || '');
                }
            } catch (error) {
                console.error('Error fetching banner:', error);
            }
        };

        fetchBanner();
    }, []);

    const handleUpdate = async () => {
        try {
            // Ensure banner.id is defined
            if (!banner.id) {
                throw new Error('Banner ID is not defined');
            }

            const response = await axios.put(`http://localhost:3000/update/${banner.id}`, {
                banner_desc: description,
                banner_timer: timer,
                banner_link: link,
                is_visible: isVisible
            });

            setBanner(response.data);
            alert('Banner updated successfully!');
        } catch (error) {
            console.error('Error updating banner:', error);
            alert('Error updating banner');
        }
    };


    return (
        <div className="dashboard">
            <h2>Banner Dashboard</h2>
            <label>
                Banner Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <br />
            <label>
                Timer (seconds):
                <input
                    type="number"
                    value={timer}
                    onChange={(e) => setTimer(parseInt(e.target.value, 10))}
                />
            </label>
            <br />
            <label>
                Banner Link:
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
            </label>
            <br />
            <label>
                Visible:
                <input
                    className='checkbox-ip'
                    type="checkbox"
                    checked={isVisible}
                    onChange={() => setIsVisible(!isVisible)}
                />
            </label>
            <br />
            <button onClick={handleUpdate}>Update Banner</button>
        </div>
    );
};

export default Dashboard;
