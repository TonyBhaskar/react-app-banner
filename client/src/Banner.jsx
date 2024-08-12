

import React, { useState, useEffect } from 'react';
import './Banner.css';

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch banners from backend
        fetch('http://localhost:3000/')
            .then(response => response.json())
            .then(data => {
                setBannerData(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching banners:', error));
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {bannerData.map(banner => (
                <BannerItem
                    key={banner.id}
                    banner_desc={banner.banner_desc}
                    banner_timer={banner.banner_timer}
                    banner_link={banner.banner_link}
                    is_visible={banner.is_visible}
                />
            ))}
        </>
    );
};

const BannerItem = ({ banner_desc, banner_timer, banner_link, is_visible }) => {
    const [countdown, setCountdown] = useState(banner_timer);
    const [visible, setVisible] = useState(is_visible);

    useEffect(() => {
        if (visible && countdown > 0) {
            const intervalId = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [visible, countdown]);

    if (!visible || countdown <= 0) return null;

    return (
        <div className='banner'>
            <div className="collapse">
                <button onClick={() => setVisible(false)}>close</button>
            </div>
            <a href={banner_link} target="_blank" rel="noopener noreferrer">
                <div className='banner-body'>
                    <div className="banner-head">
                        <div className="banner-title">👋 Hello</div>
                    </div>

                    <hr />




                    <div className="banner-description">
                        <p>{banner_desc}</p>
                    </div>
                    <hr />
                    <div className="banner-timer">Time remaining: {countdown}s</div>
                </div>
            </a>
        </div>
    );
};

export default Banner;
