
import { getUserInfo } from 'extra-life-api';

import { useState, useEffect } from 'react';

const participantID = 416085;
const pollingRate = 60000;

const HomePage = () => {
    const [ donations, setDonations ] = useState({});
    const [ throttle, setThrottle ] = useState(false);

    useEffect(() => {
        if (throttle) {
            return;
        }
        getUserInfo(participantID).then(response => {
            console.log(response);
            setDonations({
                'received': response.sumDonations,
                'goal': response.fundraisingGoal
            });
            setThrottle(true)
            setTimeout(() => {
                setThrottle(false);
            }, pollingRate)
        });
    }, [ throttle ]);

    return (
        <div>
            <span className="donation donation-amount">${donations.received}</span>
            <span className="dash">/</span>
            <span className="donation donation-goal">${donations.goal}</span>
        </div>
    )
}

export default HomePage
