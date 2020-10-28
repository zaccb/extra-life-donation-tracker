
import { getUserInfo } from 'extra-life-api';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import UserInfoDisplay from '../components/UserInfoDisplay';

const pollingRate = 120000;

const Tracker = () => {
    const router = useRouter();
    const [ pid, setPid ] = useState(router.query.pid)
    const [ userInfo, setUserInfo ] = useState({});
    const [ throttle, setThrottle ] = useState(false);
    const [ adjustedPollingRate, setAdjustedPollingRate ] = useState(0);
    // const [ showCombinedGoal, setCombinedGoal ] = useState(router.query.showCombinedGoal);
    // const [ showRaised, setShowRaised ] = useState(router.query.showRaised)
    // const [ showGoal, setShowGoal ] = useState(router.query.showGoal);
    // const [ showDonationCount, setShowDonationCount ] = useState(router.query.showDonationCount);
    // const [ hideBranding, setHideBranding ] = useState(router.query.hideBranding);

    const updateUserInfo = () => {
        getUserInfo(pid)
            .then(response => {
                console.log(response);
                setPid(router.query.pid)
                setUserInfo(response);
                setThrottle(true)
                setTimeout(() => {
                    setThrottle(false);
                    if (adjustedPollingRate !== pollingRate) {
                        setAdjustedPollingRate(pollingRate);
                    }
                }, adjustedPollingRate )
            })
            .catch(error => {});
    }

    useEffect(() => {
        if (throttle) {
            return;
        }

        updateUserInfo();

    }, [ throttle ]);

    return (
        <UserInfoDisplay 
            hideBranding={ router.query.hideBranding } 
            showCombinedGoal={ router.query.showCombinedGoal }
            showRaised={ router.query.showRaised }
            showGoal={ router.query.showGoal }
            showDonationCount={ router.query.showDonationCount }
            userInfo={ userInfo }
        />
    )
}

export default Tracker
