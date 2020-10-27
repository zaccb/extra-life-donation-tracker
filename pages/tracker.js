
import { getUserInfo } from 'extra-life-api';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const pollingRate = 120000;

const Tracker = () => {
    const router = useRouter();
    const [ pid, setPid ] = useState(router.query.pid)
    const [ userInfo, setUserInfo ] = useState({});
    const [ throttle, setThrottle ] = useState(false);
    const [ adjustedPollingRate, setAdjustedPollingRate ] = useState(0);

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
        <div key={ pid } className={ router.query.hideBranding ? 'data-output' : 'data-output branded' }>
            {
                router.query.showCombinedGoal && (
                    <>
                        <div className="combined-goal">
                            <span className="combined-raised">${userInfo.sumDonations}</span>
                            <span>/</span>
                            <span className="combined-goal">${userInfo.fundraisingGoal}</span>
                        </div>
                    </>
                )
            }
            {
                router.query.showRaised && (
                    <div className="raised">${userInfo.sumDonations}</div>
                )
            }
            {
                router.query.showGoal && (
                    <div className="goal">${userInfo.fundraisingGoal}</div>
                )
            }
            {
                router.query.showDonationCount && (
                    <div className="count">{userInfo.numDonations}</div>
                )
            }
        </div>
    )
}

export default Tracker
